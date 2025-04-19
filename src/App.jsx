import React, { useState, useRef } from "react";
import "./SvgFace.css";
import SvgFace from "./SvgFace";
import Animations from "./Animations";
import * as Const from "./constants";

export default function App() {
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
      <SvgFace
        isBlinking={isBlinking}
        setIsBlinking={setIsBlinking}
        isBlinkingLeft={isBlinkingLeft}
        setIsBlinkingLeft={setIsBlinkingLeft}
        isBlinkingRight={isBlinkingRight}
        setIsBlinkingRight={setIsBlinkingRight}
        position={position}
        setPosition={setPosition}
        mouthExpression={mouthExpression}
        setMouthExpression={setMouthExpression}
        moveAmount={moveAmount}
        timeoutRef={timeoutRef}
        leftEyebrowY={leftEyebrowY}
        setLeftEyebrowY={setLeftEyebrowY}
        rightEyebrowY={rightEyebrowY}
        setRightEyebrowY={setRightEyebrowY}
        talking={talking}
        setTalking={setTalking}
        eyebrowMoveAmount={eyebrowMoveAmount}
      />
      <SvgFace
        isBlinking={isBlinking}
        setIsBlinking={setIsBlinking}
        isBlinkingLeft={isBlinkingLeft}
        setIsBlinkingLeft={setIsBlinkingLeft}
        isBlinkingRight={isBlinkingRight}
        setIsBlinkingRight={setIsBlinkingRight}
        position={position}
        setPosition={setPosition}
        mouthExpression={mouthExpression}
        setMouthExpression={setMouthExpression}
        moveAmount={moveAmount}
        timeoutRef={timeoutRef}
        leftEyebrowY={leftEyebrowY}
        setLeftEyebrowY={setLeftEyebrowY}
        rightEyebrowY={rightEyebrowY}
        setRightEyebrowY={setRightEyebrowY}
        talking={talking}
        setTalking={setTalking}
        eyebrowMoveAmount={eyebrowMoveAmount}
      />
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
