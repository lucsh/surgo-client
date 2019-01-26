// import { grommet } from 'grommet/themes';
import { css } from 'styled-components';

const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);

const deepFreeze = (obj) => {
  Object.keys(obj).forEach((key) => key && isObject(obj[key]) && Object.freeze(obj[key]));
  return Object.freeze(obj);
};

const accentColors = ['#0096d7', '#614767', '#ff8d6d'];
const neutralColors = ['#425563', '#5F7A76', '#80746E', '#767676'];
const statusColors = {
  critical: '#F04953',
  error: '#F04953',
  warning: '#FFD144',
  ok: '#01a982',
  unknown: '#CCCCCC',
  disabled: '#CCCCCC',
};

const colors = {
  brand: '#3d70b2',
  secondary: '#5596e6',
  black: '#152935',
  focus: '#0096d7',
};

const colorArray = (array, prefix) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color;
  });

colorArray(accentColors, 'accent');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach((color) => {
  colors[`status-${color}`] = statusColors[color];
});

const surgo = deepFreeze({
  global: {
    font: {
      family: 'Lato',
      size: '16px',
      height: '20px',
    },
    colors,
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
    border: null,
  },
  button: {
    border: {
      radius: '0px',
    },
    extend: 'letter-spacing: 0.04167em;',
  },
  icon: {
    colors,
  },
});

export default surgo;
