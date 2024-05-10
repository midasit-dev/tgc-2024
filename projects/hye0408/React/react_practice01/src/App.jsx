import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Todos from "./components/Todos";
import { Button } from "@midasit-dev/moaui";

function App() {
  const [name, setName] = React.useState("TGC");
  const [test, setTest] = React.useState("test");

  React.useEffect(() => {
    console.log("click2")
    setTest("test2")
  }, [name]);

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
        <Todos/>
      </header>
    </div>
  );
}

export default App;
