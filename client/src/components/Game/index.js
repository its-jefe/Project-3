import React, { useState, useEffect } from "react"

import './style.css'

function Game() {

  const btnUp = {
    id: "up",
    label: "U",
    value: -1
  }
  const btnLeft = {
    id: "left",
    label: "L",
    value: -1
  }
  const btnDown = {
    id: "down",
    label: "D",
    value: 1
  }
  const btnRight = {
    id: "right",
    label: "R",
    value: 1
  }

  const movementButtons = [btnUp, btnDown, btnLeft, btnRight]

  // it let me use delta!
  let [x, Δx] = useState(50)
  let [y, Δy] = useState(50)

  //🎶💂🎶💂🎶🎤🎶💂🎶💂🎶
  // let oneDirection = setInterval ({

  // }, 20)

  function changeX(button) {
      return x + button.value
  }

  const handleMovement = (button) => {
    // need to make this a time interval function

    if (button.id === "left" || button.id === "right") {
      let changeX = setInterval(Δx(x + button.value), 200)
    } else {
      Δy(y + button.value)
    }
  }
  
  useEffect(()=> {
    // actually logs correct "updated" coordinates
    console.log("(" + x + "," + y + ")")
  })
  
  // Arrows and WASD listener
  window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
    // NEED TO CANCEL ALL EVENTS ON ANOTHER KEY PRESS
    /* On focus is cool because it does not seem to allow competing clicks */
    switch (event.code) {
      case "ArrowDown":
      case "KeyS":
        document.getElementById("btn-down").focus()
        // handleMovement(btnDown)
        break;
      case "ArrowUp":
      case "KeyW":
        // handleMovement(btnUp)
        document.getElementById("btn-up").focus()
        break;
      case "ArrowLeft":
      case "KeyA":
        // handleMovement(btnLeft)
        document.getElementById("btn-left").focus()
        break;
      case "ArrowRight":
      case "KeyD":
        // handleMovement(btnRight)
        document.getElementById("btn-right").focus()
        break;
    }
  })

  return (
    <div id="eisle">
      <div id="arrows-container">
        {
          movementButtons.map(button => (
            <button key={button.id} id={`btn-${button.id}`}
              //decided to go with onFocus() instead of onClick()
              onFocus={() => handleMovement(button)}
              onTouchStart={() => handleMovement(button)}
            >{button.label}
            </button>
          ))
        }
      </div>
      <div id="viewport">
        <div id="head" style={{ left: x + "%", top: y + "%" }}></div>
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