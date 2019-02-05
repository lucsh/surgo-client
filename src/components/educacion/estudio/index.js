import React, { Component } from 'react';
import { Box } from 'grommet/es6/components/Box';
import { Menu, ResponsiveContext, Text } from 'grommet/es6';
import moment from 'moment';
import theme from '../../../utils/theme';
import { More } from 'grommet-icons';
import { READ_ESTUDIOS } from '../../../pages/cuenta/constants';

class Estudio extends Component {
  render() {
    const BRAND_COLOR = theme.global.colors['brand'];

    const eliminar = (value, mutation) => {
      mutation({
        variables: { id: value.id, idUser: value.idUser },
        refetchQueries: [{ query: READ_ESTUDIOS, variables: { idUser: value.idUser } }],
      });
    };

    const { estudio, editando, mutation } = this.props;
    const desde = moment(estudio.desde).format('Y');
    let hasta = moment(estudio.hasta);

    let estado = estudio.estado;
    if (estado === 'Incompleto' || estado === '') {
      estado = 'Incompleto';
    }
    if (hasta.isValid()) {
      hasta = hasta.format('Y');
    } else {
      hasta = null;
      estado = 'En Curso';
    }

    const elevation = editando ? 'large' : 'xsmall';
    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            alignContent="start"
            justify="start"
            align="start"
            direction={'column'}
            pad="medium"
            margin={{ top: '15px' }}
            width="large"
            elevation={elevation}
          >
            <Box
              align="start"
              justify="between"
              direction={size === 'xsmall' ? 'column' : 'row'}
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
              <Box
                align="center"
                direction={size === 'xsmall' ? 'column' : 'row'}
                gap={'none'}
                pad={'none'}
                justify={size === 'xsmall' ? 'start' : 'end'}
              >
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
                        eliminar(estudio, mutation);
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
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default Estudio;
