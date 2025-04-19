export default function Shirt({ size }) {
  const width = (size * 180) / 100;
  const height = (size * 180) / 100;
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <rect width={width} height={height} fill="gray"></rect>
    </svg>
  );
}
