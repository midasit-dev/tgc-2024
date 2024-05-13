import { useState } from "react";
import "./Todos.css";
import useTodos from "../hooks/useTodos.js";
import { Button } from "@midasit-dev/moaui";

// 새로운 컴포넌트를 정의합니다.
function Todos() {
  const [counter, setCounter] = useState(1);
  // api 호출을 통해 받아온 데이터를 todos라는 이름으로 사용합니다. (내부에서 useState, useEffect 사용됨)
  const [count, setCount] = useState(0);
  const todos = useTodos(counter);
 

  function onClickButton() {
    setCounter(counter+1)
    setCount(count+1);
  }
  
  return (
    <div className="Todos">
      <p>버튼이 {count} 번 클릭되었습니다.</p>
      <p>남은 횟수는 {149-count}번 입니다.</p>
      <Button
        variant="contained"
        width="auto"
        color="normal"
        onClick={onClickButton}
      >
        Add Todo list
      </Button>
      <ul>
        {todos.map((todo) => (
            <li key={todo.id}>{todo.todo}</li>
          ))}
      </ul>

    </div>
  );
}

// 새로운 컴포넌트를 정의합니다. -> 숫자세기
/* function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="Counter">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}*/


// 정의한 컴포넌트를 외부에서 사용할 수 있또록 export 합니다.
export default Todos ;
