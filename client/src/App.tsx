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
import SettingForm from "./components/setting/SettingForm";
import { useState } from "react";
import TimeStats from "./components/tools/TimeStats";

function App() {
  const { taskForm } = useTasks();
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const [showTasksOption, setShowTasksOption] = useState<boolean>(false);

  return (
    <Container setShowTasksOption={setShowTasksOption}>
      {showSetting && <SettingForm setShowSetting={setShowSetting} />}
      <Header setShowSetting={setShowSetting} />
      <Main>
        <Box>
          <ModeSelector />
          <Timer />
          <Start />
        </Box>
        <ActiveTask />
        <TasksSection setShowTasksOption={setShowTasksOption} showTasksOption={showTasksOption}>
          <TasksList />
          {taskForm.show && !taskForm.editor ? <TaskForm /> : <AddTask />}
          <TimeStats />
        </TasksSection>
      </Main>
    </Container>
  );
}

export default App;
