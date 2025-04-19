import React, { useState, useRef, useEffect } from "react";
import "./SvgFace.css"; // Import new CSS
import SvgMouth, { EXPRESSION_ORDER } from "./SvgMouth"; // Import SVG Mouth

const BASE_POSITION_SVG = { x: 100, y: 65 }; // Base pupil center in SVG coords
const EYE_OFFSET_X = 35; // Horizontal distance from head center to eye center
const PUPIL_OFFSET_X = 35; // Horizontal distance from eye center to pupil center (relative to eye)
const HEAD_CENTER_X = 100;
const HEAD_CENTER_Y = 100;
const HEAD_RADIUS = 90;
const EYE_Y = 65; // cy for eyes
const EYE_RX = 25;
const EYE_RY = 15;
const PUPIL_RX = 10;
const PUPIL_RY = 8;
const EYELID_WIDTH = EYE_RX * 2; // 50
const EYELID_FULL_HEIGHT = EYE_RY * 2; // 30 (adjust as needed for coverage)

// Calculate Eye positions based on constants
const LEFT_EYE_CX = HEAD_CENTER_X - EYE_OFFSET_X; // 100 - 35 = 65
const RIGHT_EYE_CX = HEAD_CENTER_X + EYE_OFFSET_X; // 100 + 35 = 135

// Calculate Base Pupil positions
const BASE_PUPIL_LEFT_CX = LEFT_EYE_CX; // Centered initially
const BASE_PUPIL_RIGHT_CX = RIGHT_EYE_CX; // Centered initially
const BASE_PUPIL_Y = EYE_Y; // 65

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
  const moveXAmount = moveAmount + 2; // Adjusted sensitivity
  const moveYAmount = moveAmount - 2; // Adjusted sensitivity

  switch (direction) {
    case "right":
      // Ensure pupil doesn't go too far right (stay within eye approx)
      temporaryPosition.x = Math.min(
        BASE_POSITION.x + moveXAmount,
        BASE_POSITION.x + EYE_RX - PUPIL_RX,
      );
      break;
    case "left":
      // Ensure pupil doesn't go too far left
      temporaryPosition.x = Math.max(
        BASE_POSITION.x - moveXAmount,
        BASE_POSITION.x - EYE_RX + PUPIL_RX,
      );
      break;
    case "up":
      // Ensure pupil doesn't go too far up
      temporaryPosition.y = Math.max(
        BASE_POSITION.y - moveYAmount,
        BASE_POSITION.y - EYE_RY + PUPIL_RY,
      );
      break;
    case "down":
      // Ensure pupil doesn't go too far down
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
  }, 500); // Increased timeout slightly for smoother return feel
}

function _handleBlink({
  setIsBlinking,
  setIsBlinkingLeft,
  setIsBlinkingRight,
  left = false,
  right = false,
}) {
  // If already blinking, maybe ignore or reset timer? For now, allow re-trigger
  setIsBlinking(true);
  setIsBlinkingLeft(left);
  setIsBlinkingRight(right);

  setTimeout(() => {
    setIsBlinking(false);
    setIsBlinkingLeft(false);
    setIsBlinkingRight(false);
  }, 300); // Duration of the blink
}

export default function SvgFace() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBlinkingLeft, setIsBlinkingLeft] = useState(false);
  const [isBlinkingRight, setIsBlinkingRight] = useState(false);
  const [position, setPosition] = useState({
    x: BASE_PUPIL_LEFT_CX,
    y: BASE_PUPIL_Y,
  }); // Use SVG coords
  const [mouthExpression, setMouthExpression] = useState("neutral");
  const moveAmount = 10; // How much the pupil moves relatively
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
    // Pass the SVG base position for calculations
    _handleMoveEyesDirection({
      direction,
      setPosition,
      BASE_POSITION: { x: BASE_PUPIL_LEFT_CX, y: BASE_PUPIL_Y },
      moveAmount,
      timeoutRef,
    });
  }

  // Calculate eyelid properties based on state
  /*
  const getEyelidProps = (side, position) => {
    const isLeft = side === "left";
    const isTop = position === "top";
    const eyeCenterX = isLeft ? LEFT_EYE_CX : RIGHT_EYE_CX;
    const eyelidX = eyeCenterX - EYE_RX; // Start eyelid at the left edge of the eye ellipse

    const isThisEyelidBlinking =
      isBlinking && (isLeft ? isBlinkingLeft : isBlinkingRight);
    const closedHeight = EYE_RY; // Close halfway
    const openHeight = 0;

    const currentHeight = isThisEyelidBlinking ? closedHeight : openHeight;
    const yPos = isTop ? EYE_Y - EYE_RY : EYE_Y; // Top eyelid starts above eye, bottom starts at vertical center

    return {
      x: eyelidX,
      y: isTop ? EYE_Y - (isThisEyelidBlinking ? closedHeight : 0) : yPos, // Top lid animates y AND height
      width: EYELID_WIDTH,
      height: currentHeight,
      className: `svg-doctor-eyelid ${isThisEyelidBlinking ? "closed" : ""}`, // Add class for potential specific closed styles
    };
    };
  */
  const getEyelidProps = (side, position) => {
    const isLeft = side === "left";
    const isTop = position === "top";
    const eyeCenterX = isLeft ? LEFT_EYE_CX : RIGHT_EYE_CX;
    const eyelidX = eyeCenterX - EYE_RX; // Start eyelid at the left edge of the eye ellipse
    const eyelidWidth = EYELID_WIDTH; // Width remains constant

    const isThisEyelidBlinking =
      isBlinking && (isLeft ? isBlinkingLeft : isBlinkingRight);
    // Determine the target height when closed (e.g., half the eye's vertical radius)
    const closedHeight = EYE_RY + 2;
    const openHeight = 0;

    // Calculate the current height based on blinking state
    const currentHeight = isThisEyelidBlinking ? closedHeight : openHeight;

    let yPos;

    if (isTop) {
      // TOP Eyelid:
      // Y position is fixed at the top edge of the eye.
      // Height animates from 0 to closedHeight, growing downwards.
      yPos = EYE_Y - EYE_RY;
    } else {
      // BOTTOM Eyelid:
      // Y position needs to move upwards as height increases to simulate growing from the bottom.
      // The bottom edge is y + height. We want this edge to move from (EYE_Y + EYE_RY) up towards EYE_Y.
      // Let's fix the bottom edge calculation: y = desired_bottom_edge - current_height
      // Desired bottom edge when closed = EYE_Y + EYE_RY
      // So, y = (EYE_Y + EYE_RY) - currentHeight;
      yPos = EYE_Y + EYE_RY - currentHeight;
    }

    return {
      x: eyelidX,
      y: yPos,
      width: eyelidWidth,
      height: currentHeight,
      // Keep the className for the CSS transition
      className: `svg-doctor-eyelid ${isThisEyelidBlinking ? "closed" : ""}`,
    };
  };

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

          {/* Eyes (White part) */}
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

          {/* Pupils - Position controlled by state */}
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
          {/* Note: Right pupil cx is calculated relative to the left pupil's current state position */}

          {/* Mouth - Renders SVG based on expression */}
          <SvgMouth mouthExpression={mouthExpression} />

          {/* Eyelids - Rendered last to be on top */}
          {/* Left Eye Eyelids */}
          <rect {...getEyelidProps("left", "top")} fill="#f5d4a0" />
          <rect {...getEyelidProps("left", "bottom")} fill="#f5d4a0" />

          {/* Right Eye Eyelids */}
          <rect {...getEyelidProps("right", "top")} fill="#f5d4a0" />
          <rect {...getEyelidProps("right", "bottom")} fill="#f5d4a0" />
        </svg>
      </div>

      {/* Buttons - Structure remains the same, class names updated */}
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
