import { expect } from 'chai';
import {
  cleanupFixtures, defineCE, event, fixture,
} from '@lit-styles/test-utils';

import { html } from '@polymer/lit-element';
import { css } from 'lit-css';

import StyledLitElement from '../src/StyledLitElement.js';

afterEach(cleanupFixtures);

describe('StyledLitElement', () => {
  it('renders <style> for "static get style()" in Shadow DOM', async () => {
    const tag = defineCE(class extends StyledLitElement {
      static get style() {
        return css`.red { color: red; }`;
      }

      render() {
        return html`<span class="red"></span>`;
      }
    });
    const el = await fixture(`<${tag}></${tag}>`);
    const elRedInside = el.shadowRoot.querySelector('.red');
    const elRedOutside = await fixture('<span class="red"></span>');
    expect(window.getComputedStyle(elRedInside).color).to.eql('rgb(255, 0, 0)');
    expect(window.getComputedStyle(elRedOutside).color).to.eql('rgb(0, 0, 0)');
  });

  it('does not render <style> if "static get style()" is not defined', async () => {
    const tag = defineCE(class extends StyledLitElement {
      render() {
        return html`<span></span>`;
      }
    });
    const el = await fixture(`<${tag}></${tag}>`);
    const elStyleInside = el.shadowRoot.querySelector('style');
    expect(elStyleInside).to.not.exist;
  });

  it('forces usage of lit-css in "static get style()"', async () => {
    const tempUncaught = mocha.constructor.Runner.prototype.uncaught;
    mocha.constructor.Runner.prototype.uncaught = () => {};

    const tag = defineCE(class extends StyledLitElement {
      static get style() {
        return '.red { color: red; }';
      }

      render() {
        return html``;
      }
    });
    setTimeout(() => fixture(`<${tag}></${tag}>`));
    const { error: e } = await event(window, 'error');
    expect(() => { throw e; }).to.throw(TypeError, '"static get style()" must return a module defined via lit-css.');

    mocha.constructor.Runner.prototype.uncaught = tempUncaught;
  });
});
