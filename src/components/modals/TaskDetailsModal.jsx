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
import { useEffect, useState } from "react";
import {
  getChecklists,
  updateChecklistItem,
  createChecklist,
  addChecklistItem,
} from "../../services/trelloApi";

const TaskDetailsModal = ({ task, open, onClose }) => {
  const [checklists, setChecklists] = useState([]);
  const [newChecklistName, setNewChecklistName] = useState("");
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    if (open && task) {
      getChecklists(task.id).then((res) => {
        setChecklists(res.data);
      });
    }
  }, [open, task]);

  const handleChecklistToggle = async (checkItemId, checked) => {
    try {
      await updateChecklistItem(task.id, checkItemId, checked);
      setChecklists((prev) =>
        prev.map((checklist) => ({
          ...checklist,
          checkItems: checklist.checkItems.map((item) =>
            item.id === checkItemId
              ? { ...item, state: checked ? "complete" : "incomplete" }
              : item
          ),
        }))
      );
    } catch (error) {
      console.error("Failed to update checklist item:", error);
    }
  };

  const handleAddChecklist = async () => {
    if (!newChecklistName.trim()) return;
    const res = await createChecklist(task.id, newChecklistName);
    setChecklists([...checklists, res.data]);
    setNewChecklistName("");
  };

  const handleAddChecklistItem = async (checklistId) => {
    if (!newItemName.trim()) return;
    const res = await addChecklistItem(checklistId, newItemName);
    setChecklists((prev) =>
      prev.map((checklist) =>
        checklist.id === checklistId
          ? { ...checklist, checkItems: [...checklist.checkItems, res.data] }
          : checklist
      )
    );
    setNewItemName("");
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

      <DialogContent
        sx={{
          pt: 2,
          pb: 2,
        }}
      >
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
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {checklist.name}
            </Typography>

            <List disablePadding>
              {checklist.checkItems.map((item) => (
                <ListItem
                  key={item.id}
                  disableGutters
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    borderBottom: "1px solid #ececec",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <Checkbox
                    checked={item.state === "complete"}
                    onChange={(e) =>
                      handleChecklistToggle(item.id, e.target.checked)
                    }
                    sx={{ mr: 1 }}
                  />
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
              ))}
            </List>

            {/* Add Item to Checklist */}
            <Box display="flex" gap={1} mt={2}>
              <TextField
                size="small"
                placeholder="Add an item"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
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
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Add Checklist
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              size="small"
              placeholder="Checklist title"
              value={newChecklistName}
              onChange={(e) => setNewChecklistName(e.target.value)}
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
