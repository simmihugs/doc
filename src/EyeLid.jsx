import {
  EYE_RX,
  EYE_RY,
  EYELID_WIDTH,
  LEFT_EYE_CX,
  RIGHT_EYE_CX,
  EYE_Y,
} from "./constants";

export default function EyeLid({
  isBlinking,
  isBlinkingLeft,
  isBlinkingRight,
  side,
  position,
}) {
  const getEyelidProps = (side, position) => {
    const isLeft = side === "left";
    const isTop = position === "top";
    const eyeCenterX = isLeft ? LEFT_EYE_CX : RIGHT_EYE_CX;
    const eyelidX = eyeCenterX - EYE_RX;
    const eyelidWidth = EYELID_WIDTH;

    const isThisEyelidBlinking =
      isBlinking && (isLeft ? isBlinkingLeft : isBlinkingRight);
    const closedHeight = EYE_RY + 2;
    const openHeight = 0;

    const currentHeight = isThisEyelidBlinking ? closedHeight : openHeight;

    let yPos;

    if (isTop) {
      yPos = EYE_Y - EYE_RY;
    } else {
      yPos = EYE_Y + EYE_RY - currentHeight;
    }

    return {
      x: eyelidX,
      y: yPos,
      width: eyelidWidth,
      height: currentHeight,
      className: `svg-doctor-eyelid ${isThisEyelidBlinking ? "closed" : ""}`,
    };
  };

  return <rect {...getEyelidProps(side, position)} fill="#f5d4a0" />;
}
