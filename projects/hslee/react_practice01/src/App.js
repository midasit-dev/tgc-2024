import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Todos from "./components/Todos";
import { Button } from "@midasit-dev/moaui";

function App() {
  const [name, setName] = React.useState("hslee");

  React.useEffect(() => {
    console.log("use effect");
    return () => {
      console.log("cleanup");
    };
  }, [name]);

  function onClickName(event) {
    setName(name === "hslee" ? "TGC" : "hslee");
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
          Edit <code>src/App.js</code> and save to reload.
        </div>
        <div className="div_name" onClick={onClickName}>
          {name}
        </div>
        { <Todos/> }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
