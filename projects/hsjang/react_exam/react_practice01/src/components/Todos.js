import { useEffect, useState } from "react";
import "./Todos.css";
import useTodos from "../hooks/useTodos";
import { Button } from "@midasit-dev/moaui";

// 새로운 컴포넌트를 정의합니다.
function Todos() {
  const [counter, setCounter] = useState(1);
  const [total_count, setTotalCounter] = useState(0);
  const [complete_count, setCompleteCounter] = useState(0);
  const [incomplete_count, setIncompleteCounter] = useState(0);

  // api 호출을 통해 받아온 데이터를 todos라는 이름으로 사용합니다. (내부에서 useState, useEffect 사용됨)
  const todos = useTodos(counter);

  useEffect(() => {
    const new_total_count = todos.length;
    const new_complete_count = todos.filter((todo) => todo.completed).length;
    const new_incomplete_count = new_total_count - new_complete_count; 
    
    setTotalCounter(new_total_count);
    setCompleteCounter(new_complete_count);
    setIncompleteCounter(new_incomplete_count);
  }, [todos]);

  
  function onClickButton() {
    console.log("clicked Add Todo list button");
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
      <h3>
        Total completed: {total_count}
      </h3>
      <h3>
        Completed: {complete_count}
      </h3>
      <h3>
        Incompleted: {incomplete_count}
      </h3>
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

// 정의한 컴포넌트를 외부에서 사용할 수 있또록 export 합니다.
export default Todos;
