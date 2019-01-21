import React, { Component } from 'react';
import { Box, Heading, Paragraph } from 'grommet/es6';

class NoMatch extends Component {
  render() {
    return (
      <Box alignContent="between" pad="large" full="true" fill={'horizontal'}>
        <Heading level={1} margin="none" alignSelf="start" color={'lightGrey'}>
          #404
        </Heading>
        <Heading level={2} margin="none" alignSelf="start" color={'grey'}>
          <strong> Mmmm, algo anda mal...</strong>
        </Heading>
        <Paragraph alignSelf="start" textAlign="start" color={'grey'}>
          No encontramos la pagina que estas buscando. O bien alguien te dió un vinculo incorrecto o
          quizas escribiste mal la dirección.
        </Paragraph>
        <Paragraph textAlign="end">
          <svg style={{ height: 100, fill: 'grey' }} x="0px" y="0px" viewBox="0 0 1000 1000">
            <path d="M500,990C229.8,990,10,770.2,10,500C10,229.8,229.8,10,500,10c270.2,0,490,219.8,490,490C990,770.2,770.2,990,500,990z M500,69.3C262.5,69.3,69.3,262.5,69.3,500c0,237.5,193.2,430.7,430.7,430.7c237.5,0,430.8-193.2,430.8-430.7C930.7,262.5,737.5,69.3,500,69.3z" />
            <path d="M379.4,313.6c35.5,0,64.2,28.8,64.2,64.2c0,35.5-28.8,64.2-64.2,64.2c-35.5,0-64.2-28.8-64.2-64.2C315.1,342.4,343.9,313.6,379.4,313.6z" />
            <circle cx="620.6" cy="377.9" r="64.2" />
            <path d="M315.4,710.1l-35.6-47.4c266.8-200.5,457.3,1.6,459.2,3.7l-43.6,40.1C689.1,699.7,538.4,542.5,315.4,710.1z" />
          </svg>
        </Paragraph>
      </Box>
    );
  }
}

export default NoMatch;
