import { useState } from "react";
import "./App.css";
import "./Doc.css";

export default function App() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBlinkingLeft, setIsBlinkingLeft] = useState(false);
  const [isBlinkingRight, setIsBlinkingRight] = useState(false);

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
        <div className="doctor-eye-pupil left"></div>
        <div className="doctor-eye-pupil right"></div>
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
        <button className="doctor-blink">Roll</button>
      </div>
    </div>
  );
}
