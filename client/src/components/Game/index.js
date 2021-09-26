import React, { useReducer, useEffect, useCallback } from "react"

import './style.css'

const xReducer = (x, direction) => {
  return x + direction
}
const yReducer = (y, direction) => {
  return y + direction
}

function Game() {

  const [x, setX] = useReducer(xReducer, 50)
  const [y, setY] = useReducer(yReducer, 50)

  // const btnUp = {
  //   id: "up",
  //   label: "U",
  //   axis: 'y',
  //   val: -1,
  //   move: function (init) {
  //     setY(this.val)
  //   }
  // }
  // const btnDown = {
  //   id: "down",
  //   label: "D",
  //   axis: 'y',
  //   val: 1,
  //   move: function (init) {
  //     setY(this.val)
  //   }

  // }
  // const btnLeft = {
  //   id: "left",
  //   label: "L",
  //   axis: 'x',
  //   val: -1,
  //   move: function (init) {
  //     setX(this.val)
  //   }
  // }
  // const btnRight = {
  //   id: "right",
  //   label: "R",
  //   axis: 'x',
  //   val: 1,
  //   move: function (init) {
  //     setX(this.val)
  //   }
  // }

  const btnUp = {
    id: "up",
    label: "U",
    axis: 'y',
    val: -1,
    move: function () {
      setY(this.val)
    }
  }
  const btnDown = {
    id: "down",
    label: "D",
    axis: 'y',
    val: 1,
    move: function (params) {
      setY(this.val)
    }
  }
  const btnLeft = {
    id: "left",
    label: "L",
    axis: 'x',
    val: -1,
    move: function (params) {
      setX(this.val)
    }
  }
  const btnRight = {
    id: "right",
    label: "R",
    axis: 'x',
    val: 1,
    move: function (params) {
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

      console.log("#1: " + perpetuate)

      if(perpetuate){
        console.log("CLEARING")
        clearInterval(perpetuate)
      }

      perpetuate = setInterval(()=>{
        button.move()
      }, 40)
      console.log("#2: " + perpetuate)
      

      document.getElementById(`btn-${button.id}`).focus();
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
  }, [btnDown, btnLeft, btnRight, btnUp, handleMovement]
  )

  // renders on initalization .. duh
  // so the eventListener gets added from the start and on every render
  // while also removing dublicates 
  useEffect(() => {
    // setState({x: state.x+1, y: state.y+1})
    console.log("(" + x + "," + y + ")")

    // Arrows and WASD listener
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [x, y, keydownHandler]
  );

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