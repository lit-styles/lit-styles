import { LitElement, html } from '@polymer/lit-element';
import { StyleModule } from 'lit-css';

export default s => class StyledLitElementMixinClass extends s {
  connectedCallback() {
    if (this.constructor.style && !(this.constructor.style instanceof StyleModule)) {
      throw TypeError('"static get style()" must return a module defined via lit-css.');
    }
    super.connectedCallback();
  }

  static render(templateResult, ...args) {
    const styleTag = this.__getStyleTagAndMemoize();
    const styledTemplateResult = styleTag ? html`${styleTag}${templateResult}` : templateResult;
    LitElement.render(styledTemplateResult, ...args);
  }

  static __getStyleTagAndMemoize() {
    if (!this.__styleTagWasMemoized) {
      this.__memoizedStyleTag = this.style ? html`<style>${this.style}</style>` : null;
      this.__styleTagWasMemoized = true;
    }
    return this.__memoizedStyleTag;
  }
};
