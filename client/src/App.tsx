import ModeSelector from "./components/tools/ModeSelector";
import Timer from "./components/tools/Timer";
import Start from "./components/tools/Start";
import Header from "./components/interface/Header";
import TasksList from "./components/interface/TasksList";
import TaskForm from "./components/tools/TaskForm";
import { useTasks } from "./contexts/TasksContext";
import AddTask from "./components/tools/AddTask";
import TasksSection from "./components/interface/TasksSection";
import ActiveTask from "./components/interface/ActiveTask";
import Box from "./components/interface/Box";
import Main from "./components/interface/Main";
import Container from "./components/interface/Container";

function App() {
  const { taskForm } = useTasks();

  return (
    <Container>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm pt-12 pb-14">
        <div className="text-[rgb(34,34,34)] rounded-[8px] bg-white relative max-w-sm w-[95%] z-50 translate-y-[20px] shadow overflow-hidden m-auto"></div>
      </div>
      <Header />
      <Main>
        <Box>
          <ModeSelector />
          <Timer />
          <Start />
        </Box>
        <ActiveTask />
        <TasksSection>
          <TasksList />
          {taskForm.show && !taskForm.editor ? <TaskForm /> : <AddTask />}
        </TasksSection>
      </Main>
    </Container>
  );
}

export default App;
