export default async function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}
