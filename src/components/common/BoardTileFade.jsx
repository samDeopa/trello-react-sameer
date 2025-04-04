import Box from "@mui/material/Box";

const BoardTileFade = () => {
  return (
    <Box
      component="span"
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 150%)",
        ":hover": {
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%)",
        },
      }}
    />
  );
};

export default BoardTileFade;
