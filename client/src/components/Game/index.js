import React, { useState, useEffect } from "react"

import './style.css'

function Game() {

  let [state, setState] = useState({x: 50, y: 50})

  const btnUp = {
    id: "up",
    label: "U",
    change: {x: state.x, y: state.y - 1},
  }
  const btnDown = {
    id: "down",
    label: "D",
    change: {x: state.x, y: state.y + 1}
  }
  const btnLeft = {
    id: "left",
    label: "L",
    change: {x: state.x - 1, y: state.y}
  }
  const btnRight = {
    id: "right",
    label: "R",
    change: {x: state.x + 1, y: state.y},
  }
  const movementButtons = [btnUp, btnDown, btnLeft, btnRight]

  const keydownHandler = (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
    /* On focus is cool because it does not seem to allow competing clicks */
    /* but it adjusts the screen and brings the element into focus when not in fullscreen */
    // console.log(event)
    switch (event.code) {
      case "ArrowDown":
      case "KeyS":
        // document.getElementById("btn-down").focus();
        handleMovement(btnDown);
        break;
      case "ArrowUp":
      case "KeyW":
        // document.getElementById("btn-up").focus();
        handleMovement(btnUp);
        break;
      case "ArrowLeft":
      case "KeyA":
        // document.getElementById("btn-left").focus();
        handleMovement(btnLeft);
        break;
      case "ArrowRight":
      case "KeyD":
        // document.getElementById("btn-right").focus()
        handleMovement(btnRight)
        break;
      default: console.log('BROKEN');
    };
  }

  const handleMovement = (button) => {

    if (button.defaultPrevented) {
      // Do nothing if event already handled
      return;
    }

    setState(button.change)
  }

  useEffect(() => {
    console.log(state)
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // Arrows and WASD listener
  window.addEventListener("keydown", keydownHandler);
  // Where do i need to removeEventListener??? 

  // 3x3 is the size of the snake head  

  return (
    <div id="eisle">
      <div id="arrows-container">
        {
          movementButtons.map(button => (
            <button key={button.id} id={`btn-${button.id}`}
              onClick={handleMovement.bind(this, button)}
              onTouchStart={handleMovement.bind(this, button)}
            >{button.label}
            </button>
          ))
        }
      </div>
      <div id="viewport">
        <div id="head" style={{ left: state.x + "%", top: state.y + "%" }}></div>
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