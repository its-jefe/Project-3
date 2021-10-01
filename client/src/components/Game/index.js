import React, { useReducer, useEffect, useCallback } from "react"

import './style.css'

// consider making a movement queue of some kind 
// could help with the grid 
// would help with the tail 

// consider using an SVG or something that can be split
// consider using 4 divs that come together to create the ball
// really it doesn't look that bad tho so maybe forget ab it

const startTime = 60;

const startReducer = (start, val) => {
  start = val
  return start
}

const headReducer = ({ x, y, direction, init }, { axis, change }) => {
  // x boundaries
  if (x === 100 && change === 1) return { x: 0, y: y, direction: { axis: axis, change: change } }
  if (x === 0 && change === -1) return { x: 100, y: y, direction: { axis: axis, change: change } }
  // y boundaries
  if (y === 100 && change === 1) return { x: x, y: 0, direction: { axis: axis, change: change } }
  if (y === 0 && change === -1) return { x: x, y: 100, direction: { axis: axis, change: change } }

  // if you want to change coordinates... 
  // the current axis must be divisible by size of head (5)
  // if its not have this fuction recur (call itself passing coord values until true)

  // COMPARE THESE AGAINST EACH OTHER 
  // console.log(direction.axis, direction.change) // current head direction
  // console.log(axis, change) // button direction -> direction in which user would like to go...

  // if changing axis... 
  // aka 
  // if button axis is different then the current (direction.axis)
  // do not allow change axis unless (direction.axis % 5 === 0)
  //   if (direction.axis === "y") {

  // continue moving in current direction (change along axis)
  if (axis === "x") {
    return { x: x + change, y: y, direction: { axis: axis, change: change } }
  }
  if (axis === "y") {
    return { x: x, y: y + change, direction: { axis: axis, change: change } }
  }
}

const foodReducer = () => {
  //return new food.coords properties
  return {
    x: Math.floor(Math.random() * 97 + 2),
    y: Math.floor(Math.random() * 97 + 2)
  };
};

const scoreReducer = (score, newScore) => {
  return score + newScore
}

const timeReducer = (time, timer) => {
  if(time !== 0){
    return time - 1
  }else{
    clearInterval(timer)
    console.log(timer) // curious if this value is anything I can use
    console.log("GAME OVER!")
  }
}

const tailReducer = ({ x, y }, head) => { // fires twice in development ... but not in production 

  // tail needs to chase head around

  // each tail element needs to store the proceeded elements 5 movements 

  // THIS IS MOOT BECAUSE I NEED TO MAKE THIS A GRID

  // so destructure head

  // console.log(head.x)
  // console.log(head.y)
  // console.log(head.direction)

  // console.log(x, y)

  /* Updating tail
  > For size of head .. move in current direction 
  */
  return { x: head.x - 5, y: head.y - 5 }
};

function Game() {

  // INITIATE

  /*⬇️ Reducers ⬇️*/
  const [start, setStart] = useReducer(startReducer, false)
  const [head, setHead] = useReducer(headReducer, { x: 50, y: 50, direction: { axis: null, change: null }, init: false })
  const [food, setFood] = useReducer(foodReducer, { x: Math.floor(Math.random() * 97 + 2), y: Math.floor(Math.random() * 97 + 2) })
  const [tail, setTail] = useReducer(tailReducer, [])
  const [score, setScore] = useReducer(scoreReducer, 0)
  const [time, setTime] = useReducer(timeReducer, startTime)
  /*⬆️ Reducers ⬆️*/

  /*⬇️ Buttons ⬇️*/
  const btnUp = {
    id: "up",
    opposite: "down",
    label: "U",
    axis: 'y',
    val: -1,
  }
  const btnDown = {
    id: "down",
    opposite: "up",
    label: "D",
    axis: 'y',
    val: 1,
  }
  const btnLeft = {
    id: "left",
    opposite: "right",
    label: "L",
    axis: 'x',
    val: -1,
  }
  const btnRight = {
    id: "right",
    opposite: "left",
    label: "R",
    axis: 'x',
    val: 1,
  }
  const movementButtons = [btnUp, btnDown, btnLeft, btnRight]

  const btnA = {
    id: "Forward",
    label: "A",
    val: 1,
  }
  const btnB = {
    id: "Backward",
    label: "B",
    val: -1,
  }
  /*⬆️ Buttons ⬆️*/

  let firstMove;

  // on each activation of arrow button (key, click, or touch)
  const handleMovement = useCallback(
    (button, head, start) => {
      if (button.defaultPrevented) {
        // Do nothing if event already handled
        return;
      }

      if (start == false) {
        setStart(true)

        // begin timer
        let timer = setInterval(() => {
          setTime(timer, setStart())
        }, 1000)
      }

      // focus the [associated] button
      document.getElementById(`btn-${button.id}`).focus();
      // if the current axis (at time of keypress) is not the same as direction trying to go

      // does not fire movement interval unless head is changing axis (allows only left n right turns)
      if (head.direction.axis !== button.axis) {
        if (firstMove) {
          clearInterval(firstMove)
        }
        firstMove = setInterval(() => {
          setHead({ axis: button.axis, change: button.val })
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
        handleMovement(btnUp, head, start);
        break;
      case "ArrowDown":
      case "KeyS":
        handleMovement(btnDown, head, start);
        break;
      case "ArrowLeft":
      case "KeyA":
        handleMovement(btnLeft, head, start);
        break;
      case "ArrowRight":
      case "KeyD":
        handleMovement(btnRight, head, start);
        break;
      case "Enter":
        handleMovement(btnA, head, start);
        break;
      case "KeyB":
        handleMovement(btnB, head, start);
        break;
      default: console.log('Defaulted');
    };
  }

  // on axis change
  useEffect(() => {
    // Arrows and WASD listener
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [start, head.direction.axis]); // I ONLY WANT THIS TO RUN ON AXIS CHANGE BUT REACT IS COMPAINING ABOUT DEPS ..? Psh

  useEffect(() => {
    if ((head.x) === (food.x) && (food.y) === (head.y)) {
      // reset food
      setFood()

      // add to score 
      setScore(10)

      // add to tail
      // setTail()
    }
  }, [head, food])

  useEffect(() => {

  }, [time])

  return (
    <>
      <button id="back-btn">Back</button>

      <div id="eisle">
        <div id="tinytron">
          <div id="score">Score <span>{score}</span></div>
          <div id="time">Time <span>{time}</span></div>
        </div>
        <div id="viewport-container">
          <div id="viewport">
            <div id="head" style={{ left: head.x + "%", top: head.y + "%" }}></div>
            <div id="food" style={{ left: food.x + "%", top: food.y + "%" }}></div>
            {/* <div id="tail" style={{ left: tail.x + "%", top: tail.y + "%" }}></div> */}
          </div>
        </div>
        <div id="buttons-container-container">
          <div id="arrows-container">
            {
              movementButtons.map(button => (
                <button key={button.id} id={`btn-${button.id}`}
                  onClick={handleMovement.bind(this, (button), head)}
                  onTouchStart={handleMovement.bind(this, (button), head)}
                >{button.label}</button>
              ))
            }
          </div>
          <div id="buttons-container">
            <button id="btn-A">A</button>
            <button id="btn-B">B</button>
          </div>
        </div>
      </div>
  </>
  )
}

export default Game;