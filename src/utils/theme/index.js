import { grommet } from 'grommet/themes';
import { css } from 'styled-components';

const twkdTheme = {
  ...grommet,

  global: {
    font: {
      family: 'Lato',
      size: '16px',
      height: '20px',
    },
    colors: {
      brand: '#3d70b2',
      secondary: '#5596e6',
      black: '#152935',
      focus: '#0096d7',
    },
  },

  textInput: {
    extend: css`
      font-weight: 200;
      padding: 2px;
      borderbottom: '1px solid grey';
    `,
  },
  MaskedInput: {
    extend: css`
      font-weight: 200;
      padding: 2px;
      border: none;
    `,
  },
  formField: {
    label: {
      color: 'black',
      size: '10px',
      margin: {
        vertical: '0px',
        horizontal: '-10px',
      },
    },
    border: 'none',
  },
  button: {
    border: {
      radius: '0px',
    },
    extend: 'letter-spacing: 0.04167em;',
  },
};

export default twkdTheme;
