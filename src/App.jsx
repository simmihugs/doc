import React, { useState, useRef } from "react";
import "./style/SvgFace.css";
import SvgFace from "./character/head/Face";
import Animations from "./Animations";
import * as Const from "./constants";
import Shirt from "./character/body/Shirt";

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
  const [headTiltAngle, setHeadTiltAngle] = useState(0);
  const [shoulderLift, setShoulderLift] = useState(0);
  const [isIdle, setIsIdle] = useState(false);

  const eyebrowMoveAmount = -5;
  const sizes = [25, 30, 35, 40, 50, 60, 70, 80, 100];

  return (
    <div className="svg-doctor-container">
      <div className="faces-container">
        {sizes.map((size, index) => (
          <div key={index}>
            <SvgFace
              isBlinking={isBlinking}
              isBlinkingLeft={isBlinkingLeft}
              isBlinkingRight={isBlinkingRight}
              position={position}
              mouthExpression={mouthExpression}
              leftEyebrowY={leftEyebrowY}
              rightEyebrowY={rightEyebrowY}
              talking={talking}
              setTalking={setTalking}
              size={size}
              headTiltAngle={headTiltAngle}
              shoulderLift={shoulderLift}
              isIdle={isIdle}
            />
          </div>
        ))}
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
        setHeadTiltAngle={setHeadTiltAngle}
        setShoulderLift={setShoulderLift}
        setIsIdle={setIsIdle}
      />
    </div>
  );
}
