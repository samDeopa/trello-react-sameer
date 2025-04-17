// src/components/modals/TaskDetailsModal.jsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchChecklists,
  toggleChecklistItem,
  createNewChecklist,
  addItemToChecklist,
  removeChecklist,
  removeChecklistItem,
  setNewChecklistName,
  setNewItemName,
} from "../../features/taskDetail/taskDetailsSlice";

const TaskDetailsModal = ({ task, open, onClose }) => {
  const dispatch = useDispatch();
  const { checklists, newChecklistName, newItemNames, loading, error } =
    useSelector((state) => state.taskDetails);

  // Load checklists when modal opens
  useEffect(() => {
    if (open && task) {
      dispatch(fetchChecklists(task.id));
    }
  }, [open, task, dispatch]);

  const handleAddChecklist = () => {
    if (!newChecklistName.trim()) return;
    dispatch(createNewChecklist({ taskId: task.id, name: newChecklistName }));
  };

  const handleAddChecklistItem = (checklistId) => {
    const name = newItemNames[checklistId]?.trim();
    if (!name) return;
    dispatch(addItemToChecklist({ checklistId, name }));
  };

  const handleDeleteChecklist = (checklistId) => {
    dispatch(removeChecklist(checklistId));
  };

  const handleDeleteChecklistItem = (checklistId, itemId) => {
    dispatch(removeChecklistItem({ checklistId, itemId }));
  };

  const handleChecklistToggle = (itemId, checked) => {
    dispatch(
      toggleChecklistItem({
        taskId: task.id,
        itemId,
        checked,
      })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{ paper: { sx: { borderRadius: 3, p: 2 } } }}
    >
      <DialogTitle
        sx={{
          position: "relative",
          fontWeight: 600,
          borderBottom: "1px solid #e0e0e0",
          mb: 1,
        }}
      >
        {task?.name}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 2 }}>
        {loading === "loading" && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {checklists.map((checklist) => (
          <Box
            key={checklist.id}
            sx={{ mb: 3, p: 2, borderRadius: 2, backgroundColor: "#f9f9f9" }}
          >
            {/* Checklist Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {checklist.name}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleDeleteChecklist(checklist.id)}
              >
                <DeleteForeverOutlined color="error" />
              </IconButton>
            </Box>

            {/* Checklist Items */}
            <List disablePadding>
              {checklist.checkItems.map((item) => (
                <ListItem
                  key={item.id}
                  disableGutters
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #ececec",
                    "&:last-child": { borderBottom: "none" },
                    px: 2,
                  }}
                >
                  <Checkbox
                    checked={item.state === "complete"}
                    onChange={(e) =>
                      handleChecklistToggle(item.id, e.target.checked)
                    }
                    sx={{ mr: 1 }}
                  />
                  <ListItemText primary={item.name} />
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleDeleteChecklistItem(checklist.id, item.id)
                    }
                  >
                    <DeleteForeverOutlined color="error" />
                  </IconButton>
                </ListItem>
              ))}
            </List>

            {/* Add Item to Checklist */}
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <TextField
                size="small"
                placeholder="Add an item"
                value={newItemNames[checklist.id] || ""}
                onChange={(e) =>
                  dispatch(
                    setNewItemName({
                      checklistId: checklist.id,
                      value: e.target.value,
                    })
                  )
                }
                fullWidth
              />
              <Button
                variant="contained"
                onClick={() => handleAddChecklistItem(checklist.id)}
              >
                Add
              </Button>
            </Box>
          </Box>
        ))}

        {/* Add New Checklist */}
        <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Add Checklist
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              size="small"
              placeholder="Checklist title"
              value={newChecklistName}
              onChange={(e) => dispatch(setNewChecklistName(e.target.value))}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddChecklist}>
              Create
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;
