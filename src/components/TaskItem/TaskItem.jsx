import React, { useState } from "react";
import { Box, Typography, Checkbox, IconButton, Button } from "@mui/material";
import { CheckCircle, CircleOutlined } from "@mui/icons-material";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";

function TaskItem({ task, onTaskUpdate, onTaskClick, handleTaskItemDelete }) {
  const [hovered, setHovered] = useState(false);

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onTaskUpdate(task.id, e.target.checked);
  };

  return (
    <Box
      sx={{
        position: "relative", // for absolute positioning of the delete button
        p: 1,
        mb: 1,
        borderRadius: 1,
        backgroundColor: "#fff",
        boxShadow: 1,
        display: "flex",
        alignItems: "center",
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "#f1f2f3",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onTaskClick(task)}
    >
      {/* Checkbox Container */}
      <Box
        sx={{
          width: hovered ? "24px" : "0px",
          transition: "width 0.5s",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox
          size="small"
          icon={<CircleOutlined />}
          checkedIcon={<CheckCircle />}
          sx={{ p: 0 }}
          checked={task.dueComplete}
          onClick={handleCheckboxChange}
        />
      </Box>

      {/* Task Title */}
      <Typography
        variant="body2"
        sx={{
          transition: "margin-left 0.5s",
          ml: hovered ? "8px" : "0px",
        }}
      >
        {task.name}
      </Typography>

      {/* Delete Button positioned absolutely */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleTaskItemDelete(task.id);
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s",
          pointerEvents: hovered ? "auto" : "none",
        }}
      >
        <DeleteForeverOutlined sx={{ color: "red" }} />
      </IconButton>
    </Box>
  );
}

export default TaskItem;
