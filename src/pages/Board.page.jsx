import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  archiveList,
  createList,
  getBoard,
  getList,
} from "../services/trelloApi";
import Header from "../components/common/Header";
import BoardAppBar from "../components/BoardAppBar/BoardAppBar";
import TaskList from "../components/TaskList/TaskList";
import AddTaskList from "../components/AddTaskList/AddTaskList";
import { TaskDetailsProvider } from "../context/TaskDetailContext";

const Board = () => {
  const [taskLists, setTaskLists] = useState([]);
  //Board ID
  const { id } = useParams();

  const [board, setboard] = useState({});

  useEffect(() => {
    getBoard(id).then((res) => {
      console.log(res.data);

      setboard(res.data);
    });
    getList(id).then((res) => {
      console.log("Lists", res.data);
      setTaskLists(res.data);
    });
  }, []);
  const handleListAdd = (newListTitle) => {
    createList(id, newListTitle).then((res) => {
      console.log(res.data);
      setTaskLists([...taskLists, res.data]);
    });
  };
  const handleTaskListDelete = async (tasklistid) => {
    try {
      await archiveList(tasklistid);
      setTaskLists((prev) =>
        prev.filter((taskList) => taskList.id !== tasklistid)
      );
    } catch (error) {
      console.error("Failed to delete checklist:", error);
    }
  };
  return (
    <>
      <Header />
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url(${board?.prefs?.backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          paddingTop: 10,
        }}
      >
        <Container maxWidth="xl">
          <BoardAppBar title={board.name} />
          <TaskDetailsProvider>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
                paddingX: 2,
                flexWrap: "nowrap",
                overflowX: "auto",
                scrollbarWidth: "none",

                marginTop: "30px",
              }}
            >
              {taskLists.map((taskList) => (
                <TaskList
                  key={taskList.id}
                  title={taskList.name}
                  taskId={taskList.id}
                  handleListAdd={handleListAdd}
                  handleTaskListDelete={handleTaskListDelete}
                />
              ))}
              <AddTaskList handleListAdd={handleListAdd} />
            </Box>
          </TaskDetailsProvider>
        </Container>
      </Box>
    </>
  );
};

export default Board;
