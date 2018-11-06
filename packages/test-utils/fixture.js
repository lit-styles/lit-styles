import nextFrame from './nextFrame.js';
import fixtureSync from './fixtureSync.js';

export default async function fixture(template, setup = {}) {
  const element = fixtureSync(template, setup);
  await nextFrame();
  return element;
}
