import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Todos from "./components/Todos";
import { Button } from "@midasit-dev/moaui";

function App() {
  const [name, setName] = React.useState("Liam");

  const onClickName = (event) => {
    setName(name === "Liam" ? "TGC" : "Liam");
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
        <Todos/>
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
