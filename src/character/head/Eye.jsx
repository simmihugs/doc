import * as Const from "../../constants";

export default function Eye({ position, side }) {
  return side === "left" ? (
    <>
      {" "}
      <ellipse
        cx={Const.LEFT_EYE_CX}
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
    </>
  ) : (
    <>
      <ellipse
        cx={Const.RIGHT_EYE_CX}
        cy={Const.EYE_Y}
        rx={Const.EYE_RX}
        ry={Const.EYE_RY}
        fill="rgb(247, 247, 247)"
      />
      <ellipse
        cx={position.x + (Const.RIGHT_EYE_CX - Const.LEFT_EYE_CX)}
        cy={position.y}
        rx={Const.PUPIL_RX}
        ry={Const.PUPIL_RY}
        fill="black"
      />
    </>
  );
}
