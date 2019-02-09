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
  brand: '#E86137',
  secondary: '#FE855F',
  black: '#181718',
  focus: '#E89837',
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
    breakpoints: {
      xsmall: {
        value: 375,
      },
      small: {
        value: 667,
      },
      medium: {
        value: 1536,
      },
    },
    font: {
      family: 'Inter UI var alt, sans-serif;',
      size: '14px',
      height: '20px',
    },
    colors,
  },
  text: {
    xsmall: 12,
    small: 12,
    medium: 12,
    large: 14,
    xlarge: 16,
    xxlarge: 18,
  },
  heading:{
    extend: css`
      color: ${colors['brand']};
    `,
    weight: 400,
  },

  textInput: {
    extend: css`
      font-weight: 200;
      padding: 2px;
      //border-bottom: 1px solid grey;
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
      size: '12px',
      margin: {
        vertical: '0px',
        horizontal: '-10px',
      },
    },
    border: null,
  },
  button: {
    primary: {
      color: { dark: '#E84F20', light: '#E84F20' },
    },
    border: {
      radius: '5px',
    },
    extend: 'letter-spacing: 0.04167em; font-size:12px; text-transform:uppercase;',
  },
  icon: {
    colors,
  },
});

export default surgo;
