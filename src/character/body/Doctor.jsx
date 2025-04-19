export default function Doctor({ size }) {
  const scale = size / 100;
  const bodyWidth = 60 * scale;
  const bodyHeight = 120 * scale;
  const headRadius = 20 * scale;
  const sleeveWidth = 30 * scale;
  const sleeveHeight = 60 * scale;
  const legHeight = 50 * scale;
  const legWidth = 20 * scale;
  const stethoscopeRadius = 5 * scale;
  const stethoscopeCurveRadius = 15 * scale;

  return (
    <svg viewBox={`0 0 ${180 * scale} ${180 * scale}`}>
      {/* Lab Coat Body */}
      <rect
        x={(90 - bodyWidth / 2) * scale}
        y={(90 - bodyHeight / 2 - headRadius) * scale}
        width={bodyWidth}
        height={bodyHeight}
        fill="beige"
        rx={5 * scale} // Optional: Rounded corners
      />
      {/* Sleeves */}
      <rect
        x={(90 - bodyWidth / 2 - sleeveWidth) * scale}
        y={(90 - bodyHeight / 2 - headRadius + 10 * scale) * scale}
        width={sleeveWidth}
        height={sleeveHeight}
        fill="beige"
      />
      <rect
        x={(90 + bodyWidth / 2) * scale}
        y={(90 - bodyHeight / 2 - headRadius + 10 * scale) * scale}
        width={sleeveWidth}
        height={sleeveHeight}
        fill="beige"
      />
      {/* Head */}
      <circle
        cx={90 * scale}
        cy={(90 - bodyHeight / 2 - headRadius / 2 - 5) * scale}
        r={headRadius}
        fill="#F5F5DC" // Light beige skin tone
      />
      {/* Hair (Example) */}
      <path
        d={`M ${(90 - headRadius) * scale},${(90 - bodyHeight / 2 - headRadius) * scale}
           a ${headRadius * 0.8} ${headRadius * 0.6} 0 0 1 ${headRadius * 1.6} 0`}
        fill="black"
      />
      {/* Simple Stethoscope (Draped around neck) */}
      <path
        d={`
          M ${(90 - 15) * scale},${(90 - bodyHeight / 2 - headRadius / 2) * scale}
          c ${-stethoscopeCurveRadius * scale},${stethoscopeCurveRadius * scale} ${-stethoscopeCurveRadius * scale},${-stethoscopeCurveRadius * scale} ${-30 * scale},${-10 * scale}
          a ${stethoscopeRadius * scale} ${stethoscopeRadius * scale} 0 0 1 ${0} ${2 * stethoscopeRadius * scale}
          c ${stethoscopeCurveRadius * scale},${-stethoscopeCurveRadius * scale} ${stethoscopeCurveRadius * scale},${stethoscopeCurveRadius * scale} ${30 * scale},${-10 * scale}
        `}
        fill="none"
        stroke="silver"
        strokeWidth={2 * scale}
      />
      <circle
        cx={(90 - 30) * scale}
        cy={(90 - bodyHeight / 2 - headRadius / 2 - 10) * scale}
        r={stethoscopeRadius}
        fill="silver"
      />
      <circle
        cx={(90 + 30) * scale}
        cy={(90 - bodyHeight / 2 - headRadius / 2 - 10) * scale}
        r={stethoscopeRadius}
        fill="silver"
      />
      <circle
        cx={90 * scale}
        cy={(90 - bodyHeight / 2 + 10) * scale}
        r={stethoscopeRadius * 1.5}
        fill="silver"
      />
      {/* Optional: Red Cross on the chest */}
      <path
        d={`
          M ${(90 - 5) * scale},${(90 - bodyHeight / 2 + 20) * scale}
          v ${10 * scale}
          h ${-5 * scale}
          v ${10 * scale}
          h ${10 * scale}
          v ${-10 * scale}
          h ${-5 * scale}
          v ${-10 * scale}
          z
        `}
        fill="red"
      />
    </svg>
  );
}
