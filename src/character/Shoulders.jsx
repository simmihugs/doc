export default function Shoulders({ shoulderLift }) {
  const shoulderTransform = `
    translate(0 ${-shoulderLift})
  `;

  return (
    <g transform={shoulderTransform}>
      <circle cx="100" cy="250" r="80" fill="#7da6e8" />
      <rect x="20" y="250" width="160" height="160" fill="#7da6e8" />
      <circle cx="60" cy="230" r="20" fill="black" />

      <line x1="60" y1="230" x2="60" y2="180" stroke="black" strokeWidth="4" />
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
  );
}
