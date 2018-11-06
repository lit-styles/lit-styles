# styled-lit-element

Provides integration with Polymer's `LitElement` base class.

## Features

- Enforces convention to define styles in `static get style()`.
- Automatically renders `<style>` using the getter content.
- Caches `<style>` on a class level to prevent unnecessary calculations for each instance.
- Enforces usage of lit-css for style definition.

## StyledLitElement

Can be used as an ES class which already extends `LitElement`.

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

## StyledLitElementMixin

Additionally can be used as a conventional ES mixin to control the extension of `LitElement`.
Might be useful if you already have a different base class which extends `LitElement`.

```js
import { html } from 'lit-html';
import { css } from 'lit-css';
import { LitElement } from '@polymer/lit-element';
import { StyledLitElementMixin } from 'styled-lit-element';

class FancyBadge extends StyledLitElementMixin(LitElement) {
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
