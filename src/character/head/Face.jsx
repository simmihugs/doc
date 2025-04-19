import Mouth from "./Mouth";
import EyeLid from "./EyeLid";
import EyeBrow from "./EyeBrow";
import Eye from "./Eye";
import * as Const from "../../constants";

export default function Face({
  isBlinking,
  isBlinkingLeft,
  isBlinkingRight,
  position,
  mouthExpression,
  leftEyebrowY,
  rightEyebrowY,
  talking,
  setTalking,
  size = 100,
}) {
  return (
    <div className="svg-doctor-face">
      <svg
        viewBox="0 0 200 200"
        width={(180 * size) / 100}
        height={(180 * size) / 100}
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

        <Eye position={position} side="left" />
        <Eye position={position} side="right" />

        <EyeBrow x={Const.LEFT_EYE_CX} y={leftEyebrowY} />
        <EyeBrow x={Const.RIGHT_EYE_CX} y={rightEyebrowY} />
        <Mouth
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
