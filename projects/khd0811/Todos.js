import { useState, useEffect } from "react";
import "./Todos.css";
import useTodos from "../hooks/useTodos";
import { Button } from "@midasit-dev/moaui";

// 새로운 컴포넌트를 정의합니다.
function Todos() {
  const [counter, setCounter] = useState(1);
  // api 호출을 통해 받아온 데이터를 todos라는 이름으로 사용합니다. (내부에서 useState, useEffect 사용됨)
  const todos = useTodos(counter);

  // 상태로 관리될 카운트 변수들을 선언합니다.
  const [countAll, setCountAll] = useState(0);
  const [completedCountTrue, setCompletedCountTrue] = useState(0);
  const [completedCountFalse, setCompletedCountFalse] = useState(0);

  // todos 배열이 변경될 때마다 카운트를 업데이트 합니다.
  useEffect(() => {
    setCountAll(todos.length);
    const completedTrue = todos.filter(todo => todo.completed).length;
    setCompletedCountTrue(completedTrue);
    setCompletedCountFalse(todos.length - completedTrue);
  }, [todos]);  // todos 배열이 업데이트될 때마다 이 effect를 실행합니다.

  function onClickButton() {
    setCounter(counter + 1)
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
      Count: {countAll} | Completed: {completedCountTrue} | Not Completed: {completedCountFalse}
      </div>
      <ul>
        {
          // todos 배열을 순회하며 각각의 요소를 <li> 태그를 사용하여 출력합니다.
          // 이렇게 반복되는 요소에 key라는 프로퍼티가 빠지면 콘솔에 경고가 뜹니다.
          todos.map((todo) => (
            <li key={todo.id}>{todo.todo}</li>
          ))
        }
      </ul>
    </div>
  );
}

// 정의한 컴포넌트를 외부에서 사용할 수 있도록 export 합니다.
export default Todos;
