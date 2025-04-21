import Mouth from "./Mouth";
import EyeLid from "./EyeLid";
import EyeBrow from "./EyeBrow";
import Eye from "./Eye";
import * as Const from "../constants";

export default function Head({
  headTiltAngle,
  isBlinking,
  isBlinkingLeft,
  isBlinkingRight,
  position,
  mouthExpression,
  leftEyebrowY,
  rightEyebrowY,
  talking,
  setTalking,
  scale,
}) {
  const headTransform = `
    rotate(${headTiltAngle}, ${Const.HEAD_CENTER_X}, ${Const.HEAD_CENTER_Y + 30})
  `;

  return (
    <g transform={headTransform}>
      <circle
        cx={Const.HEAD_CENTER_X}
        cy={Const.HEAD_CENTER_Y - 30 * scale}
        r={Const.HEAD_RADIUS * 0.75}
        fill="#f5d4a0"
      />
      <circle
        cx={Const.HEAD_CENTER_X}
        cy={Const.HEAD_CENTER_Y + 10 * scale}
        r={Const.HEAD_RADIUS * 0.75}
        fill="#f5d4a0"
      />
      <rect
        x={Const.HEAD_CENTER_X - Const.HEAD_RADIUS * 0.75}
        y={Const.HEAD_CENTER_Y - 30 * scale}
        width={Const.HEAD_RADIUS * 0.75 * 2}
        height={50 * scale}
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
    </g>
  );
}
