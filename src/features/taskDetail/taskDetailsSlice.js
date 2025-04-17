import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getChecklists,
  updateChecklistItem,
  createChecklist,
  addChecklistItem,
  deleteCheckList,
  deleteChecklistItem,
} from "../../services/trelloApi";

export const fetchChecklists = createAsyncThunk(
  "taskDetails/fetchChecklists",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await getChecklists(taskId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const toggleChecklistItem = createAsyncThunk(
  "taskDetails/toggleChecklistItem",
  async ({ taskId, itemId, checked }, { rejectWithValue }) => {
    try {
      await updateChecklistItem(taskId, itemId, checked);
      return { itemId, checked };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createNewChecklist = createAsyncThunk(
  "taskDetails/createChecklist",
  async ({ taskId, name }, { rejectWithValue }) => {
    try {
      const res = await createChecklist(taskId, name);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addItemToChecklist = createAsyncThunk(
  "taskDetails/addChecklistItem",
  async ({ checklistId, name }, { rejectWithValue }) => {
    try {
      const res = await addChecklistItem(checklistId, name);
      return { checklistId, item: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeChecklist = createAsyncThunk(
  "taskDetails/removeChecklist",
  async (checklistId, { rejectWithValue }) => {
    try {
      await deleteCheckList(checklistId);
      return checklistId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeChecklistItem = createAsyncThunk(
  "taskDetails/removeChecklistItem",
  async ({ checklistId, itemId }, { rejectWithValue }) => {
    try {
      await deleteChecklistItem(checklistId, itemId);
      return { checklistId, itemId };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const taskDetailsSlice = createSlice({
  name: "taskDetails",
  initialState: {
    checklists: [],
    newChecklistName: "",
    newItemNames: {},
    loading: "idle",
    error: null,
  },
  reducers: {
    // local updates to input state
    setNewChecklistName(state, action) {
      state.newChecklistName = action.payload;
    },
    setNewItemName(state, action) {
      const { checklistId, value } = action.payload;
      state.newItemNames[checklistId] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchChecklists
      .addCase(fetchChecklists.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchChecklists.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.checklists = action.payload;
      })
      .addCase(fetchChecklists.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })

      // toggleChecklistItem
      .addCase(toggleChecklistItem.fulfilled, (state, { payload }) => {
        const { itemId, checked } = payload;
        state.checklists.forEach((list) => {
          list.checkItems = list.checkItems.map((item) =>
            item.id === itemId
              ? { ...item, state: checked ? "complete" : "incomplete" }
              : item
          );
        });
      })

      // createNewChecklist
      .addCase(createNewChecklist.fulfilled, (state, { payload }) => {
        state.checklists.push(payload);
        state.newChecklistName = "";
      })

      // addItemToChecklist
      .addCase(addItemToChecklist.fulfilled, (state, { payload }) => {
        const { checklistId, item } = payload;
        const list = state.checklists.find((c) => c.id === checklistId);
        if (list) list.checkItems.push(item);
        state.newItemNames[checklistId] = "";
      })

      // removeChecklist
      .addCase(removeChecklist.fulfilled, (state, { payload }) => {
        state.checklists = state.checklists.filter((c) => c.id !== payload);
      })

      // removeChecklistItem
      .addCase(removeChecklistItem.fulfilled, (state, { payload }) => {
        const { checklistId, itemId } = payload;
        const list = state.checklists.find((c) => c.id === checklistId);
        if (list) {
          list.checkItems = list.checkItems.filter((i) => i.id !== itemId);
        }
      });
  },
});

export const { setNewChecklistName, setNewItemName } = taskDetailsSlice.actions;

export default taskDetailsSlice.reducer;
