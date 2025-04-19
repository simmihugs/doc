import React from "react";

export const EXPRESSION_ORDER = ["neutral", "smile", "surprised", "sad"];

const MOUTH_PATHS = {
  neutral: "M 75 130 Q 100 135 125 130", // Simple neutral line
  smile: "M 75 130 Q 100 145 125 130", // Upward curve
  surprised: "M 90 130 Q 100 140 110 130 Q 100 150 90 130 Z", // Oval shape
  sad: "M 75 140 Q 100 130 125 140", // Downward curve
};

// Simple mouth component returning an SVG path
function SvgMouth({ mouthExpression = "neutral" }) {
  const pathData = MOUTH_PATHS[mouthExpression] || MOUTH_PATHS.neutral;

  return (
    <path
      d={pathData}
      fill="none" // Or fill="black" if you want a filled mouth
      stroke="black" // Mouth color
      strokeWidth="5" // Thickness
      strokeLinecap="round"
    />
  );
}

export default SvgMouth;
