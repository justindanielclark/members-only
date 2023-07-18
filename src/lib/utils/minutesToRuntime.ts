export default function minutesToRuntime(time: number) {
  const minutes = time % 60;
  const hours = Math.floor(time / 60);
  return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
}
