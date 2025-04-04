import React, { createContext, useState, useContext } from "react";

// Create the context
const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState([]);

  return (
    <BoardContext.Provider value={{ boards, setBoards }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
}
