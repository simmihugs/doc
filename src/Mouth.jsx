export const MOUTH_PATHS = {
  frown: "M 30 70 Q 50 40 70 70",
  neutral: "M 30 60 L 70 60",
  smile: "M 30 60 Q 50 90 70 60",
};

export const EXPRESSION_ORDER = ["frown", "neutral", "smile"];

export default function Mouth({ mouthExpression }) {
  return (
    <>
      {/*
    <svg className="w-24 h-24 absolute bottom-4" viewBox="0 0 100 100">
      <path
        d={MOUTH_PATHS[mouthExpression]}
        stroke="black"
        strokeWidth="5"
        fill="transparent"
        strokeLinecap="round"
      />
    </svg>
     */}
      <svg className="w-24 h-24 absolute bottom-4" viewBox="0 0 100 100">
        <path
          d="M 30 60 L 70 60"
          stroke="black"
          strokeWidth="5"
          fill="transparent"
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            from="M 30 60 L 70 60"
            to="M 30 60 Q 50 90 70 60"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </>
  );
}
