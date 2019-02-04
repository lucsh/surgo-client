import React, { Component } from 'react';
import GroupedButtonsSelect from '../../groupedButtonsSelect';
import { Box, TextInput } from 'grommet/es6';

class GeneroSelect extends Component {
  state = {
    genero: '',
    otro: '',
  };

  componentDidMount() {
    const { select } = this.props.value;
    const otro = this.props.value.otro || '';
    this.setState({
      select,
      otro,
    });
  }
  onChangeSelect = (e) => {
    const select = e.value;
    let otro = this.state.otro;
    if (select !== 'Otro') {
      otro = '';
    }
    this.props.onChange({ value: { otro, select } });
    this.setState({
      select,
    });
  };
  onChangeOtro = (e) => {
    const otro = e.target.value;
    this.props.onChange({ value: { select: this.state.select, otro } });
    this.setState({
      otro,
    });
  };

  render() {
    return (
      <Box direction="row" basis="full" align="center" justify="between" pad="none">
        <GroupedButtonsSelect
          icon
          {...this.props}
          value={this.state.select}
          onChange={this.onChangeSelect}
        />
        <Box>
          {this.state.select === 'Otro' && (
            <TextInput
              plain
              style={{ borderBottom: 'solid 1px #888888', borderRadius: 0 }}
              onChange={this.onChangeOtro}
              value={this.state.otro}
            />
          )}
        </Box>
      </Box>
    );
  }
}

export default GeneroSelect;
