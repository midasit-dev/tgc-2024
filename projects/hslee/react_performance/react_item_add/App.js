import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    const newItem = `새 항목 ${items.length + 1}`;
    setItems([...items, newItem]);
  };

  return (
    <div id="item-list">
      <button onClick={addItem}>항목 추가</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;