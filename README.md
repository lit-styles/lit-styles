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

## Example for Web Components

Even in Web Components not every component is a Custom Element with a shadow root.
You often create a component as a set of reusable classes following certain naming conventions.
Shadow DOM still helps to encapsulate those and prevent the leak of classes with generic names.

Imagine you have a `normalize.css` version for shadow roots.
And you want all other styles to be built upon it.
For example you might have 2 variations of a table:

`my-styles/table.js`

```js
import { css } from 'lit-css';
import normalizeShadowStyle from './normalize-shadow.js';

export default css`
  ${normalizeShadowStyle}
  .table {
    /* my default table styles */
  }
`;
```

`my-styles/fancy-table.js`

```js
import { css } from 'lit-css';
import normalizeShadowStyle from './normalize-shadow.js';

export default css`
  ${normalizeShadowStyle}
  .fancy-table {
    /* my fancy table styles */
  }
`;
```

Then in your component you can use both in a very natural way for template literals.
The composed module will be coerced to a string automatically.
An example using the `LitElement` base class might look like this:

`my-component.js`

```js
import { LitElement, html } from '@polymer/lit-element';
import { css } from 'lit-css';
import tableStyle from 'my-styles/table.js';
import fancyTableStyle from 'my-styles/fancy-table.js';

class MyComponent extends LitElement {
  static get style() {
    return css`
      ${tableStyle}
      ${fancyTableStyle}
      /* ...more styles */
    `;
  }

  render() {
    return html`
      <style>${this.constructor.style}</style>
      <table class="table">
        <!-- some content -->
      </table>
      <table class="fancy-table">
        <!-- some content -->
      </table>
    `;
  }
}

customElements.define('my-component', MyComponent);
```

## Gotchas

- Deduping only works when all your modules are using the `css` literal.
Make sure you don't forget to include it.
- Due to deduping only the first occurence in the graph of modules counts.
So you should never rely on a different order by placing your dependencies in the middle or in the bottom of a new module.
In other words, dependencies of your style module must be always injected on top.
If you follow the rule of thumb for scalable CSS - the specificity of selectors grows with each new layer of styles - then you will likely never want to do the opposite.

## Support in Text Editors

- VSCode [es6-string-css](https://marketplace.visualstudio.com/items?itemName=bashmish.es6-string-css)
