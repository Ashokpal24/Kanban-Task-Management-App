import React, { useState } from "react";
import "./DragList.css";

const itemList = ["item1", "item2", "item3", "item4"];

export default function DragList() {
  const [items, setitems] = useState(itemList);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (event) => {
    if (isDragging) {
      var ghost = document.getElementById("drag-ghost");
      if (ghost) {
        ghost.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    var ghost = document.getElementById("drag-ghost");
    var element = document.getElementsByClassName("placeholder")[0];
    if (element != undefined) element.classList.remove("placeholder");
    if (ghost != undefined) {
      setIsDragging(false);
      setDraggedItem(null);
      ghost.parentNode.removeChild(ghost);
    }
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  const handleMouseEnter = (index) => {
    if (draggedItem === items[index]) return;

    if (draggedItem != null) {
      const itemList = items.filter((item) => item !== draggedItem);
      itemList.splice(index, 0, draggedItem);
      // console.log(itemList);
      setitems(itemList);
    }
  };

  const handleMouseDown = (event, index) => {
    setDraggedItem(items[index]);
    // console.log("bop!");

    const clone = event.target.parentNode.cloneNode(true);
    clone.id = "drag-ghost";
    clone.style.position = "absolute";
    clone.style.top = "0px";
    clone.style.left = "-75px";
    clone.style.pointerEvents = "none";
    clone.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;

    clone.firstElementChild.style.rotate = "5deg";
    clone.firstElementChild.style.pointerEvents = "none";
    clone.firstElementChild.style.backgroundColor = "rgb(196, 196, 196)";
    setIsDragging(true);
    document.getElementsByClassName("list-container")[0].appendChild(clone);
    event.currentTarget.classList.add("placeholder");
  };

  return (
    <div className="list-container">
      {items.map((item, index) => (
        <div
          className="item-container"
          key={item}
        >
          <div
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseDown={(event) => handleMouseDown(event, index)}
            className="list-item"
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}
