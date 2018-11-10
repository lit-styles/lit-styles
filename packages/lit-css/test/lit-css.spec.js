import { expect } from 'chai';
import css from '../src/lit-css.js';
import StyleModule from '../src/StyleModule.js';

describe('lit-css', () => {
  it('creates a style module', () => {
    const style = css`.c{}`;
    expect(style).to.be.an.instanceof(StyleModule);
  });

  it('is automatically coerced to a string containing the same CSS', () => {
    const style = css`.c{}`;
    expect(`${style}`).to.equal('.c{}');
  });

  it('allows composition of multiple style modules', () => {
    const s1 = css`.c1{}`;
    const s2 = css`.c2{}`;
    expect(css`${s1}${s2}.c3{}`.toString()).to.equal('.c1{}.c2{}.c3{}');
  });

  describe('deduping', () => {
    it('dedupes same style modules applied to the same template literal', () => {
      const s1 = css`.c1{}`;
      const s2 = css`.c2{}`;
      expect(css`${s1}${s2}${s1}`.toString()).to.equal('.c1{}.c2{}');
    });

    it('dedupes nested style modules which are parts of the applied styles', () => {
      const s1 = css`.c1{}`;
      const s2 = css`.c2{}`;
      const s3 = css`.c3{}`;
      const s1_2 = css`${s1}${s2}`;
      const s2_3 = css`${s2}${s3}`;
      expect(css`${s1_2}${s2_3}`.toString()).to.equal('.c1{}.c2{}.c3{}');
    });

    it('dedupes style modules on any level up until the same module has been applied before', () => {
      const s1 = css`.c1{}`;
      const s2_1 = css`${s1}.c2{}`;
      const s2_2 = css`.c2{}${s1}`;
      expect(css`${s1}${s2_1}`.toString()).to.equal('.c1{}.c2{}');
      expect(css`${s2_1}${s1}`.toString()).to.equal('.c1{}.c2{}');
      expect(css`${s1}${s2_2}`.toString()).to.equal('.c1{}.c2{}');
      expect(css`${s2_2}${s1}`.toString()).to.equal('.c2{}.c1{}');
    });

    it('does not dedupe other objects besides the ones created with the literal', () => {
      const clr = 'red';
      const size = 1;
      const s1 = css`.c1{color:${clr};font-size:${size}px;}`;
      const s2 = css`.c2{color:${clr};font-size:${size}px;}`;
      const style = css`${s1}${s2}${s1}.c3{color:${clr};font-size:${size}px;}.c4{color:${clr};font-size:${size}px;}`;
      const content = 'color:red;font-size:1px;';
      expect(style.toString()).to.equal(`.c1{${content}}.c2{${content}}.c3{${content}}.c4{${content}}`);
    });
  });

  describe('foreign object type validation', () => {
    const typeError = [
      TypeError,
      /^Type of the embedded value ".+" is not one of the allowed: "string", "number" or another lit-css\.$/s,
    ];

    it('allows strings', () => {
      expect(css`.c{color:${'red'};}`.toString()).to.eql('.c{color:red;}');
    });

    it('allows numbers', () => {
      expect(css`.c{font-size:${2}em;}`.toString()).to.eql('.c{font-size:2em;}');
    });

    it('forbids booleans', () => {
      expect(() => css`.c{border:${true};}`).to.throw(...typeError);
      expect(() => css`.c{border:${false};}`).to.throw(...typeError);
    });

    it('forbids null', () => {
      expect(() => css`.c{border:${null};}`).to.throw(...typeError);
    });

    it('forbids undefined', () => {
      expect(() => css`.c{border:${undefined};}`).to.throw(...typeError);
    });

    it('forbids NaN', () => {
      expect(() => css`.c{border:${NaN};}`).to.throw(...typeError);
    });

    it('forbids symbols', () => {
      expect(() => css`.c{border:${Symbol('foo')};}`).to.throw(...typeError);
    });

    it('forbids functions', () => {
      const mixin = () => 'color:red;';
      expect(() => css`.c{${mixin}}`).to.throw(...typeError);
      expect(css`.c{${mixin()}}`.toString()).to.eql('.c{color:red;}');
    });

    it('forbids objects', () => {
      expect(() => css`.c{${{}}}`).to.throw(...typeError);
    });
  });
});
