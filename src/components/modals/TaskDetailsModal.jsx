// src/components/modals/TaskDetailsModal.jsx
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
import { useEffect } from "react";
import { Close, DeleteForeverOutlined } from "@mui/icons-material";
import { useTaskDetailsContext } from "../../context/TaskDetailContext";

const TaskDetailsModal = ({ task, open, onClose }) => {
  const {
    state: { checklists, newChecklistName, newItemNames },
    dispatch,
    loadChecklists,
    updateChecklistItemStatus,
    addChecklist,
    addChecklistItemToChecklist,
    deleteChecklistById,
    deleteChecklistItemById,
  } = useTaskDetailsContext();

  // Load checklists when modal opens
  useEffect(() => {
    if (open && task) {
      loadChecklists(task.id);
    }
  }, [open, task, loadChecklists]);

  // Handlers for input changes using dispatch
  const handleNewChecklistNameChange = (e) => {
    dispatch({ type: "UPDATE_NEW_CHECKLIST_NAME", payload: e.target.value });
  };

  const handleNewItemNameChange = (checklistId, value) => {
    dispatch({
      type: "UPDATE_NEW_ITEM_NAME",
      payload: { checklistId, value },
    });
  };

  // Local handler to wrap API call
  const handleAddChecklist = async () => {
    if (!newChecklistName.trim()) return;
    await addChecklist(task.id, newChecklistName);
  };

  const handleAddChecklistItem = async (checklistId) => {
    const newItemName = newItemNames[checklistId];
    if (!newItemName || !newItemName.trim()) return;
    await addChecklistItemToChecklist(checklistId, newItemName);
  };

  const handleDeleteChecklist = async (checklistId) => {
    await deleteChecklistById(checklistId);
  };

  const handleDeleteChecklistItem = async (checklistId, itemId) => {
    await deleteChecklistItemById(checklistId, itemId);
  };

  const handleChecklistToggle = async (checkItemId, checked, checklistId) => {
    await updateChecklistItemStatus(task.id, checklistId, checkItemId, checked);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 2,
          },
        },
      }}
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
        {/* Existing Checklists */}
        {checklists.map((checklist) => (
          <Box
            key={checklist.id}
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {checklist.name}
              </Typography>
              <Button
                onClick={() => handleDeleteChecklist(checklist.id)}
                sx={{ minWidth: 0 }}
              >
                <Close sx={{ color: "text.primary" }} />
              </Button>
            </Box>

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
                    paddingX: "20px",
                  }}
                >
                  <Checkbox
                    checked={item.state === "complete"}
                    onChange={(e) =>
                      handleChecklistToggle(
                        item.id,
                        e.target.checked,
                        checklist.id
                      )
                    }
                    sx={{ mr: 1 }}
                  />
                  <ListItemText primary={item.name} />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChecklistItem(checklist.id, item.id);
                    }}
                  >
                    <DeleteForeverOutlined sx={{ color: "red" }} />
                  </IconButton>
                </ListItem>
              ))}
            </List>

            {/* Add Item to Checklist */}
            <Box display="flex" gap={1} mt={2}>
              <TextField
                size="small"
                placeholder="Add an item"
                value={newItemNames[checklist.id] || ""}
                onChange={(e) =>
                  handleNewItemNameChange(checklist.id, e.target.value)
                }
                fullWidth
              />
              <Button
                variant="contained"
                onClick={() => handleAddChecklistItem(checklist.id)}
                sx={{ whiteSpace: "nowrap" }}
              >
                Add
              </Button>
            </Box>
          </Box>
        ))}

        {/* Create New Checklist */}
        <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Add Checklist
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              size="small"
              placeholder="Checklist title"
              value={newChecklistName}
              onChange={handleNewChecklistNameChange}
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
