export default function makeRoute(title, currentIndex, scene, props = {}) {
  return {title, index: currentIndex + 1, scene, props};
};
