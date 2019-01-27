import { Select } from 'grommet/es6';
import React, { Component } from 'react';

class SelectWithSearch extends Component {
  state = {
    options: [],
  };

  componentDidMount() {
    const options = this.props.options;
    const objectOptions = this.props.options;
    this.setState({ options, objectOptions });
  }

  render() {
    const { options, objectOptions } = this.state;
    const { value, labelKey, valueKey } = this.props;

    return (
      <Select
        size={this.props.size}
        valueKey={valueKey}
        labelKey={labelKey}
        options={options}
        onChange={this.props.onChange}
        onSearch={(text) => {
          const exp = new RegExp(text, 'i');
          this.setState({
            options: objectOptions.filter((o) => exp.test(o.nombre)),
          });
        }}
        value={value}
        plain
      />
    );
  }
}

export default SelectWithSearch;
