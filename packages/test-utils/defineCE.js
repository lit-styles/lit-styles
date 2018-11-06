let count = 0;

export default function defineCE(klass) {
  const tag = `test-${count}`;
  customElements.define(tag, klass);
  count += 1;
  return tag;
}
