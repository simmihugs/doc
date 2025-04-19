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
  //  const sizes = [10, 25, 50, 100];
  const sizes = [100];
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
            <svg viewBox="-50 0 400 320">
              <circle cx="150" cy="50" r="50" fill="#8f8f8f" />
              <circle cx="50" cy="100" r="50" fill="#8f8f8f" />
              <circle cx="250" cy="100" r="50" fill="#8f8f8f" />

              {/*
              <line
                x1="150"
                y1="50"
                x2="50"
                y2="100"
                stroke="black"
                strokeWidth="100"
              />

                */}
              <polygon
                points="127.64,5.28 172.36,94.72 72.36,144.72 27.64,55.28"
                fill="blue"
                opacity="0.5"
              />
              {/*
                               <line
                x1="150"
                y1="50"
                x2="250"
                y2="100"
                stroke="black"
                strokeWidth="100"
              />

                */}

              <polygon
                points="127.64,94.72 172.36,5.28 272.36,55.28 227.64,144.72"
                fill="green"
                opacity="0.5"
              />
              {/*
              <line
                x1="50"
                y1="100"
                x2={50 - (100 - 50)}
                y2={100 - (50 - 250)}
                stroke="red"
                strokeWidth="100"
              />

                */}
              <polygon
                points="98.5,112.15 1.5,87.85 -48.5,287.85 48.5,312.15"
                fill="red"
                opacity="0.5"
              />

              {/*
              <line
                x1="250"
                y1="100"
                x2={250 + (100 - 50)} // Perpendicular direction calculation
                y2={100 - (50 - 250)}
                stroke="green"
                strokeWidth="100"
              />

                */}

              <polygon
                points="201.50,112.15 298.50,87.85 348.50,287.85 251.50,312.15"
                fill="lime"
                opacity="0.5"
              />
            </svg>
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
