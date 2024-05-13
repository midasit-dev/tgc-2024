import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Todos from "./components/Todos.js";
import { Button } from "@midasit-dev/moaui";

function App() {
  const [name, setName] = React.useState("TGC");
  const [test, setTest] = React.useState("test");
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("click2")
    setTest("test2")
  }, [name]);

  React.useEffect(() => {
    setCount(`남은 횟수는 ${150-count} 번 입니다`);
  }, [count]);

  function onClickName(event) {
    console.log("click1")
    setName("hye");
  }

  const onClickName2 = (event) => {
    console.log(event.target.className);
    console.log("clicked name:", name);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div id="div_text">
          {test}
        </div>
        <div className="div_name" onClick={onClickName}>
          {name}
        </div>
        <div id="spare_count"> {count} </div>
        <Todos/>
      </header>
    </div>
  );
}

export default App;
