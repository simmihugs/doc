export default function DoctorBody({ size }) {
  const scale = size / 100;
  const neckWidth = 20 * scale;
  const neckHeight = 15 * scale;
  const shoulderWidth = 100 * scale;
  const shoulderHeight = 25 * scale;
  const shoulderRoundRadius = 15 * scale; // Radius for the top corners
  const centerX = 100 * scale;
  const centerY = 100 * scale;

  return <svg viewBox={`0 0 ${200 * scale} ${200 * scale}`}>{/* Neck */}</svg>;
}
