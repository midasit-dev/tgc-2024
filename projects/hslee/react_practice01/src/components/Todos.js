import { useState, useEffect } from "react";
import "./Todos.css";
import useTodos from "../hooks/useTodos";
import { Button } from "@midasit-dev/moaui";

function Todos() {
  const [counter, setCounter] = useState(1);
  const todos = useTodos(counter);
  const [totalCount, setTotalCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [notCompletedCount, setNotCompletedCount] = useState(0);

  // todos 배열이 업데이트될 때마다 총 개수, 완료된 개수, 미완료된 개수를 업데이트합니다.
  useEffect(() => {
    setTotalCount(todos.length);
    const completed = todos.filter(todo => todo.completed).length;
    setCompletedCount(completed);
    setNotCompletedCount(todos.length - completed);
  }, [todos]);

  function onClickButton() {
    setCounter(counter + 1);
  }

  return (
    <div className="Todos">
      <Button
        variant="contained"
        width="auto"
        color="normal"
        onClick={onClickButton}
      >
        Add Todo list
      </Button>
      <div>
        <p>Total: {totalCount}</p>
        <p>Completed: {completedCount}</p>
        <p>Not Completed: {notCompletedCount}</p>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
