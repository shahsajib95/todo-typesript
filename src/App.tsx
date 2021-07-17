import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import TodoTask from "./components/TodoTask";
import { ITask } from "./Intrefaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadLine, setDeadLine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [error, setError] = useState<String>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task") {
      setError("")
      if (e.target.value.length === 0) {
        setError("Fields can not be empty");
      } else {
        setError("");
      }
      setTask(e.target.value);
    } else {
      setDeadLine(Number(e.target.value));
    }
  };

  const addTask = (): void => {
    setError("")
    if (!task && !deadLine) return setError("Fields can not be empty");
    if (!task) return setError("Task can not be empty");
    if (!deadLine) return setError("Deadline can not be 0");
    const newTask = { taskName: task, deadLine: deadLine };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadLine(0);
  };

  const completeTask = (taskNameDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameDelete;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadLine}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      {error && <p style={{color: "red"}}><b>*{error}</b></p>}
      <div className="todoList">
        {todoList.map((task: ITask, key) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
