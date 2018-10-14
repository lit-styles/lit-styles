import { css } from '../../index.js';
import normalizeShadowStyle from './normalize-shadow.js';

export default css`
  ${normalizeShadowStyle}

  .table {
    border-collapse: collapse;
  }

  .table th,
  .table td {
    border: 1px solid black;
  }
`;
