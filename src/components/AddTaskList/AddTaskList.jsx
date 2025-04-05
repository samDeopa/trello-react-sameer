import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";

const AddTaskList = ({ handleListAdd }) => {
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const handleAddCardClick = () => {
    setAddingList(true);
  };

  const handleCancelAdd = () => {
    setAddingList(false);
    setNewListTitle("");
  };

  const handleConfirmAdd = () => {
    if (!newListTitle.trim()) return;

    handleListAdd(newListTitle);
    setNewListTitle("");
    setAddingList(false);
  };
  return (
    <Paper
      sx={{
        minWidth: "300px",
        width: "300px",
        flexShrink: 0,
        p: 1.5,
        borderRadius: 2,
        backgroundColor: "#ffffff3d",
        boxShadow: 1,
        backdropFilter: "blur(1px)",
        background: addingList ? "#f4f5f7" : "",
      }}
    >
      {/* Add Card Section */}
      {!addingList ? (
        <Typography
          variant="body2"
          sx={{
            padding: 0,
            color: "text.card",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={handleAddCardClick}
        >
          + Add another list
        </Typography>
      ) : (
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter a title or paste a link"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" size="small" onClick={handleConfirmAdd}>
              Add List
            </Button>
            <IconButton size="small" onClick={handleCancelAdd}>
              ✕
            </IconButton>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default AddTaskList;
