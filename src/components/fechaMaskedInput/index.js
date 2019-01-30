import React, { Component } from 'react';
import { Box, Keyboard, TextInput } from 'grommet';
import moment from 'moment';

const MONTHS = ['[2-9]', '0[1-9]', '1[0-2]'];
const DAYS = ['[4-9]', '0[1-9]', '[1-2][0-9]', '3[0-1]'];
const DAY_REGEXP = new RegExp(DAYS.map((m) => `^${m}$`).join('|'));
const DAY_MONTH_REGEXP = new RegExp(
  DAYS.map((d) => MONTHS.map((m) => `^${d}-${m}$`).join('|')).join('|'),
);
const DAY_MONTH_YEAR_REGEXP = new RegExp('^(\\d{1,2})-(\\d{1,2})-(\\d{4})$');
const FIVE_DIGITS_YEAR = new RegExp('^(\\d{1,2})-(\\d{1,2})-(\\d{5})$');

class DateInput extends Component {
  state = { text: '' };

  componentDidMount() {
    let date = this.props.value;
    let parsedDate = moment(this.props.value);
    if (parsedDate.isValid()) {
      parsedDate = parsedDate.format('D-MM-Y');
    } else {
      parsedDate = '';
      date = null;
    }
    this.setState({ text: parsedDate, date });
  }

  componentDidUpdate() {
    if (this.focusInput) {
      const element = document.getElementById('date-input');
      element.focus();
    }
  }

  onFocus = () => {
    if (!this.focusInput) {
      this.setState({ active: true });
    } else {
      this.focusInput = false;
    }
  };

  onInput = (event) => {
    const { text } = this.state;
    let {
      target: { value },
    } = event;
    let date;
    const match = value.match(DAY_MONTH_YEAR_REGEXP);
    let bounds = [...this.props.bounds];

    if (match) {
      if (bounds.length > 0) {
        let momentDate = new Date(match[3], parseInt(match[2], 10) - 1, match[1]).toISOString();
        momentDate = moment(momentDate);
        const startDate = moment(bounds[0], 'YYYY-MM-DD');
        const endDate = moment(bounds[1], 'YYYY-MM-DD');

        if (momentDate.isBetween(startDate, endDate)) {
          date = new Date(match[3], parseInt(match[2], 10) - 1, match[1]).toISOString();
        }
      } else {
        date = new Date(match[3], parseInt(match[2], 10) - 1, match[1]).toISOString();
      }
    } else if (value.match(FIVE_DIGITS_YEAR)) {
      value = value.slice(0, -1);
    } else if (value.length > text.length) {
      if (value.match(DAY_MONTH_REGEXP)) {
        value = `${value}-`;
      } else if (value.match(DAY_REGEXP)) {
        value = `${value}-`;
      }
    }

    this.setState({ text: value, date, active: true });
  };

  onKeyDown = (e) => {
    this.setState({ active: true });
    if (
      !(
        e.metaKey ||
        e.which === 9 ||
        e.which <= 0 ||
        e.which === 8 ||
        /[0-9]/.test(String.fromCharCode(e.which))
      )
    ) {
      e.preventDefault();
    }
  };

  onChange = (e) => {
    const value = moment(e.target.value, 'DD-MM-YYYY');
    this.props.onChange({ value });
  };

  render() {
    const { text } = this.state;
    return (
      <Box>
        <Keyboard onKeyDown={this.onKeyDown}>
          <TextInput
            placeholder={'DD-MM-YYYY'}
            id="date-input"
            ref={(ref) => {
              this.ref = ref;
            }}
            {...this.props}
            style={{ borderBottom: 'none' }}
            onInput={this.onInput}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            value={text}
          />
        </Keyboard>
      </Box>
    );
  }
}

export default DateInput;
