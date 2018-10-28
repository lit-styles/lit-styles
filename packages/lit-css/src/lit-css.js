import StyleModule from './StyleModule.js';

export default function css(strings, ...values) {
  return new StyleModule(strings, values);
}
