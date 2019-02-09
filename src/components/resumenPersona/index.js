import React, { Component } from 'react';
import { Box } from 'grommet/es6/components/Box';
import { Anchor, Heading, ResponsiveContext, Text } from 'grommet/es6';
import moment from 'moment';

import pluralize from '../../utils/pluralize';
import theme from '../../utils/theme';

const SECONDARY_COLOR = theme.global.colors['secondary'];

class ResumenPersona extends Component {
  render() {
    const { persona } = this.props;

    let desde;
    if (persona.trabajoActual) {
      desde = moment(persona.trabajoActual.desde);
      if (desde.isValid()) {
        desde = desde.format('Y');
      } else {
        desde = null;
      }
    }
    const hijos = pluralize(persona.hijos, 'hijo', 'hijos');

    return (
      <ResponsiveContext.Consumer>
        {(size) => {
          let width = 'large';
          let pad = 'none';
          switch (size) {
            case 'xsmall':
              width = 'small';
              break;
            case 'small':
              width = 'medium';
              pad = 'xsmall';
              break;
            default:
              break;
          }
          return (
            <Box
              align="center"
              justify="center"
              gap="large"
              direction="row-responsive"
              fill="horizontal"
            >
              <Box width={width} pad={pad}>
                <Heading
                  margin={{ vertical: 'xsmall' }}
                  textAlign="start"
                  alignSelf="start"
                  level={2}
                >
                  {persona.nombre} {persona.apellido}
                </Heading>
                <Box width={width} pad="small">
                  <Text size="14px">
                    <Anchor href={`mailto:${persona.email}`} label={persona.email} />
                  </Text>
                  {persona.trabajoActual ? (
                    <Text margin={{ vertical: 'xsmall' }} style={{ fontSize: '18px' }}>
                      {persona.trabajoActual.puesto}{' '}
                      <span style={{ fontSize: '12px', color: SECONDARY_COLOR }}>
                        {persona.trabajoActual.empresa} ({desde} - )
                      </span>
                    </Text>
                  ) : (
                    <Text margin={{ vertical: 'xsmall' }} style={{ fontSize: '16px', fontWeight: '600', color: SECONDARY_COLOR }}>
                      Desocupado
                    </Text>
                  )}
                  <Text>
                    {persona.direccion.calle} {persona.direccion.numero} -{' '}
                    {persona.direccion.localidad.nombre}, {persona.direccion.localidad.codigoPostal}
                    . <Anchor href={`tel:${persona.telefono}`} label={persona.telefono} />
                  </Text>
                  <Text style={{ fontStyle: 'italic', fontSize: '12px' }}>
                    De {persona.paisOrigen}, {persona.edad} años, {persona.estadoCivil}, {hijos}
                  </Text>
                </Box>
              </Box>
            </Box>
          );
        }}
      </ResponsiveContext.Consumer>
    );
  }
}

export default ResumenPersona;
