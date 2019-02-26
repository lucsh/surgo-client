import React, { Component } from 'react';
import reactStringReplace from 'react-string-replace';
import { Box } from 'grommet/es6/components/Box';
import { Menu, ResponsiveContext, Text } from 'grommet/es6';
import moment from 'moment';
import theme from '../../utils/theme/index';
import { Image, More } from 'grommet-icons';
import { READ_TRABAJOS } from '../../pages/cuenta/constants';

class Comentario extends Component {
  render() {
    const BRAND_COLOR = theme.global.colors['brand'];

    const eliminar = (value, mutation) => {
      mutation({
        variables: { id: value.id, idUser: value.idUser },
        refetchQueries: [{ query: READ_TRABAJOS, variables: { idUser: value.idUser } }],
      });
    };

    const { comentario, editando, mutation } = this.props;

    const createdAt = moment(comentario.createdAt).fromNow();

    // ToDo cambiar el span por a con link al filtro

    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            border={'top'}
            alignContent="start"
            justify="start"
            align="start"
            direction={'row'}
            pad="none"
            width="large"
          >
            <Box
              alignContent="start"
              justify="start"
              align="start"
              direction={'row'}
              pad="medium"
              // margin={{ top: '15px' }}
              width="large"
            >
              <Box align="start" pad="small" gap="medium" direction={'column'}>
                <img alt="Foto de perfil" className={'avatar-hito'} src={comentario.thumb} />
              </Box>
              <Box align="start" pad="small" gap="small" direction={'column'}>
                <Box align="start" pad="none" gap="none" direction={'row'}>
                  <Text size={'13px'} color="brand">
                    {comentario.createdBy} · {createdAt}
                  </Text>
                </Box>
                <Box>
                  <Text size={'13px'}>
                    {reactStringReplace(comentario.comentario, /(#\S+\b)/gi, (match, i) => (
                      <span key={i} style={{ color: BRAND_COLOR }}>
                        {match}
                      </span>
                    ))}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default Comentario;
