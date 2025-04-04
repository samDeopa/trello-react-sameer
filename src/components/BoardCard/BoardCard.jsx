import {
  Box,
  Container,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import BoardTileFade from "../common/BoardTileFade";
import { StarOutline } from "@mui/icons-material";

const BoardCard = ({ id, name, prefs, onClickHandler }) => {
  return (
    <div className="w-[48%]  md:w-[31%] lg:w-[23%]  relative">
      <Paper
        onClick={onClickHandler}
        sx={{
          height: "96px",
          padding: "8px",
          background: prefs.backgroundImage
            ? `url(${prefs.backgroundImage})`
            : "",
          backgroundColor: prefs.backgroundColor ? prefs.backgroundColor : "",
          backgroundRepeat: "no-repeat",
          backgroundClip: "border-box",
          backgroundPosition: "center",
          backgroundSize: "cover",
          elevation: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <BoardTileFade />
        <Typography
          sx={{
            maxWidth: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "text.card",
          }}
          fontWeight={600}
        >
          {name}
        </Typography>
        <Box
          className="board-tile-details-sub-container"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton aria-label="star board">
            <StarOutline
              fontSize="small"
              onClick={(e) => e.stopPropagation()}
              sx={{
                color: "white",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.5)",
                },
              }}
            />
          </IconButton>
        </Box>
      </Paper>
    </div>
  );
};

export default BoardCard;
