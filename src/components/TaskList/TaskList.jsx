import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import TaskItem from "../TaskItem/TaskItem";
import {
  archiveCardItem,
  createCard,
  getTasksInList,
  updateDueComplete,
} from "../../services/trelloApi";
import TaskDetailsModal from "../modals/TaskDetailsModal";
import { Close, DeleteForeverOutlined } from "@mui/icons-material";

function TaskList({ title, taskId, handleTaskListDelete }) {
  const [addingCard, setAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };
  const handleTaskUpdate = async (taskId, completed) => {
    try {
      await updateDueComplete(taskId, completed);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, dueComplete: completed } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };
  const handleTaskItemDelete = async (taskId) => {
    archiveCardItem(taskId).then((res) => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      console.log(res);
    });
  };
  return (
    <Paper
      sx={{
        minWidth: "300px",
        width: "300px",
        flexShrink: 0,
        p: 2,
        borderRadius: 2,
        backgroundColor: "#f4f5f7",
        boxShadow: 1,
      }}
    >
      {/* List Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Button
          onClick={() => {
            handleTaskListDelete(taskId);
          }}
          sx={{ minWidth: 0, fontSize: "12px", color: "text.primary" }}
        >
          <Close />
        </Button>
      </Box>
      {/* Render Each Task */}
      <Box sx={{ overflow: "auto", maxHeight: "55vh" }}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskUpdate={handleTaskUpdate}
            onTaskClick={handleTaskClick}
            handleTaskItemDelete={handleTaskItemDelete}
          />
        ))}

        <TaskDetailsModal
          task={selectedTask}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
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
              <Close />
            </IconButton>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default TaskList;
