import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0079bf", // Trello blue
    },
    secondary: {
      main: "#5ba4cf",
    },
    background: {
      default: "#f4f5f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
      card: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", "Segoe UI", Arial, sans-serif',
  },
});

export default theme;
