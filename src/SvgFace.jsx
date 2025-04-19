import React, { useState, useRef } from "react";
import "./SvgFace.css";
import SvgMouth from "./SvgMouth";
import EyeLid from "./EyeLid";
import EyeBrow from "./EyeBrow";
import Animations from "./Animations";
import * as Const from "./constants";

export default function SvgFace() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBlinkingLeft, setIsBlinkingLeft] = useState(false);
  const [isBlinkingRight, setIsBlinkingRight] = useState(false);
  const [position, setPosition] = useState({
    x: Const.BASE_PUPIL_LEFT_CX,
    y: Const.BASE_PUPIL_Y,
  });
  const [mouthExpression, setMouthExpression] = useState("neutral");
  const moveAmount = 10;
  const timeoutRef = useRef(null);
  const [leftEyebrowY, setLeftEyebrowY] = useState(Const.BASE_EYEBROW_Y);
  const [rightEyebrowY, setRightEyebrowY] = useState(Const.BASE_EYEBROW_Y);
  const [talking, setTalking] = useState(false);
  const eyebrowMoveAmount = -5;

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

          <circle
            cx={Const.HEAD_CENTER_X}
            cy={Const.HEAD_CENTER_Y}
            r={Const.HEAD_RADIUS}
            fill="#f5d4a0"
          />

          <ellipse
            cx={Const.LEFT_EYE_CX}
            cy={Const.EYE_Y}
            rx={Const.EYE_RX}
            ry={Const.EYE_RY}
            fill="rgb(247, 247, 247)"
          />
          <ellipse
            cx={Const.RIGHT_EYE_CX}
            cy={Const.EYE_Y}
            rx={Const.EYE_RX}
            ry={Const.EYE_RY}
            fill="rgb(247, 247, 247)"
          />

          <ellipse
            cx={position.x}
            cy={position.y}
            rx={Const.PUPIL_RX}
            ry={Const.PUPIL_RY}
            fill="black"
          />
          <ellipse
            cx={position.x + (Const.RIGHT_EYE_CX - Const.LEFT_EYE_CX)}
            cy={position.y}
            rx={Const.PUPIL_RX}
            ry={Const.PUPIL_RY}
            fill="black"
          />

          <EyeBrow x={Const.LEFT_EYE_CX} y={leftEyebrowY} />
          <EyeBrow x={Const.RIGHT_EYE_CX} y={rightEyebrowY} />
          <SvgMouth
            mouthExpression={mouthExpression}
            setTalking={setTalking}
            talking={talking}
          />

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

      <Animations
        mouthExpression={mouthExpression}
        setMouthExpression={setMouthExpression}
        setIsBlinking={setIsBlinking}
        setIsBlinkingLeft={setIsBlinkingLeft}
        setIsBlinkingRight={setIsBlinkingRight}
        setPosition={setPosition}
        moveAmount={moveAmount}
        timeoutRef={timeoutRef}
        setLeftEyebrowY={setLeftEyebrowY}
        setRightEyebrowY={setRightEyebrowY}
        eyebrowMoveAmount={eyebrowMoveAmount}
        setTalking={setTalking}
      />
    </div>
  );
}
