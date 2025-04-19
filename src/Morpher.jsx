export default function Morphie() {
  return (
    <svg width="200" height="100">
      <path
        id="morphingPath"
        d="M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10"
        fill="teal"
      >
        <animate
          attributeName="d"
          from="M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10"
          to="M 20 20 L 80 20 L 80 80 L 20 80 L 20 20"
          dur="3s"
          repeatCount="3"
        />
      </path>
    </svg>
  );
}
