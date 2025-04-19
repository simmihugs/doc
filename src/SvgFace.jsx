import SvgMouth from "./SvgMouth";
import EyeLid from "./EyeLid";
import EyeBrow from "./EyeBrow";
import * as Const from "./constants";

export default function SvgFace({
  isBlinking,
  setIsBlinking,
  isBlinkingLeft,
  setIsBlinkingLeft,
  isBlinkingRight,
  setIsBlinkingRight,
  position,
  setPosition,
  mouthExpression,
  setMouthExpression,
  moveAmount,
  timeoutRef,
  leftEyebrowY,
  setLeftEyebrowY,
  rightEyebrowY,
  setRightEyebrowY,
  talking,
  setTalking,
  eyebrowMoveAmount,
}) {
  return (
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
  );
}
