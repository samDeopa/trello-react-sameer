import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TaskItem from "../TaskItem/TaskItem";
import { createCard, getTasksInList } from "../../services/trelloApi";

function TaskList({ title, taskId }) {
  // Track whether we are adding a card
  const [addingCard, setAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasksInList(taskId).then((res) => {
      console.log("logging tasks in list", res.data);
      setTasks(res.data);
    });
  }, []);
  const handleCardAdd = () => {
    createCard(taskId, newCardTitle).then((res) => {
      console.log(res.data);
      setTasks([...tasks, res.data]);
    });
  };

  const handleAddCardClick = () => {
    setAddingCard(true);
  };

  const handleCancelAdd = () => {
    setAddingCard(false);
    setNewCardTitle("");
  };

  const handleConfirmAdd = () => {
    if (!newCardTitle.trim()) return;

    handleCardAdd(newCardTitle);
    setNewCardTitle("");
    setAddingCard(false);
  };

  return (
    <Paper
      sx={{
        minWidth: "300px", // minWidth ensures it doesn't shrink
        width: "300px",
        flexShrink: 0, // Important: Prevents shrinking in flex
        p: 2,
        borderRadius: 2,
        backgroundColor: "#f4f5f7",
        boxShadow: 1,
      }}
    >
      {/* List Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <IconButton size="small">
          <MoreHorizIcon />
        </IconButton>
      </Box>
      {/* Render Each Task */}
      <Box sx={{ overflow: "auto", maxHeight: "55vh" }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Box>

      {/* Add Card Section */}
      {!addingCard ? (
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mt: 1,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={handleAddCardClick}
        >
          + Add a card
        </Typography>
      ) : (
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter a title or paste a link"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" size="small" onClick={handleConfirmAdd}>
              Add card
            </Button>
            <IconButton size="small" onClick={handleCancelAdd}>
              ✕
            </IconButton>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default TaskList;
