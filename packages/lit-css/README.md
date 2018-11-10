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

## Support in Code Editors

At the moment you can use the fact that awesome [styled-components](https://www.styled-components.com) have `css` literal feature. This is not the same feature as in lit-css, but close enough for syntax highlighting and autocomplete. It is widely supported in many code editors, for example:

- [VSCode](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- [WebStorm (and other JetBrains IDEs)](https://plugins.jetbrains.com/plugin/9997-styled-components)
- read about others on [the official docs](https://www.styled-components.com/docs/tooling#syntax-highlighting)
