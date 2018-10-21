import css from '../src/lit-css.js';

describe('lit-css', () => {
  it('should coerce to string containing same CSS', () => {
    const style = css`.c{}`;
    expect(`${style}`).to.equal('.c{}');
  });

  it('should compose with other styles', () => {
    const s1 = css`.c1{}`;
    const s2 = css`.c2{}`;
    expect(css`${s1}${s2}`.toString()).to.equal('.c1{}.c2{}');
  });

  describe('deduping', () => {
    it('should dedupe same style applied to the same template literal', () => {
      const s1 = css`.c1{}`;
      const s2 = css`.c2{}`;
      expect(css`${s1}${s2}${s1}`.toString()).to.equal('.c1{}.c2{}');
    });

    it('should dedupe nested styles which are parts of the applied styles', () => {
      const s1 = css`.c1{}`;
      const s2 = css`.c2{}`;
      const s3 = css`.c3{}`;
      const s1_2 = css`${s1}${s2}`;
      const s2_3 = css`${s2}${s3}`;
      expect(css`${s1_2}${s2_3}`.toString()).to.equal('.c1{}.c2{}.c3{}');
    });

    it('should dedupe styles on any level up until the same module has been applied before', () => {
      const s1 = css`.c1{}`;
      const s2_1 = css`${s1}.c2{}`;
      const s2_2 = css`.c2{}${s1}`;
      expect(css`${s1}${s2_1}`.toString()).to.equal('.c1{}.c2{}');
      expect(css`${s2_1}${s1}`.toString()).to.equal('.c1{}.c2{}');
      expect(css`${s1}${s2_2}`.toString()).to.equal('.c1{}.c2{}');
      expect(css`${s2_2}${s1}`.toString()).to.equal('.c2{}.c1{}');
    });

    it('should not dedupe other objects besides the ones created with the literal', () => {
      const clr = 'red';
      const size = 1;
      const s1 = css`.c1{color:${clr};font-size:${size}px;}`;
      const s2 = css`.c2{color:${clr};font-size:${size}px;}`;
      const style = css`${s1}${s2}${s1}.c3{color:${clr};font-size:${size}px;}.c4{color:${clr};font-size:${size}px;}`;
      const content = 'color:red;font-size:1px;';
      expect(style.toString()).to.equal(`.c1{${content}}.c2{${content}}.c3{${content}}.c4{${content}}`);
    });
  });
});
