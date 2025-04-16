import { useState } from "react";
import "./App.css";
import "./Doc.css";

const eyeLeft = { x: 30 + 25, y: 30 + 15 };
const eyeRight = { x: 180 - 30 - 25, y: 30 + 15 };

const pupilRadius = 8;

function getPupilStyle(center, angle) {
  return {
    left: center.x + pupilRadius * Math.cos(angle) - 10,
    top: center.y + pupilRadius * Math.sin(angle) - 7.5,
    position: "absolute",
  };
}


export default function App() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBlinkingLeft, setIsBlinkingLeft] = useState(false);
  const [isBlinkingRight, setIsBlinkingRight] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [pupilAngle, setPupilAngle] = useState(0);


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
          style={isRolling ? getPupilStyle(eyeLeft, pupilAngle) : { left: 45, top: 40, position: "absolute" }}
        />
        <div
          className="doctor-eye-pupil right"
          style={isRolling ? getPupilStyle(eyeRight, pupilAngle) : { right: 45, top: 40, position: "absolute" }}
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
      </div>
    </div>
  );
}

