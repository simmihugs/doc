import { useState, useRef } from "react";
import "./App.css";
import "./Doc.css";

const eyeLeft = { x: 30 + 25, y: 30 + 15 };
const eyeRight = { x: 180 - 30 - 25, y: 30 + 15 };
const pupilRadius = 8;
const directions = {
  left: Math.PI,
  right: 0,
  up: -Math.PI / 2,
  down: Math.PI / 2,
};

function getPupilStyle(center, angle) {
  return {
    left: center.x + pupilRadius * Math.cos(angle) - 10,
    top: center.y + pupilRadius * Math.sin(angle) - 7.5,
    position: "absolute",
  };
}

function getDirectionStyle(center, direction) {
  if (!directions.hasOwnProperty(direction)) return {};

  return {
    left: center.x + pupilRadius * Math.cos(directions[direction]) - 10,
    top: center.y + pupilRadius * Math.sin(directions[direction]) - 7.5,
  };
}

function _handleMoveEyesDirection({
  direction,
  setPosition,
  BASE_POSITION,
  moveAmount,
  timeoutRef,
}) {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  let temporaryPosition = { ...BASE_POSITION };

  switch (direction) {
    case "right":
      temporaryPosition.x += moveAmount + 5;
      break;
    case "left":
      temporaryPosition.x -= moveAmount + 2;
      break;
    case "up":
      temporaryPosition.y -= moveAmount - 2;
      break;
    case "down":
      temporaryPosition.y += moveAmount - 5;
      break;
    default:
      console.warn("Unknown direction:", direction);
      return;
  }

  setPosition(temporaryPosition);

  timeoutRef.current = setTimeout(() => {
    setPosition(BASE_POSITION);
    timeoutRef.current = null;
  }, 300);
}

function _handleBlink({
  setIsBlinking,
  setIsBlinkingLeft,
  setIsBlinkingRight,
  left = false,
  right = false,
}) {
  setIsBlinking(true);
  setIsBlinkingLeft(left);
  setIsBlinkingRight(right);
  setTimeout(() => {
    setIsBlinking(false);
    setIsBlinkingLeft(false);
    setIsBlinkingRight(false);
  }, 300);
}

export default function App() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBlinkingLeft, setIsBlinkingLeft] = useState(false);
  const [isBlinkingRight, setIsBlinkingRight] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [pupilAngle, setPupilAngle] = useState(0);
  const [pupilDirection, setPupilDirection] = useState("center");
  const BASE_POSITION = { x: 45, y: 38 };
  const [position, setPosition] = useState(BASE_POSITION);
  const moveAmount = 10;
  const timeoutRef = useRef(null);

  function handleBlink({ left = false, right = false }) {
    _handleBlink({
      setIsBlinking,
      setIsBlinkingLeft,
      setIsBlinkingRight,
      left,
      right,
    });
  }

  function handleBlinkLeft() {
    handleBlink({ left: true });
  }

  function handleBlinkBoth() {
    handleBlink({ left: true, right: true });
  }

  function handleBlinkRight() {
    handleBlink({ right: true });
  }

  function handleMoveEyesDirection(direction) {
    _handleMoveEyesDirection({
      direction,
      setPosition,
      BASE_POSITION,
      moveAmount,
      timeoutRef,
    });
  }

  return (
    <div className="doctor-container">
      <div className="doctor-head">
        <div
          className={`doctor-eyelid left top ${
            isBlinkingLeft && isBlinking ? "closed" : ""
          }`}
        ></div>
        <div
          className={`doctor-eyelid left bottom ${
            isBlinkingLeft && isBlinking ? "closed" : ""
          }`}
        ></div>
        <div
          className={`doctor-eyelid right top ${
            isBlinkingRight && isBlinking ? "closed" : ""
          }`}
        ></div>
        <div
          className={`doctor-eyelid right bottom ${
            isBlinkingRight && isBlinking ? "closed" : ""
          }`}
        ></div>

        <div className="doctor-eye left"></div>
        <div className="doctor-eye right"></div>

        <div
          className="doctor-eye-pupil"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />
        <div
          className="doctor-eye-pupil"
          style={{
            left: `${position.x + 70}px`,
            top: `${position.y}px`,
          }}
        />

        <div className="doctor-mouth"></div>
      </div>
      <div className="doctor-buttons">
        <button
          className="doctor-blink"
          onClick={() => handleMoveEyesDirection("left")}
        >
          Move Left
        </button>
        <button
          className="doctor-blink"
          onClick={() => handleMoveEyesDirection("right")}
        >
          Move Right
        </button>
        <button
          className="doctor-blink"
          onClick={() => handleMoveEyesDirection("up")}
        >
          Move Up
        </button>
        <button
          className="doctor-blink"
          onClick={() => handleMoveEyesDirection("down")}
        >
          Move Down
        </button>

        <button className="doctor-blink" onClick={handleBlinkBoth}>
          Blink
        </button>
        <button className="doctor-blink" onClick={handleBlinkLeft}>
          Blink left
        </button>
        <button className="doctor-blink" onClick={handleBlinkRight}>
          Blink right
        </button>
      </div>
    </div>
  );
}
