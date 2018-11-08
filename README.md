# lit-styles

Monorepository with [lit-css](packages/lit-css#readme) and integration with other tools and frameworks.

## Quick Example for Web Components

```js
import { html } from 'lit-html';
import { css } from 'lit-css';
import { StyledLitElement } from 'styled-lit-element';

class FancyBadge extends StyledLitElement {
  static get style() {
    return css`
      :host {
        background-color: blue;
        border-radius: 50%;
        color: white;
        padding: 4px;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }
}
```

## Packages

For more information about each package and it's usage please refer to their docs:
- [lit-css](packages/lit-css#readme)
- [styled-lit-element](packages/styled-lit-element#readme)
