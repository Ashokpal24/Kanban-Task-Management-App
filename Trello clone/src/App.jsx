import React from "react";
import DragList from "./component/DragList";

const App = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <DragList />
        <DragList />
      </div>
    </>
  );
};
export default App;
