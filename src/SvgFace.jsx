import React, { useState, useRef } from "react";
import "./SvgFace.css";
import SvgMouth, { EXPRESSION_ORDER } from "./SvgMouth";

const EYE_OFFSET_X = 35;
const HEAD_CENTER_X = 100;
const HEAD_CENTER_Y = 100;
const HEAD_RADIUS = 90;
const EYE_Y = 65;
const EYE_RX = 25;
const EYE_RY = 15;
const PUPIL_RX = 10;
const PUPIL_RY = 8;
const EYELID_WIDTH = EYE_RX * 2;
const LEFT_EYE_CX = HEAD_CENTER_X - EYE_OFFSET_X;
const RIGHT_EYE_CX = HEAD_CENTER_X + EYE_OFFSET_X;
const BASE_PUPIL_LEFT_CX = LEFT_EYE_CX;
const BASE_PUPIL_Y = EYE_Y;

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
        BASE_POSITION.x + EYE_RX - PUPIL_RX,
      );
      break;
    case "left":
      temporaryPosition.x = Math.max(
        BASE_POSITION.x - moveXAmount,
        BASE_POSITION.x - EYE_RX + PUPIL_RX,
      );
      break;
    case "up":
      temporaryPosition.y = Math.max(
        BASE_POSITION.y - moveYAmount,
        BASE_POSITION.y - EYE_RY + PUPIL_RY,
      );
      break;
    case "down":
      temporaryPosition.y = Math.min(
        BASE_POSITION.y + moveYAmount,
        BASE_POSITION.y + EYE_RY - PUPIL_RY,
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

function EyeLid({
  isBlinking,
  isBlinkingLeft,
  isBlinkingRight,
  side,
  position,
}) {
  const getEyelidProps = (side, position) => {
    const isLeft = side === "left";
    const isTop = position === "top";
    const eyeCenterX = isLeft ? LEFT_EYE_CX : RIGHT_EYE_CX;
    const eyelidX = eyeCenterX - EYE_RX;
    const eyelidWidth = EYELID_WIDTH;

    const isThisEyelidBlinking =
      isBlinking && (isLeft ? isBlinkingLeft : isBlinkingRight);
    const closedHeight = EYE_RY + 2;
    const openHeight = 0;

    const currentHeight = isThisEyelidBlinking ? closedHeight : openHeight;

    let yPos;

    if (isTop) {
      yPos = EYE_Y - EYE_RY;
    } else {
      yPos = EYE_Y + EYE_RY - currentHeight;
    }

    return {
      x: eyelidX,
      y: yPos,
      width: eyelidWidth,
      height: currentHeight,
      className: `svg-doctor-eyelid ${isThisEyelidBlinking ? "closed" : ""}`,
    };
  };

  return <rect {...getEyelidProps(side, position)} fill="#f5d4a0" />;
}

export default function SvgFace() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBlinkingLeft, setIsBlinkingLeft] = useState(false);
  const [isBlinkingRight, setIsBlinkingRight] = useState(false);
  const [position, setPosition] = useState({
    x: BASE_PUPIL_LEFT_CX,
    y: BASE_PUPIL_Y,
  });

  const [mouthExpression, setMouthExpression] = useState("neutral");
  const moveAmount = 10;
  const timeoutRef = useRef(null);

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
      BASE_POSITION: { x: BASE_PUPIL_LEFT_CX, y: BASE_PUPIL_Y },
      moveAmount,
      timeoutRef,
    });
  }

  return (
    <div className="svg-doctor-container">
      <div className="svg-doctor-face">
        <svg
          viewBox="0 0 200 200"
          width="180"
          height="180"
          aria-labelledby="faceTitle faceDesc"
        >
          <title id="faceTitle">Animated SVG Face</title>
          <desc id="faceDesc">
            An animated face with moving eyes, blinking eyelids, and changing
            expressions.
          </desc>

          {/* Head */}
          <circle
            cx={HEAD_CENTER_X}
            cy={HEAD_CENTER_Y}
            r={HEAD_RADIUS}
            fill="#f5d4a0"
          />

          <ellipse
            cx={LEFT_EYE_CX}
            cy={EYE_Y}
            rx={EYE_RX}
            ry={EYE_RY}
            fill="rgb(247, 247, 247)"
          />
          <ellipse
            cx={RIGHT_EYE_CX}
            cy={EYE_Y}
            rx={EYE_RX}
            ry={EYE_RY}
            fill="rgb(247, 247, 247)"
          />

          <ellipse
            cx={position.x}
            cy={position.y}
            rx={PUPIL_RX}
            ry={PUPIL_RY}
            fill="black"
          />
          <ellipse
            cx={position.x + (RIGHT_EYE_CX - LEFT_EYE_CX)}
            cy={position.y}
            rx={PUPIL_RX}
            ry={PUPIL_RY}
            fill="black"
          />

          <SvgMouth mouthExpression={mouthExpression} />

          <EyeLid
            isBlinking={isBlinking}
            isBlinkingLeft={isBlinkingLeft}
            isBlinkingRight={isBlinkingRight}
            side={"left"}
            position={"top"}
          />
          <EyeLid
            isBlinking={isBlinking}
            isBlinkingLeft={isBlinkingLeft}
            isBlinkingRight={isBlinkingRight}
            side={"left"}
            position={"bottom"}
          />
          <EyeLid
            isBlinking={isBlinking}
            isBlinkingLeft={isBlinkingLeft}
            isBlinkingRight={isBlinkingRight}
            side={"right"}
            position={"top"}
          />
          <EyeLid
            isBlinking={isBlinking}
            isBlinkingLeft={isBlinkingLeft}
            isBlinkingRight={isBlinkingRight}
            side={"right"}
            position={"bottom"}
          />
        </svg>
      </div>

      <div className="svg-doctor-buttons">
        <button onClick={handleButtonClick} className="svg-doctor-button">
          Change Expression
        </button>
        <button
          className="svg-doctor-button"
          onClick={() => handleMoveEyesDirection("left")}
        >
          Move Left
        </button>
        <button
          className="svg-doctor-button"
          onClick={() => handleMoveEyesDirection("right")}
        >
          Move Right
        </button>
        <button
          className="svg-doctor-button"
          onClick={() => handleMoveEyesDirection("up")}
        >
          Move Up
        </button>
        <button
          className="svg-doctor-button"
          onClick={() => handleMoveEyesDirection("down")}
        >
          Move Down
        </button>
        <button className="svg-doctor-button" onClick={handleBlinkBoth}>
          Blink
        </button>
        <button className="svg-doctor-button" onClick={handleBlinkLeft}>
          Blink Left
        </button>
        <button className="svg-doctor-button" onClick={handleBlinkRight}>
          Blink Right
        </button>
      </div>
    </div>
  );
}
