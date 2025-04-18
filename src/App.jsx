import { useState, useRef } from "react";
import "./App.css";
import "./Doc.css";

const MOUTH_PATHS = {
  frown: "M 30 70 Q 50 40 70 70",
  neutral: "M 30 60 L 70 60",
  smile: "M 30 60 Q 50 90 70 60"
};
const EXPRESSION_ORDER = ['frown', 'neutral', 'smile'];

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
  const BASE_POSITION = { x: 45, y: 38 };
  const [position, setPosition] = useState(BASE_POSITION);
  const moveAmount = 10;
  const timeoutRef = useRef(null);
  const [mouthExpression, setMouthExpression] = useState('neutral');

  const handleButtonClick = () => {
    const currentIndex = EXPRESSION_ORDER.indexOf(mouthExpression);
    console.log("currentIndex: ", currentIndex);
    const nextIndex = (currentIndex + 1) % EXPRESSION_ORDER.length;
    console.log("nextIndex: ", nextIndex);
    setMouthExpression(EXPRESSION_ORDER[nextIndex]);
  };


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
          className={`doctor-eyelid left top ${isBlinkingLeft && isBlinking ? "closed" : ""
            }`}
        ></div>
        <div
          className={`doctor-eyelid left bottom ${isBlinkingLeft && isBlinking ? "closed" : ""
            }`}
        ></div>
        <div
          className={`doctor-eyelid right top ${isBlinkingRight && isBlinking ? "closed" : ""
            }`}
        ></div>
        <div
          className={`doctor-eyelid right bottom ${isBlinkingRight && isBlinking ? "closed" : ""
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

        <svg className="w-24 h-24 absolute bottom-4" viewBox="0 0 100 100">
          <path
            d={MOUTH_PATHS[mouthExpression]}
            stroke="black"
            strokeWidth="5"
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>

      </div>
      <div className="doctor-buttons">
        <button
          onClick={handleButtonClick}
          className="doctor-blink"
        >
          Change Expression
        </button>
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
