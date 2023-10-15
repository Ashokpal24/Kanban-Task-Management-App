import React, { useState } from "react";
import "./index.css";

const initialNames = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Michael Johnson" },
  { id: "4", name: "Sarah Williams" },
];

const App = () => {
  const [names, setNames] = useState(initialNames);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(names[index]);
    const clone = e.target.cloneNode(true);

    console.log(clone);
    clone.id = "drag-ghost";
    clone.style.position = "absolute";
    clone.style.top = "0px";
    // make this to -1000px to hide this from screen
    clone.style.left = "0px";

    document.getElementsByClassName("name-container")[0].appendChild(clone);

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(clone, 20, 20);
    e.currentTarget.classList.add("placeholder");
  };

  const handleDragOver = (index) => {
    const draggedOverItem = names[index];

    if (draggedItem === draggedOverItem) return;

    const items = names.filter((name) => name !== draggedItem);

    items.splice(index, 0, draggedItem);
    console.log(items);

    setNames(items);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("placeholder");
    var ghost = document.getElementById("drag-ghost");
    if (ghost.parentNode) {
      ghost.parentNode.removeChild(ghost);
    }
    setDraggedItem(null);
  };

  const handleNameChange = (id, newName) => {
    const updatedNames = names.map((name) =>
      name.id === id ? { ...name, name: newName } : name
    );
    setNames(updatedNames);
  };

  return (
    <div className="App">
      <h1>Drag and Drop Names</h1>
      <ul className="name-container">
        {names.map((name, index) => {
          const isDragging = name === draggedItem;

          return (
            <li
              key={name.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={() => handleDragOver(index)}
              onDragEnd={(e) => handleDragEnd(e)}
            >
              {isDragging ? (
                <p></p>
              ) : (
                <input
                  type="text"
                  value={name.name}
                  onChange={(e) => handleNameChange(name.id, e.target.value)}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
