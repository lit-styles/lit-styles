import { css } from '../../index.js';
import normalizeShadowStyle from './normalize-shadow.js';

export default css`
  ${normalizeShadowStyle}

  .fancy-table {
    border-collapse: collapse;
  }

  .fancy-table th,
  .fancy-table td {
    padding: 16px;
  }

  .fancy-table th {
    border-bottom: 2px solid #aeaeae;
  }

  .fancy-table td {
    border-top: 1px solid #aeaeae;
  }
`;
