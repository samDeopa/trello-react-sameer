// src/context/TaskDetailsContext.jsx
import React, { createContext, useReducer, useContext } from "react";
import {
  getChecklists,
  updateChecklistItem,
  createChecklist,
  addChecklistItem,
  deleteCheckList,
  deleteChecklistItem,
} from "../services/trelloApi";

const initialState = {
  checklists: [],
  newChecklistName: "",
  // Store new item names per checklist in an object: { [checklistId]: value }
  newItemNames: {},
};

const TaskDetailsReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHECKLISTS":
      return { ...state, checklists: action.payload };
    case "UPDATE_NEW_CHECKLIST_NAME":
      return { ...state, newChecklistName: action.payload };
    case "ADD_CHECKLIST":
      return {
        ...state,
        checklists: [...state.checklists, action.payload],
        newChecklistName: "",
      };
    case "UPDATE_NEW_ITEM_NAME":
      return {
        ...state,
        newItemNames: {
          ...state.newItemNames,
          [action.payload.checklistId]: action.payload.value,
        },
      };
    case "ADD_CHECKLIST_ITEM":
      return {
        ...state,
        checklists: state.checklists.map((checklist) =>
          checklist.id === action.payload.checklistId
            ? {
                ...checklist,
                checkItems: [...checklist.checkItems, action.payload.item],
              }
            : checklist
        ),
        newItemNames: {
          ...state.newItemNames,
          [action.payload.checklistId]: "",
        },
      };
    case "DELETE_CHECKLIST":
      return {
        ...state,
        checklists: state.checklists.filter(
          (checklist) => checklist.id !== action.payload
        ),
      };
    case "DELETE_CHECKLIST_ITEM":
      return {
        ...state,
        checklists: state.checklists.map((checklist) =>
          checklist.id === action.payload.checklistId
            ? {
                ...checklist,
                checkItems: checklist.checkItems.filter(
                  (item) => item.id !== action.payload.itemId
                ),
              }
            : checklist
        ),
      };
    case "UPDATE_CHECKLIST_ITEM":
      return {
        ...state,
        checklists: state.checklists.map((checklist) =>
          checklist.id === action.payload.checklistId
            ? {
                ...checklist,
                checkItems: checklist.checkItems.map((item) =>
                  item.id === action.payload.itemId
                    ? { ...item, state: action.payload.state }
                    : item
                ),
              }
            : checklist
        ),
      };
    default:
      return state;
  }
};

const TaskDetailsContext = createContext();

export const TaskDetailsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TaskDetailsReducer, initialState);

  // Async functions that interact with the API can be added here

  const loadChecklists = async (taskId) => {
    try {
      const res = await getChecklists(taskId);
      dispatch({ type: "SET_CHECKLISTS", payload: res.data });
    } catch (error) {
      console.error("Error loading checklists:", error);
    }
  };

  const updateChecklistItemStatus = async (
    taskId,
    checklistId,
    itemId,
    checked
  ) => {
    try {
      await updateChecklistItem(taskId, itemId, checked);
      dispatch({
        type: "UPDATE_CHECKLIST_ITEM",
        payload: {
          checklistId,
          itemId,
          state: checked ? "complete" : "incomplete",
        },
      });
    } catch (error) {
      console.error("Error updating checklist item:", error);
    }
  };

  const addChecklist = async (taskId, checklistName) => {
    try {
      const res = await createChecklist(taskId, checklistName);
      dispatch({ type: "ADD_CHECKLIST", payload: res.data });
    } catch (error) {
      console.error("Error adding checklist:", error);
    }
  };

  const addChecklistItemToChecklist = async (checklistId, newItemName) => {
    try {
      const res = await addChecklistItem(checklistId, newItemName);
      dispatch({
        type: "ADD_CHECKLIST_ITEM",
        payload: { checklistId, item: res.data },
      });
    } catch (error) {
      console.error("Error adding checklist item:", error);
    }
  };

  const deleteChecklistById = async (checklistId) => {
    try {
      await deleteCheckList(checklistId);
      dispatch({ type: "DELETE_CHECKLIST", payload: checklistId });
    } catch (error) {
      console.error("Error deleting checklist:", error);
    }
  };

  const deleteChecklistItemById = async (checklistId, itemId) => {
    try {
      await deleteChecklistItem(checklistId, itemId);
      dispatch({
        type: "DELETE_CHECKLIST_ITEM",
        payload: { checklistId, itemId },
      });
    } catch (error) {
      console.error("Error deleting checklist item:", error);
    }
  };

  return (
    <TaskDetailsContext.Provider
      value={{
        state,
        dispatch,
        loadChecklists,
        updateChecklistItemStatus,
        addChecklist,
        addChecklistItemToChecklist,
        deleteChecklistById,
        deleteChecklistItemById,
      }}
    >
      {children}
    </TaskDetailsContext.Provider>
  );
};

export const useTaskDetailsContext = () => {
  const context = useContext(TaskDetailsContext);
  if (!context) {
    throw new Error(
      "useTaskDetailsContext must be used within a TaskDetailsProvider"
    );
  }
  return context;
};
