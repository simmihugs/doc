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
  headTiltAngle,
  shoulderLift,
  isIdle,
  size = 100,
}) {
  const scale = size / 100;
  const viewBoxX = 0;
  const viewBoxY = 0;
  const viewBoxWidth = 200;
  const viewBoxHeight = 200;

  const headTransform = `
    rotate(${headTiltAngle}, ${Const.HEAD_CENTER_X}, ${Const.HEAD_CENTER_Y + 30})
  `;

  const shoulderTransform = `
    translate(0 ${-shoulderLift})
  `;

  return (
    <div className="svg-doctor-face">
      <svg
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
        width={(180 * size) / 100}
        height={100 + ((viewBoxHeight / viewBoxWidth) * 180 * size) / 100}
        aria-labelledby="faceTitle faceDesc"
      >
        <title id="faceTitle">Animated SVG Face</title>
        <desc id="faceDesc">
          An animated face with moving eyes, blinking eyelids, and changing
          expressions.
        </desc>

        <g transform={shoulderTransform}>
          <circle cx="100" cy="250" r="80" fill="#7da6e8" />
          <rect x="20" y="250" width="160" height="160" fill="#7da6e8" />
          <circle cx="60" cy="230" r="20" fill="black" />

          <line
            x1="60"
            y1="230"
            x2="60"
            y2="180"
            stroke="black"
            strokeWidth="4"
          />
          <circle cx="60" cy="230" r="15" fill="gray" />
          <line
            x1="140"
            y1="210"
            x2="140"
            y2="180"
            stroke="black"
            strokeWidth="4"
          />
          <rect x="110" y="210" width="50" height="50" fill="#93b6ed" />
        </g>

        <g transform={headTransform}>
          <circle
            cx={Const.HEAD_CENTER_X} // Should already be scaled
            cy={Const.HEAD_CENTER_Y - 30 * scale}
            r={Const.HEAD_RADIUS * 0.75} // Should already be scaled
            fill="#f5d4a0"
          />
          <circle
            cx={Const.HEAD_CENTER_X} // Should already be scaled
            cy={Const.HEAD_CENTER_Y + 10 * scale}
            r={Const.HEAD_RADIUS * 0.75} // Should already be scaled
            fill="#f5d4a0"
          />
          <rect
            x={Const.HEAD_CENTER_X - Const.HEAD_RADIUS * 0.75} // Should scale because headRadius is scaled
            y={Const.HEAD_CENTER_Y - 30 * scale}
            width={Const.HEAD_RADIUS * 0.75 * 2} // Should scale because headRadius is scaled
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
      </svg>
    </div>
  );
}
