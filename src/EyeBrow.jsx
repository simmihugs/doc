import { EYEBROW_WIDTH, EYEBROW_HEIGHT } from "./constants";

export default function EyeBrow({ x, y, rotate = 0 }) {
  const pathD = `
    M ${x - EYEBROW_WIDTH / 2},${y}
    C ${x - EYEBROW_WIDTH / 4},${y - EYEBROW_HEIGHT}
      ${x + EYEBROW_WIDTH / 4},${y - EYEBROW_HEIGHT}
      ${x + EYEBROW_WIDTH / 2},${y}
  `;

  return (
    <path
      d={pathD}
      fill="none"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
      transform={`rotate(${rotate} ${x} ${y})`}
    />
  );
}
