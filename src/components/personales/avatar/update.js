import Avatar from 'react-avatar-edit';
import { Box, Button, Heading, ResponsiveContext } from 'grommet/es6';
import LoadingButton from '../../loadingButton';
import { base64ToImage } from './helpers';
import theme from '../../../utils/theme';

import React, { Component } from 'react';
import { Layer } from 'grommet';

const BRAND_COLOR = theme.global.colors['brand'];

class UploadAvatar extends Component {
  state = {
    preview: null,
  };

  componentDidMount() {
    const preview = this.props.avatar;
    this.setState({ preview });
  }

  render() {
    const onCropAvatar = (preview) => {
      this.setState({ preview });
    };

    const onCloseAvatar = () => {
      this.setState({ preview: null });
    };

    const cancelar = () => {
      this.props.updateParentState('mostrarUploadAvatar', false);
    };

    const { idUser, mutation, loading } = this.props;
    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Layer position="center" full={false} onClickOutside={cancelar}>
            <Box
              overflow="scroll"
              style={{ borderBottom: `solid 1px ${BRAND_COLOR}`, color: `${BRAND_COLOR}` }}
              direction={'row'}
              justify="center"
              fill="horizontal"
            >
              <Heading alignSelf="center" margin="xsmall" textAlign="center" level="4">
                Foto de Perfil
              </Heading>
            </Box>
            <Box
              align="center"
              direction={size === 'xsmall' ? 'column' : 'row'}
              alignSelf="center"
              alignContent="center"
              justify="center"
              width={size === 'small' ? 'large' : 'large'}
              pad="medium"
              gap="small"
              style={{ alignItems: 'center' }}
            >
              <Avatar
                label="Seleecioná una foto"
                width={190}
                height={190}
                onCrop={onCropAvatar}
                onClose={onCloseAvatar}
              />

              <img alt="" style={{ width: '150px', height: '150px' }} src={this.state.preview} />
            </Box>
            <Box
              direction="row"
              justify="between"
              margin={{ top: 'medium', bottom: 'meddium' }}
              pad="xsmall"
              style={{ borderTop: `solid 1px ${BRAND_COLOR}` }}
              gap="small"
            >
              <Button type="reset" label={'Cancelar'} onClick={cancelar} />
              <LoadingButton
                type="submit"
                reverse
                loading={loading}
                primary
                label={'Cambiar imagen de perfil'}
                onClick={() => {
                  mutation({
                    variables: {
                      file: base64ToImage(this.state.preview),
                      idUser,
                    },
                    refetchQueries: [this.props.queryToRefetch],
                    onCompleted: cancelar(),
                  });
                }}
              />
            </Box>
          </Layer>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default UploadAvatar;
