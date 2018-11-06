import fixturesCache from './fixturesCache.js';

export default function cleanupFixtures() {
  let element = fixturesCache.pop();
  while (element) {
    document.body.removeChild(element);
    element = fixturesCache.pop();
  }
}
