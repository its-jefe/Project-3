import React, { useEffect } from "react"
import ReactDOM from "react-dom"

import './style.css'

const Game = () => {

  // function keyPress(key)
  // document.getElementById("myBtn").click();

  const head = <div id="head"></div>

  const arrowUp = <button id="btn-up">U</button>
  const arrowDown = <button id="btn-down">D</button>
  const arrowLeft = <button id="btn-left">L</button>
  const arrowRight = <button id="btn-right">R</button>

  const btnAlpha = <button id="btn-A">A</button>
  const btnBeta = <button id="btn-B">B</button>

  return (
    <div id="eisle">
      <div id="arrows-container">
        {arrowUp}
        {arrowDown}
        {arrowLeft}
        {arrowRight}
      </div>
      <div id="canvas">{head}</div>
      <div id="buttons-container">
        {btnAlpha}
        {btnBeta}
      </div>
    </div>
  )
}

export default Game;