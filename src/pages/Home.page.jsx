import { Box, Container } from "@mui/material";
import Header from "../components/common/Header";
import WorkSpace from "../components/WorkSpace/WorkSpace";

const Home = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ display: "flex" }}>
        <WorkSpace />
      </Container>
    </div>
  );
};
export default Home;
