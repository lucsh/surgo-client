import React, { Component, Fragment } from 'react';
import { Box } from 'grommet/es6/components/Box';
import { Anchor, Button, Menu, Paragraph, Text } from 'grommet/es6';
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

    const { estudio, editando } = this.props;
    const desde = moment(estudio.desde).format('Y');
    let hasta = moment(estudio.hasta);
    // hasta = hasta.isValid() ? hasta.format('Y') : 'En Curso';

    let estado = estudio.estado;
    if (estado === 'Inconcluso' || estado === '') {
      estado = 'Inconcluso';
    }
    if (hasta.isValid()) {
      hasta = hasta.format('Y');
    } else {
      hasta = '';
      estado = 'En Curso';
    }

    const elevation = editando ? 'large' : 'xsmall';
    return (
      <Box
        alignContent="start"
        justify="start"
        align="start"
        direction="column"
        pad="medium"
        margin={{ top: '15px' }}
        width="large"
        elevation={elevation}
      >
        <Box
          align="center"
          justify="between"
          direction={'row'}
          width="large"
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
            <Text size={'xsmall'} weight={'bold'} color={'#7C8284'}>
              {estudio.instituto}{' '}
              <Text size={'xsmall'} weight={300} color={'#7C8284'}>
                ({desde} - {hasta})
              </Text>
              <Text size={'10px'} weight={300} color={'#7C8284'}>
                {' '}
                {estado}
              </Text>
            </Text>
            <Menu
              size="small"
              icon={<More size="small" />}
              items={[
                {
                  label: 'Editar',
                  onClick: () => {
                    this.props.editar(estudio);
                  },
                },
                {
                  label: 'Eliminar',
                  onClick: () => {
                    this.props.eliminar(estudio);
                  },
                },
              ]}
            />
          </Box>
        </Box>
        <Box
          style={{ borderLeft: `2px dotted ${BRAND_COLOR}` }}
          margin={{ left: '3px' }}
          align="start"
          direction={'row-responsive'}
          gap={'none'}
          pad={'none'}
        >
          <Text margin={{ left: '10px', top: '5px', bottom: '10px' }} size={'12px'}>
            {estudio.detalle}
          </Text>
        </Box>
      </Box>
    );
  }
}

export default Estudio;
