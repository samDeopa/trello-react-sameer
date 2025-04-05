import React, { useState } from "react";
import { Box, Typography, Checkbox } from "@mui/material";

function TaskItem({ task, onTaskUpdate, onTaskClick }) {
  const [hovered, setHovered] = useState(false);
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onTaskUpdate(task.id, e.target.checked);
  };

  return (
    <Box
      sx={{
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
          sx={{ p: 0 }}
          checked={task.dueComplete}
          onClick={handleCheckboxChange}
        />
      </Box>

      {/* Task Title with a margin-left that aligns with the expanded checkbox container */}
      <Typography
        variant="body2"
        sx={{
          transition: "margin-left 0.5s",
          ml: hovered ? "8px" : "0px",
        }}
      >
        {task.name}
      </Typography>
    </Box>
  );
}

export default TaskItem;
