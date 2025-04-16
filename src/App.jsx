import { useState } from "react";
import "./App.css";
import "./Doc.css";

const eyeLeft = { x: 30 + 25, y: 30 + 15 };
const eyeRight = { x: 180 - 30 - 25, y: 30 + 15 };
const pupilRadius = 8;
const directions = {
  left: Math.PI,       // 180°
  right: 0,            // 0°
  up: -Math.PI/2,      // 270°
  down: Math.PI/2      // 90°
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
    top: center.y + pupilRadius * Math.sin(directions[direction]) - 7.5
  };
}

export default function App() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBlinkingLeft, setIsBlinkingLeft] = useState(false);
  const [isBlinkingRight, setIsBlinkingRight] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [pupilAngle, setPupilAngle] = useState(0);
  const [pupilDirection, setPupilDirection] = useState("center");

  function handleLook(direction) {
    setPupilDirection(direction);
    setTimeout(() => setPupilDirection("center"), 500);
  }
  
  function handleBlink({ left = false, right = false }) {
    setIsBlinking(true);
    setIsBlinkingLeft(left);
    setIsBlinkingRight(right);
    setTimeout(() => {
      setIsBlinking(false);
      setIsBlinkingLeft(false);
      setIsBlinkingRight(false);
    }, 300);
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

  function handleRollEyes() {
    setIsRolling(true);
    const duration = 500;
    const start = performance.now();
    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setPupilAngle(progress * 2 * Math.PI);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsRolling(false);
        setPupilAngle(0);
      }
    }
    requestAnimationFrame(animate);
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
          className="doctor-eye-pupil left"
          style={
            isRolling 
              ? getPupilStyle(eyeLeft, pupilAngle)
              : getDirectionStyle(eyeLeft, pupilDirection)
          }
        />
        <div
          className="doctor-eye-pupil right"
          style={
            isRolling 
              ? getPupilStyle(eyeRight, pupilAngle)
              : getDirectionStyle(eyeRight, pupilDirection)
          }
        />

        <div className="doctor-mouth"></div>
      </div>
      <div className="doctor-buttons">
        <button className="doctor-blink" onClick={handleBlinkBoth}>
          Blink
        </button>
        <button className="doctor-blink" onClick={handleBlinkLeft}>
          Blink left
        </button>
        <button className="doctor-blink" onClick={handleBlinkRight}>
          Blink right
        </button>
        <button className="doctor-blink" onClick={handleRollEyes}>Roll</button>
        <button className="doctor-blink" onClick={() => handleLook('left')}>Look Left</button>
        <button className="doctor-blink" onClick={() => handleLook('right')}>Look Right</button>
        <button className="doctor-blink" onClick={() => handleLook('up')}>Look Up</button>
        <button className="doctor-blink" onClick={() => handleLook('down')}>Look Down</button>
      </div>
    </div>
  );
}

