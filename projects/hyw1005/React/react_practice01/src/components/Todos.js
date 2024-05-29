import { useState, useEffect } from "react";
import "./Todos.css";
import useTodos from "../hooks/useTodos";
import { Button } from "@midasit-dev/moaui";

// 새로운 컴포넌트를 정의합니다.
// function CompletedCounter({todos}){

//   const completedCounted = todos.filter(todo => todo.completed).length;
//   return (
//     <div>
//       <h2>Completed: {completedCounted}</h2>
//     </div>
//   );
// }
// function IncompleteCounter({todos}){
//   const incompleteCounted = todos.filter(todo => !todo.completed).length;
//   return (
//     <div>
//       <h2>Incomplete: {incompleteCounted}</h2>
//     </div>
//   );
// }
// function TotalCounter({todos}){
//   return (
//     <div>
//       <h2>Total: {todos.length}</h2>
//     </div>
//   );
// }


function Todos() {
  const [counter, setCounter] = useState(1);
  const [completedCounted, setCompletedCounted] = useState(0);
  const [incompleteCounted, setIncompleteCounted] = useState(0);
  const [total, setTotal] = useState(0);
  // api 호출을 통해 받아온 데이터를 todos라는 이름으로 사용합니다. (내부에서 useState, useEffect 사용됨)
  const todos = useTodos(counter);

  function onClickButton() {
    setCounter(counter + 1 )
    // console.log("clicked Add Todo list button");
  }

  useEffect(() => {
    const completedCounted = todos.filter(todo => todo.completed).length;
    setCompletedCounted(completedCounted);
    const incompleteCounted = todos.filter(todo => !todo.completed).length;
    setIncompleteCounted(incompleteCounted);
    setTotal(todos.length);
  }, [todos])
    
  return (
    // JSX 문법을 사용하여 화면을 구성합니다.

    <div className="Todos">
      <Button
        variant="contained"
        width="auto"
        color="normal"
        onClick={onClickButton}
      >
        Add Todo list
      </Button>
      <h2>Total: {total}</h2>
      <h2>Completed: {completedCounted}</h2>
      <h2>Incomplete: {incompleteCounted}</h2>
      {/* <TotalCounter todos={todos}/>
      <CompletedCounter todos={todos}/>
      <IncompleteCounter todos={todos}/>  */}
      <ul>
        {
          // todos 배열을 순회하며 각각의 요소를 <li> 태그를 사용하여 출력합니다.
          // 이렇게 반복되는 요소에 key라는 프로퍼티가 빠지면 콘솔에 경고가 뜹니다.
          todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>{todo.todo}</li>
            // <li key={todo.id}>{todo.todo}</li>
          ))
        }
      </ul>
    </div>
  );
}

// 정의한 컴포넌트를 외부에서 사용할 수 있또록 export 합니다.
export default Todos;
