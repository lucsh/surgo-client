import Avatar from 'react-avatar-edit';
import { Box } from 'grommet/es6';
import LoadingButton from '../../loadingButton';
import { base64ToImage } from './helpers';

import React, { Component } from 'react';

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
    const { idUser, mutation, loading, error } = this.props;

    return (
      <Box align="center" direction={'row-responsive'} alignSelf="center" width="xlarge">
        <Avatar
          label="Seleecioná una foto"
          width={190}
          height={190}
          onCrop={onCropAvatar}
          onClose={onCloseAvatar}
        />

        <img alt="" style={{ width: '150px', height: '150px' }} src={this.state.preview} />
        <Box
          direction="row"
          justify="end"
          margin={{ top: 'medium', bottom: 'meddium' }}
          pad={{ vertical: 'xsmall' }}
        >
          <LoadingButton
            type="submit"
            reverse
            loading={loading}
            primary
            label={'Cambiar imagen de perfil'}
            onClick={() =>
              mutation({
                variables: {
                  file: base64ToImage(this.state.preview),
                  idUser,
                },
              })
            }
          />
        </Box>
      </Box>
    );
  }
}

export default UploadAvatar;
