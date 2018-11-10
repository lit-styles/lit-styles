# lit-css

A tool to distribute styles via ES modules.

## Features

- Tagged template literal `css` to define style modules.
- Deduping of same modules by reference.
- Coercion to a string with correct content.

## What Is a Style Module?

*Style module* in this context is a piece of syntactically correct CSS.
Subparts of styles like declaration blocks within rulesets are not style modules.

Good:

```js
const goodModule = css`
  .my-grey-text {
    color: grey;
  }
`;
```

Bad:

```js
const badModule = css`
  color: grey;
`;
```

## Examples

- [Web Components](https://codesandbox.io/s/5k0kj3rj7x)

## Gotchas

- Deduping only works when all your modules are using the `css` literal.
Make sure you don't forget to include it.
- Due to deduping only the first occurence in the graph of modules counts.
So you should never rely on a different order by placing your dependencies in the middle or in the bottom of a new module.
In other words, dependencies of your style module must be always injected on top.
If you follow the rule of thumb for scalable CSS - the specificity of selectors grows with each new layer of styles - then you will likely never want to do the opposite.

## Support in Text Editors

- VSCode [es6-string-css](https://marketplace.visualstudio.com/items?itemName=bashmish.es6-string-css)
