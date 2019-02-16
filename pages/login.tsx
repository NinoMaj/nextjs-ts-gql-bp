import React from 'react';
import { Formik, Field } from 'formik';

import Layout from '../components/Layout';
import { InputField } from '../components/InputField';
import { LoginComponent, MeQuery } from '../generated/apolloComponents';
import Router from 'next/router';
import { meQuery } from '../graphql/user/queries/me';

export default () => {
  return (
    <Layout title="Login page">
      <LoginComponent>
        {login => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              const res = await login({
                variables: data,
                update: (cache, { data }) => {
                  if (!data || !data.login) {
                    return;
                  }

                  cache.writeQuery<MeQuery>({
                    query: meQuery,
                    data: {
                      __typename: 'Query',
                      me: data.login,
                    },
                  });
                },
              });
              if (res && res.data && !res.data.login) {
                setErrors({ email: 'invalid login' });
                return;
              }

              Router.push('/');
            }}
            initialValues={{
              email: '',
              password: '',
            }}
          >
            {({ handleSubmit }: any) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="Email"
                  component={InputField}
                />
                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  component={InputField}
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </Formik>
        )}
      </LoginComponent>
    </Layout>
  );
};
