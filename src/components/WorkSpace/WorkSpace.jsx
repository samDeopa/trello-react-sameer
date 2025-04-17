import { Box, Typography } from "@mui/material";
import BoardList from "../BoardList/BoardList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "../../features/boards/BoardSlice";

const WorkSpace = () => {
  const dispatch = useDispatch();
  const { boards, loading } = useSelector((state) => state.boards);

  useEffect(() => {
    if (loading === false) {
      dispatch(fetchBoards());
    }
  }, [loading, dispatch]);

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
