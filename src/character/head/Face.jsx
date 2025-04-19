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
  const scale = size / 100;
  //const neckWidth = 50 * scale;
  //const neckHeight = 40 * scale;
  //const shoulderWidth = 240 * scale;
  //const shoulderHeightTop = 20 * scale;
  //const shoulderHeightBottom = 15 * scale;
  //const shoulderRoundRadius = 20 * scale;
  //const headRadius = Const.HEAD_RADIUS * scale;
  //const headCenterY = Const.HEAD_CENTER_Y * scale;
  //const headCenterX = Const.HEAD_CENTER_X * scale;
  //const neckTopY = headCenterY + headRadius;
  //const neckX = headCenterX - neckWidth / 2;
  //const shoulderTopY = neckTopY + neckHeight - 5 * scale;
  //const shoulderX = headCenterX - shoulderWidth / 2;

  //const shoulderXLeft = headCenterX - shoulderWidth / 2;
  //const shoulderXRight = headCenterX + shoulderWidth / 2;
  //const shoulderBottomY = shoulderTopY + shoulderHeightTop;

  // Calculate the new viewBox dimensions
  const viewBoxX = 0;
  const viewBoxY = 0;
  const viewBoxWidth = 200; // Keep the width for now, adjust if needed
  const viewBoxHeight = 200; // Adjust 20 for some extra padding

  return (
    <div className="svg-doctor-face">
      <svg
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
        width={(180 * size) / 100}
        height={((viewBoxHeight / viewBoxWidth) * 180 * size) / 100} // Maintain aspect ratio
        aria-labelledby="faceTitle faceDesc"
      >
        <title id="faceTitle">Animated SVG Face</title>
        <desc id="faceDesc">
          An animated face with moving eyes, blinking eyelids, and changing
          expressions.
        </desc>

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
      </svg>
    </div>
  );
}
