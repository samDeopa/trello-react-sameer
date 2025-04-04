import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// A styled component that applies a blur background
const BlurredAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  boxShadow: "none",
  borderRadius: 100,
}));

export default function BoardAppBar() {
  return (
    <BlurredAppBar position="sticky">
      <Toolbar sx={{ minHeight: 56 }}>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography variant="h6" noWrap sx={{ mr: 2, fontWeight: 600 }}>
            T Board
          </Typography>
          {/* Star Icon (placeholder) */}
          <IconButton aria-label="star board" sx={{ mr: 2 }}>
            <StarBorderIcon />
          </IconButton>
        </Box>

        {/* Right Section: Buttons/Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Filters
          </Button>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Share
          </Button>
          {/* More actions (menu, icons, etc.) can go here */}
        </Box>
      </Toolbar>
    </BlurredAppBar>
  );
}
