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
  const eyebrowMoveAmount = -5;
  const sizes = [10, 25, 50, 100];
  //const sizes = [100];
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
            />
            {/*
            <svg viewBox="-50 0 400 320">
              <circle cx="150" cy="200" r="200" fill="#8f8f8f" />
              <rect x="-50" y="200" width="400" height="200" fill="#8f8f8f" />
            </svg>
               
              */}
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
      />
    </div>
  );
}
