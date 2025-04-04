import React, { useContext, useState } from "react";
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
import { createBoard } from "../../services/trelloApi";
import { useBoardContext } from "../../context/BoardContext";

// Example background image options
const backgroundOptions = [
  "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/6566fcc49ee3c03f225dc13229ffb5af/photo-1742156345582-b857d994c84e.webp",
  "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/cosmos/small.jpg",
  "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/canyon/small.jpg",
  "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/ocean/small.jpg",
  "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/river/small.jpg",
];

const BackgroundThumbnail = styled("img")(({ theme }) => ({
  width: 60,
  height: 40,
  borderRadius: 4,
  objectFit: "cover",
  cursor: "pointer",
  border: "2px solid transparent",
  "&:hover": {
    opacity: 0.8,
  },
}));

export default function BoardPopover({ anchorEl, open, onClose }) {
  const [selectedBg, setSelectedBg] = useState(backgroundOptions[0]);
  const [boardTitle, setBoardTitle] = useState("");
  const [error, setError] = useState("");

  const { boards, setBoards } = useBoardContext();
  console.log(boards);

  const handleClose = () => {
    onClose();
  };

  const handleCreateBoard = () => {
    if (!boardTitle.trim()) {
      setError("Board title is required");
      return;
    }
    console.log(selectedBg);

    const newBoard = {
      background: selectedBg,
      title: boardTitle,
    };
    createBoard(newBoard).then((res) => {
      if (res.status === 200) {
        setBoards([...boards, { ...newBoard }]);
      }
      console.log(res);
    });
    console.log("Creating board with:", {
      background: selectedBg,
      title: boardTitle,
    });
    onClose();
  };

  const handleBackgroundSelect = (bg) => {
    setSelectedBg(bg);
  };

  const handleBoardTitleChange = (e) => {
    setBoardTitle(e.target.value);
    if (error) setError("");
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      slotProps={{
        paper: {
          sx: { p: 2, width: 250 },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            fontWeight: "bold",
          }}
        >
          Create board
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
          }}
        >
          <CloseIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Box>

      {/* Preview Image */}
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

      {/* Background Thumbnails */}
      <Grid container spacing={1} mb={2}>
        {backgroundOptions.map((bg) => (
          <Grid item key={bg}>
            <BackgroundThumbnail
              src={bg}
              alt="background"
              style={{
                borderColor: selectedBg === bg ? "#0079bf" : "transparent",
              }}
              onClick={() => handleBackgroundSelect(bg)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Board Title Input */}
      <TextField
        label="Board title *"
        variant="outlined"
        fullWidth
        value={boardTitle}
        onChange={handleBoardTitleChange}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
      />

      <Stack spacing={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateBoard}
          sx={{ textTransform: "none" }}
        >
          Create
        </Button>
        <Typography sx={{ font: "12", fontWeight: "light", fontSize: 12 }}>
          By using images from Unsplash, you agree to their license and Terms of
          Service
        </Typography>
      </Stack>
    </Popover>
  );
}
