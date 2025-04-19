import { useCallback, useRef } from "react";
import { EXPRESSION_ORDER } from "./character/head/Mouth";
import * as Const from "./constants";

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
  const moveXAmount = moveAmount + 2;
  const moveYAmount = moveAmount - 2;

  switch (direction) {
    case "right":
      temporaryPosition.x = Math.min(
        BASE_POSITION.x + moveXAmount,
        BASE_POSITION.x + Const.EYE_RX - Const.PUPIL_RX,
      );
      break;
    case "left":
      temporaryPosition.x = Math.max(
        BASE_POSITION.x - moveXAmount,
        BASE_POSITION.x - Const.EYE_RX + Const.PUPIL_RX,
      );
      break;
    case "up":
      temporaryPosition.y = Math.max(
        BASE_POSITION.y - moveYAmount,
        BASE_POSITION.y - Const.EYE_RY + Const.PUPIL_RY,
      );
      break;
    case "down":
      temporaryPosition.y = Math.min(
        BASE_POSITION.y + moveYAmount,
        BASE_POSITION.y + Const.EYE_RY - Const.PUPIL_RY,
      );
      break;
    default:
      console.warn("Unknown direction:", direction);
      return;
  }

  setPosition(temporaryPosition);

  timeoutRef.current = setTimeout(() => {
    setPosition(BASE_POSITION);
    timeoutRef.current = null;
  }, 500);
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

export default function Animations({
  mouthExpression,
  setMouthExpression,
  setIsBlinking,
  setIsBlinkingLeft,
  setIsBlinkingRight,
  setPosition,
  moveAmount,
  timeoutRef,
  setLeftEyebrowY,
  setRightEyebrowY,
  eyebrowMoveAmount,
  setTalking,
}) {
  const speechAnimationRef = useRef(null);
  function handleButtonClick() {
    const currentIndex = EXPRESSION_ORDER.indexOf(mouthExpression);
    const nextIndex = (currentIndex + 1) % EXPRESSION_ORDER.length;
    setMouthExpression(EXPRESSION_ORDER[nextIndex]);
  }
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
      BASE_POSITION: {
        x: Const.BASE_PUPIL_LEFT_CX,
        y: Const.BASE_PUPIL_Y,
      },
      moveAmount,
      timeoutRef,
    });
  }
  function handleRaiseLeftEyebrow() {
    setLeftEyebrowY((prevY) => prevY + eyebrowMoveAmount);
    setTimeout(() => setLeftEyebrowY(Const.BASE_EYEBROW_Y), 300);
  }
  function handleRaiseRightEyebrow() {
    setRightEyebrowY((prevY) => prevY + eyebrowMoveAmount);
    setTimeout(() => setRightEyebrowY(Const.BASE_EYEBROW_Y), 300);
  }
  function handleRaiseBothEyebrows() {
    setLeftEyebrowY((prevY) => prevY + eyebrowMoveAmount);
    setRightEyebrowY((prevY) => prevY + eyebrowMoveAmount);
    setTimeout(() => {
      setLeftEyebrowY(Const.BASE_EYEBROW_Y);
      setRightEyebrowY(Const.BASE_EYEBROW_Y);
    }, 300);
  }
  function talk() {
    setTalking(true);
  }

  return (
    <div className="svg-doctor-buttons">
      <button
        className="svg-doctor-button color1"
        onClick={() => handleMoveEyesDirection("left")}
      >
        Look left
      </button>

      <button
        className="svg-doctor-button color1"
        onClick={() => handleMoveEyesDirection("right")}
      >
        Look Right
      </button>

      <button
        className="svg-doctor-button color1"
        onClick={() => handleMoveEyesDirection("up")}
      >
        Look Up
      </button>

      <button
        className="svg-doctor-button color1"
        onClick={() => handleMoveEyesDirection("down")}
      >
        Look Down
      </button>

      <button className="svg-doctor-button color2" onClick={handleBlinkBoth}>
        Blink
      </button>

      <button className="svg-doctor-button color2" onClick={handleBlinkLeft}>
        Wink Left
      </button>

      <button className="svg-doctor-button color2" onClick={handleBlinkRight}>
        Wink Right
      </button>

      <button
        className="svg-doctor-button color3"
        onClick={handleRaiseLeftEyebrow}
      >
        Raise Left Brow
      </button>

      <button
        className="svg-doctor-button color3"
        onClick={handleRaiseRightEyebrow}
      >
        Raise Right Brow
      </button>

      <button
        className="svg-doctor-button color3"
        onClick={handleRaiseBothEyebrows}
      >
        Raise Both Brows
      </button>

      <button onClick={talk} className="svg-doctor-button color4">
        Talk
      </button>
    </div>
  );
}
