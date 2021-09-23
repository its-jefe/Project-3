import React, { useState, useEffect } from "react"

import './style.css'

// consider adding initial state of the ball

/*
const initialState = {
  x: window.innerWidth,
  y: window.innerHeight
}
*/

// Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

/* TEST
function Game() {
  // Declare a new state variable, which we'll call "count"

  function plusOne() {
    return count + 1
  }

  // useState returns a pair: the current state value and a function that lets you update it.
  const [count, setCount] = useState(0);

  let [height, setHeight] = useState(window.innerHeight)
  let [width, setWidth] = useState(window.innerWidth)

  function dimensions() {
    console.log("height: ", height);
    console.log("width: ", width);
    return (
      height = window.innerHeight,
      width = window.innerWidth
      )
  }

  useEffect(() => {
    setHeight(dimensions);
    setWidth(dimensions);
  }, [height, width]);
  // Array values must be from the component scope (i.e., props, state, context, or values derived from the aforementioned).

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(plusOne)}>
        Click me
      </button>
    </div>
  );
}
*/

function Game() {

  const btnUp = {
    id: "up",
    label: "U"
  }
  const btnDown = {
    id: "down",
    label: "D"
  }
  const btnLeft = {
    id: "left",
    label: "L"
  }
  const btnRight = {
    id: "right",
    label: "R"
  }
  const movementButtons = [btnUp, btnDown, btnLeft, btnRight]
  let head = <div id="head"></div>

  window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
    switch (event.code) {
      case "ArrowDown":
        handleMovement(btnDown)
        break;
      case "ArrowUp":
        handleMovement(btnUp)
        break;
      case "ArrowLeft":
        handleMovement(btnLeft)
        break;
      case "ArrowRight":
        handleMovement(btnRight)
        break;
    }
  })

  const handleMovement = (button) => {
    console.log(button.id)
    if (button.id === 'right') {
      head = <div></div>
    }
  }

  return (
    <div id="eisle">
      <div id="arrows-container">
        {
          movementButtons.map(button => (
            <button key={button.id} id={`btn-${button.id}`} onClick={() => handleMovement(button)}>{button.label}</button>
          ))
        }
      </div>
      <div id="viewport">
        {head}
      </div>
      <div id="buttons-container">
        <button id="btn-A">A</button>
        <button id="btn-B">B</button>
      </div>
    </div>
  )
}

export default Game;

// accesskey global attribute provides a hint for generating a keyboard shortcut for the current element.