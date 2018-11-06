import fixturesCache from './fixturesCache.js';

export default function fixtureSync(template, setup = {}) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;
  const element = wrapper.children[0];
  const properties = typeof setup === 'function' ? setup(element) : setup;
  Object.keys(properties).forEach((prop) => {
    element[prop] = properties[prop];
  });
  document.body.appendChild(wrapper);
  fixturesCache.push(wrapper);
  return wrapper.children[0];
}
