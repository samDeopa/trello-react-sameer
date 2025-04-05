import { Box, Container } from "@mui/material";
import Header from "../components/common/Header";
import WorkSpace from "../components/WorkSpace/WorkSpace";

const Home = () => {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ display: "flex" }}>
        <WorkSpace />
      </Container>
    </>
  );
};
export default Home;
