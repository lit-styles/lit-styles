export default async function event(element, eventName) {
  return new Promise((resolve) => {
    function listener(ev) {
      resolve(ev);
      element.removeEventListener(eventName, listener);
    }
    element.addEventListener(eventName, listener);
  });
}
