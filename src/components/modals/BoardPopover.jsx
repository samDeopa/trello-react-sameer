import React, { useState, useEffect } from "react";
import {
  Popover,
  IconButton,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { createBoard, fetchBoards } from "../../features/boards/BoardSlice";

const backgroundOptions = [
  "https://images.unsplash.com/photo-1741812191037-96bb5f12010a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
  "https://images.unsplash.com/photo-1742937163916-78fd07cc3b49?ixlib=rb-4.0.3\u0026q=85\u0026fm=jpg\u0026crop=entropy\u0026cs=srgb&w=400",
  "https://images.unsplash.com/photo-1742845918430-c6093f93f740?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
  "https://images.unsplash.com/photo-1742105682489-94149abb1009?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
  "https://images.unsplash.com/photo-1741936428950-3f66f0a69320?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
];

const BackgroundThumbnail = styled("img")({
  width: 60,
  height: 40,
  borderRadius: 4,
  objectFit: "cover",
  cursor: "pointer",
  border: "2px solid transparent",
  "&:hover": {
    opacity: 0.8,
  },
});

export default function BoardPopover({ anchorEl, open, onClose }) {
  const dispatch = useDispatch();
  const { boards, loading, error } = useSelector((state) => state.boards);

  const [selectedBg, setSelectedBg] = useState(backgroundOptions[0]);
  const [boardTitle, setBoardTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (open && boards.length === 0) {
      dispatch(fetchBoards());
    }
  }, [open, boards.length, dispatch]);

  const handleClose = () => {
    setBoardTitle("");
    setTitleError("");
    setSelectedBg(backgroundOptions[0]);
    onClose();
  };

  const handleCreateBoard = async () => {
    if (!boardTitle.trim()) {
      setTitleError("Board title is required");
      return;
    }

    try {
      dispatch(
        createBoard({
          title: boardTitle,
          prefs_background: selectedBg,
        })
      );
      handleClose();
    } catch (e) {
      console.error("Error creating board", e);
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "center", horizontal: "right" }}
      transformOrigin={{ vertical: "center", horizontal: "left" }}
      slotProps={{ paper: { sx: { p: 2, width: 280 } } }}
    >
      {/* Header */}
      <Box sx={{ position: "relative", textAlign: "center", mb: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Create board
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 0, top: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Preview */}
      <Box
        sx={{
          width: "100%",
          height: 120,
          backgroundImage: `url(${selectedBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          mb: 2,
        }}
      />

      {/* Background Options */}
      <Grid container spacing={1} mb={2}>
        {backgroundOptions.map((bg) => (
          <Grid item key={bg}>
            <BackgroundThumbnail
              src={bg}
              alt="background"
              style={{
                borderColor: selectedBg === bg ? "#0079bf" : "transparent",
              }}
              onClick={() => setSelectedBg(bg)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Title Input */}
      <TextField
        label="Board title *"
        variant="outlined"
        fullWidth
        value={boardTitle}
        onChange={(e) => {
          setBoardTitle(e.target.value);
          if (titleError) setTitleError("");
        }}
        error={!!titleError}
        helperText={titleError}
        sx={{ mb: 2 }}
      />

      {/* Actions */}
      <Stack spacing={1}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleCreateBoard}
          disabled={loading === "loading"}
        >
          {loading === "loading" ? "Creating…" : "Create"}
        </Button>
        {error && (
          <Typography color="error" variant="caption">
            {error}
          </Typography>
        )}
        <Typography variant="caption" textAlign="center">
          By using images from Unsplash, you agree to their license and Terms.
        </Typography>
      </Stack>
    </Popover>
  );
}
