import React, { Component, Fragment } from 'react';
import { Box } from 'grommet/es6/components/Box';
import { Anchor, Button, Menu, Paragraph, Text } from 'grommet/es6'
import moment from 'moment';
import theme from '../../../utils/theme';
import { More } from 'grommet-icons';

class Estudio extends Component {
  // id
  // idUser
  // titulo
  // tipo
  // instituto
  // detalle
  // desde
  // hasta
  // duracionTotal
  // duracionUnidad

  render() {
    const BRAND_COLOR = theme.global.colors['brand'];

    const { estudio } = this.props;
    const desde = moment(estudio.desde).format('Y');
    const hasta = moment(estudio.hasta).format('Y');
    return (
      <Box
        alignContent="start"
        justify="start"
        align="start"
        direction="column"
        pad="small"
        width="medium"
        elevation="xsmall"
      >
        <Box
          align="center"
          justify="between"
          direction={'row'}
          width="medium"
          gap={'small'}
          pad={'none'}
        >
          <Box direction={'row'}>
            <Text
              size={'xsmall'}
              weight={'normal'}
              margin={{ right: '5px', top: '2px' }}
              color={BRAND_COLOR}
            >
              &#11044;{'    '}
            </Text>
            <Text size={'small'} weight={'bold'} pad={'small'}>
              {estudio.titulo}
            </Text>
          </Box>
          <Box align="center" direction={'row'} gap={'none'} pad={'none'}>
            <Text size={'xsmall'} weight={'bold'} color={'#BEBEBE'}>
              {estudio.instituto} ({desde} - {hasta})
            </Text>
            <Menu
              size="small"
              // label="..."
              icon={<More size="small" />}
              items={[
                { label: 'Editar', onClick: () => {this.props.editar(estudio.id)} },
                { label: 'Eliminar', onClick: () => {this.props.eliminar(estudio.id)} },
              ]}
            />
          </Box>

        </Box>
        <Box align="start" direction={'row-responsive'} gap={'none'} pad={'none'}>
          <Text margin={{ left: '10px', top: '5px' }} size={'12px'}>
            {estudio.detalle}
          </Text>
        </Box>

      </Box>
    );
  }
}

export default Estudio;
