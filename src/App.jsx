import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.page";
import { BoardProvider } from "./context/BoardContext";
import Board from "./pages/Board.page";

function App() {
  return (
    <BoardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board/:id" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </BoardProvider>
  );
}

export default App;
