// WORKING COPY OF INDEX>JS

import React, { useState, useEffect, useCallback } from "react"

import './style.css'

function Game() {

  let [state, setState] = useState({ x: 50, y: 50 })

  const btnUp = {
    id: "up",
    label: "U",
    change: { x: state.x, y: state.y - 1 },
  }
  const btnDown = {
    id: "down",
    label: "D",
    change: { x: state.x, y: state.y + 1 }
  }
  const btnLeft = {
    id: "left",
    label: "L",
    change: { x: state.x - 1, y: state.y }
  }
  const btnRight = {
    id: "right",
    label: "R",
    change: { x: state.x + 1, y: state.y },
  }
  const movementButtons = [btnUp, btnDown, btnLeft, btnRight]

  // DO I NEED TO CHANGE THIS useCallBack to handleMovement instead????
  const keydownHandler = useCallback(
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if event already handled
      }
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          handleMovement(btnUp);
          break;
        case "ArrowDown":
        case "KeyS":
          handleMovement(btnDown);
          break;
        case "ArrowLeft":
        case "KeyA":
          handleMovement(btnLeft);
          break;
        case "ArrowRight":
        case "KeyD":
          handleMovement(btnRight)
          break;
        default: console.log('BROKEN');
      };
    },
    [btnRight, btnLeft, btnUp, btnDown]
  );

  const handleMovement = (button) => {
    if (button.defaultPrevented) {
      // Do nothing if event already handled
      return;
    }
    setState(button.change)
    document.getElementById(`btn-${button.id}`).focus();
  }

  // renders on initalization .. duh
  // so the eventListener gets added from the start and on every render
  // while also removing dublicates 
  useEffect(() => {
    console.log(state)
    // Arrows and WASD listener
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [state, keydownHandler]);  

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