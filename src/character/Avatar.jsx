import Shoulders from "./Shoulders";
import Head from "./Head";

export default function Avatar({
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
  size = 100,
}) {
  const scale = size / 100;
  const viewBoxX = 0;
  const viewBoxY = 0;
  const viewBoxWidth = 200;
  const viewBoxHeight = 200;

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

        <Shoulders shoulderLift={shoulderLift} />
        <Head
          headTiltAngle={headTiltAngle}
          isBlinking={isBlinking}
          isBlinkingLeft={isBlinkingLeft}
          isBlinkingRight={isBlinkingRight}
          position={position}
          mouthExpression={mouthExpression}
          leftEyebrowY={leftEyebrowY}
          rightEyebrowY={rightEyebrowY}
          talking={talking}
          setTalking={setTalking}
          scale={scale}
        />
      </svg>
    </div>
  );
}
