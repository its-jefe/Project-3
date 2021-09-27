import React, { useReducer, useEffect, useCallback } from "react"

import './style.css'

// consider making a movement queue of some kind 
// could help with the grid 
// would help with the tail 

// consider making a state object for head that includes head_el

// consider using an SVG or something that can be split
// consider using 4 divs that come together to create the ball
// really it doesn't look that bad tho so maybe forget ab it

const coordReducer = ({ x, y }, { axis, delta }) => {

  if (axis === "x") {
    if (x === 100 && delta === 1) {
      return { x: 0, y: y }
    }
    if (x === 0 && delta === -1) {
      return { x: 100, y: y }
    }
    return { x: x + delta, y: y }
  }

  if (axis === "y") {
    if (y === 100 && delta === 1) {
      return { x: x, y: 0 }
    }
    if (y === 0 && delta === -1) {
      return { x: x, y: 100 }
    }
    return { x: x, y: y + delta }
  }
}

// which axis the head is moving on ...
const axisReducer = (axis, updateAxis) => {
  axis = updateAxis
  return axis
}

const tailReducer = (tail, el_params) => {

  // destructure stuff here
  console.log("A")

  const tail_el = <div id="tail" data-tail={tail.length}></div>

  /* Updating tail
  
  > For size of head .. move in current direction 

  */

  tail.push(tail_el)

  // add child divs to the head div
  document.getElementById("head").append(tail_el)
  
  return tail
}

const foodReducer = (food) => {

  return { //return new food.coords properties
    x: Math.floor(Math.random() * 95 + 3),
    y: Math.floor(Math.random() * 95 + 3)
  }
}

// gobbled is an array of tails


function Game() {

  const [head, setHead] = useReducer(coordReducer, { x: 50, y: 50 })
  const [axis, setAxis] = useReducer(axisReducer, null)

  // places food div randomly within the viewport
  const [food, setFood] = useReducer(foodReducer, { x: Math.floor(Math.random() * 90 + 5), y: Math.floor(Math.random() * 90 + 5) })
  const [tail, setTail] = useReducer(tailReducer, [])

  let head_el = <div id="head" style={{ left: head.x + "%", top: head.y + "%" }}></div>

  const btnUp = {
    id: "up",
    opposite: "down",
    currentCoords: head,
    label: "U",
    axis: 'y',
    currentAxis: axis,
    val: -1,
    move: function () {
      setHead({ axis: this.axis, delta: this.val })
    }
  }
  const btnDown = {
    id: "down",
    opposite: "up",
    currentCoords: head,
    label: "D",
    axis: 'y',
    currentAxis: axis,
    val: 1,
    move: function () {
      setHead({ axis: this.axis, delta: this.val })
    }
  }
  const btnLeft = {
    id: "left",
    opposite: "right",
    currentCoords: head,
    label: "L",
    axis: 'x',
    currentAxis: axis,
    val: -1,
    move: function () {
      setHead({ axis: this.axis, delta: this.val })
    }
  }
  const btnRight = {
    id: "right",
    opposite: "left",
    currentCoords: head,
    label: "R",
    axis: 'x',
    currentAxis: axis,
    val: 1,
    move: function () {
      setHead({ axis: this.axis, delta: this.val })
    }
  }

  const movementButtons = [btnUp, btnDown, btnLeft, btnRight]

  let init;

  const handleMovement = useCallback(
    (button) => {
      if (button.defaultPrevented) {
        // Do nothing if event already handled
        return;
      }

      setAxis(button.axis)

      // focus the [associated] button
      document.getElementById(`btn-${button.id}`).focus();

      // if the current axis (at time of keypress) is not the same as direction trying to go
      if (button.currentAxis !== button.axis) {
        if (init) {
          clearInterval(init)
        }
        init = setInterval(() => {
          button.move()
        }, 30)
      }
    }, [])

  const keydownHandler = (event) => {
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
  }

  // listen for axis change and base keyListener updates on that 
  useEffect(() => {
    console.log("current: " + axis) 
    // Arrows and WASD listener
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [axis, keydownHandler]);

  useEffect(() => {
    // Why is the y-axis off exactly by 5?
    if ((head.x) === (food.x) && (food.y) === (head.y - 5)) {
      // reset food
      setFood()
      // add to tail
      setTail()
    }
    // console.log(head)
  }, [head, food])

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
        {head_el}
        <div id="food" style={{ left: food.x + "%", top: food.y + "%" }}></div>
      </div>
      <div id="buttons-container">
        <button id="btn-A">A</button>
        <button id="btn-B">B</button>
      </div>
    </div>
  )
}

export default Game;