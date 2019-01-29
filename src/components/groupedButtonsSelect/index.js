import React, { Component } from 'react';
import { Box, Button } from 'grommet/es6';
import theme from '../../utils/theme';

class GroupedButtonsSelect extends Component {
  render() {
    const COLOR = theme.global.colors['brand'];

    const { options, value } = this.props;

    const onChange = (e, option) => {
      this.props.onChange({ value: option });
    };

    const border = '5px';
    const buttonStyles = {
      common: {
        border: `2px solid ${COLOR}`,
        padding: '2px 15px',
        fontSize: '12px',
        borderLeft: 'none',
        borderRadius: 0,
        fontWeight: 300,
      },
      first: {
        borderLeft: 'inherith',
        borderRadius: `${border} 0 0 ${border}`,
      },
      last: {
        borderRadius: `0 ${border} ${border} 0`,
      },
      selected: {
        backgroundColor: COLOR,
        fontWeight: 600,
        color: 'white',
      },
    };

    return (
      <Box {...this.props} direction="row" align="center" flex="shrink" gap="none" pad="xsmall">
        {options.map((option, index, array) => {
          const isSelected = value === option;
          let aditionalStyles;

          if (index === 0) {
            aditionalStyles = buttonStyles.first;
          }
          if (index === array.length - 1) {
            aditionalStyles = buttonStyles.last;
          }

          if (isSelected) aditionalStyles = { ...aditionalStyles, ...buttonStyles.selected };

          return (
            <Button
              style={{ ...buttonStyles.common, ...aditionalStyles }}
              hoverIndicator
              size={'xsmall'}
              key={option}
              value={option}
              label={option}
              plain
              color={'brand'}
              primary={isSelected}
              onClick={(e) => onChange(e, option)}
            />
          );
        })}
      </Box>
    );
  }
}

export default GroupedButtonsSelect;
