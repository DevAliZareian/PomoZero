import ModeSelector from "./components/tools/ModeSelector";
import Timer from "./components/tools/Timer";
import Start from "./components/tools/Start";
import Header from "./components/interface/Header";
import TasksList from "./components/interface/TasksList";
import TaskForm from "./components/tools/TaskForm";
import { useTasks } from "./contexts/TasksContext";
import AddTask from "./components/tools/AddTask";
import TasksSection from "./components/interface/TasksSection";
import CurrentTask from "./components/interface/CurrentTask";
import Box from "./components/interface/Box";
import Main from "./components/interface/Main";
import Container from "./components/interface/Container";

function App() {
  const { taskForm } = useTasks();

  return (
    <Container>
      <Header />
      <Main>
        <Box>
          <ModeSelector />
          <Timer />
          <Start />
        </Box>
        <CurrentTask />
        <TasksSection>
          <TasksList />
          {taskForm.show && !taskForm.editor ? <TaskForm /> : <AddTask />}
        </TasksSection>
      </Main>
    </Container>
  );
}

export default App;
