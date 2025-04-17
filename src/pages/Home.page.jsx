import { Container } from "@mui/material";
import Header from "../components/common/Header";
import WorkSpace from "../components/WorkSpace/WorkSpace";
import populateTrello from "../scripts/populateTrello";

const Home = () => {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ display: "flex" }}>
        <WorkSpace />
      </Container>
      <button
        onClick={() => {
          populateTrello();
        }}
        className="bg-amber-100"
      >
        Pouplate Trello
      </button>
    </>
  );
};
export default Home;
