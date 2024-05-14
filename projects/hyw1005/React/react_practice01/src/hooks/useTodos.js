import { useState, useEffect } from "react";
import axios from "axios";

function useTodos(counter) {
    // 상태를 정의합니다.
    const [todos, setTodos] = useState([]);

    // 이 컴포넌트(hooks)가 로드될때 api를 호출하여 todos 상태를 갱신합니다.
    useEffect(()=>{
        axios.get('https://dummyjson.com/todos?limit=' + counter)
        .then(res =>  {
          console.log(res.data.todos);
          setTodos(res.data.todos);
        });
        // deps 로 counter를 받아서 counter가 변경될때마다 useEffect가 실행됩니다.
      }, [counter]); // 2번째 매개변수인 counter가 변경되면, 1번째 매개변수인 함수가 실행됨

   return todos;
}

export default useTodos;