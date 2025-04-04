import { Box, Typography } from "@mui/material";
import BoardList from "../BoardList/BoardList";
import { useEffect } from "react";
import { getBoards } from "../../services/trelloApi";
import { useBoardContext } from "../../context/BoardContext";

const WorkSpace = () => {
  const { boards, setBoards } = useBoardContext();

  useEffect(() => {
    getBoards()
      .then(({ data }) => {
        setBoards(data);
      })
      .catch((err) => {
        console.error("Error fetching boards:", err);
      });
  }, []);

  return (
    <Box sx={{ paddingTop: 10 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "600", color: "text.secondary", paddingY: "12px" }}
      >
        YOUR WORKSPACES
      </Typography>
      <BoardList boards={boards} />
    </Box>
  );
};

export default WorkSpace;
