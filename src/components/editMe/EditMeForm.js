import React, { Fragment } from 'react';
import { Formik } from 'formik';
import { Query, Mutation } from 'react-apollo';
import { Button, FormField, TextInput } from 'grommet/es6'
import ErrorComponent from '../error';

const userAddWithSuccess = () => {
  console.log('DONE');
};

const UserAddForm = ({ query, mutation }) => (
  <Query query={query}>
    {(respuesta) => {
      if (respuesta.loading) return <p>Cargando...</p>;
      if (respuesta.data && respuesta.data.meData === null) {
        return <ErrorComponent />;
      }
      if (!respuesta.error) {
        // console.log(respuesta.data);
        const { meData } = respuesta.data;
        // this.setState({ meData });
        return (
          <Mutation mutation={mutation}>
            {(editMe, { loading, error, data }) => (
              <Fragment>
                {loading && <p>loading...</p>}
                {error && <p>error...</p>}
                {data && data.editMe && <p>done...</p>}
                <Formik
                  initialValues={{
                    first_name: meData.nombre,
                  }}
                  onSubmit={(values) => {
                    // log submit status
                    editMe({
                      variables: {
                        firstName: values.first_name,
                      },
                    });
                  }}
                  render={({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <FormField style={{ margin: '15px' }} label="NOMBRE" >
                        <TextInput
                          id={'first_name'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.first_name}
                        />
                      </FormField>
                      {touched.first_name && errors && errors.first_name && (
                        <div className="user-submit-error-block">{errors.first_name}</div>
                      )}

                      <div className="user-submit-block">
                        <Button className="user-submit-button" type="submit" primary>
                          Submit
                        </Button>
                      </div>
                    </form>
                  )}
                />
              </Fragment>
            )}
          </Mutation>
        );
      }
      return null;
    }}
  </Query>
);

// prop type validation
UserAddForm.propTypes = {
};

// default prop
UserAddForm.defaultProps = {
};

export default UserAddForm;
