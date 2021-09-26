import React, { useReducer, useEffect, useCallback } from "react"

import './style.css'

// consider using an SVG or something that can be split
// consider using 4 divs that come together to create the ball
// really it doesn't look that bad tho so maybe forget ab it

const xReducer = (x, influence) => {

  if (x === 100 && influence === 1) {
    return x = 0
  }
  if (x === 0 && influence === -1) {
    return x = 100
  }
  return x + influence
}

const yReducer = (y, influence) => {
  if (y === 100 && influence === 1) {
    return y = 0
  }
  if (y === 0 && influence === -1) {
    return y = 100
  }
  return y + influence
}

const dirReducer = (dir, direction) => {
  return dir = direction
}

function Game() {

  const [x, setX] = useReducer(xReducer, 50)
  const [y, setY] = useReducer(yReducer, 50)
  const [dir, setDir] = useReducer(dirReducer, null)

  const btnUp = {
    id: "up",
    currentDirection: dir,
    opposite: "down",
    label: "U",
    axis: 'y',
    val: -1,
    move: function () {
      setY(this.val)
    }
  }
  const btnDown = {
    id: "down",
    currentDirection: dir,
    opposite: "up",
    label: "D",
    axis: 'y',
    val: 1,
    move: function () {
      setY(this.val)
    }
  }
  const btnLeft = {
    id: "left",
    currentDirection: dir,
    curX: x,
    curY: y,
    opposite: "right",
    label: "L",
    axis: 'x',
    val: -1,
    move: function () {
      setX(this.val)
    }
  }
  const btnRight = {
    id: "right",
    currentDirection: dir,
    curX: x,
    curY: y,
    opposite: "left",
    label: "R",
    axis: 'x',
    val: 1,
    move: function () {
      setX(this.val)
    }
  }

  const movementButtons = [btnUp, btnDown, btnLeft, btnRight]

  let perpetuate;

  const handleMovement = useCallback(
    (button) => {
      if (button.defaultPrevented) {
        // Do nothing if event already handled
        return;
      }

      setDir(button.id)

      // focus the [associated] button
      document.getElementById(`btn-${button.id}`).focus();

      // does not allow button to go directly in opposite direction (only Left and Right turns)
      if (button.opposite !== button.currentDirection) {

        // clears interval every time
        if (perpetuate) {
          clearInterval(perpetuate)
        }

        perpetuate = setInterval(() => {
          button.move()
        }, 30) // 30 seems to be best
      } else {
        // stay the course
        setDir(button.currentDirection)
      }
    }, [])

  // DO I NEED TO CHANGE THIS useCallBack to handleMovement instead????
  const keydownHandler = useCallback((event) => {
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
  }, [btnDown, btnLeft, btnRight, btnUp, handleMovement])

  // renders on initalization .. duh
  // so the eventListener gets added from the start and on every render
  // while also removing dublicates 
  useEffect(() => {
    // console.log("(" + x + "," + y + ")")
    // console.log(dir)

    // Arrows and WASD listener
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [x, y, keydownHandler]);

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