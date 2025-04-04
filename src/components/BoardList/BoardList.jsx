import { Box } from "@mui/material";
import BoardCard from "../BoardCard/BoardCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BoardPopover from "../modals/BoardPopover";

const BoardList = ({ boards }) => {
  const navigate = useNavigate();
  //for Opening the Modal
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
    setPopoverOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 3.7,
        "@media (min-width:1024px)": {
          gap: 2.8,
        },
      }}
    >
      {boards.map(({ id, name, prefs }) => (
        <BoardCard
          key={id}
          id={id}
          name={name}
          prefs={prefs}
          onClickHandler={() => {
            navigate(`/board/${id}`);
          }}
        />
      ))}
      {boards.length != 0 && (
        <BoardCard
          id={"add"}
          name="Create New Board"
          prefs={{ backgroundColor: "Grey" }}
          onClickHandler={(e) => {
            handleOpenPopover(e);
          }}
        />
      )}
      <BoardPopover
        anchorEl={anchorEl}
        open={popoverOpen}
        onClose={() => {
          setPopoverOpen(false);
          setAnchorEl(null);
        }}
      />
    </Box>
  );
};

export default BoardList;
