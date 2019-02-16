import React from "react";
import { Formik, Field } from "formik";

import Layout from "../components/Layout";
import { InputField } from "../components/InputField";
import { ChangePasswordComponent } from "../generated/apolloComponents";
import Router from "next/router";
import { NextContext } from "next";

const ChangePassword = ({ token }: { token: string }) => {
  return (
    <Layout title="Change Password page">
      <ChangePasswordComponent>
        {changePassword => (
          <Formik
            onSubmit={async data => {
              const res = await changePassword({
                variables: {
                  data: {
                    password: data.password,
                    token
                  }
                }
              });
              Router.push("/");
            }}
            initialValues={{
              password: ""
            }}
          >
            {({ handleSubmit }: any) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="password"
                  placeholder="Password"
                  component={InputField}
                  type="password"
                />
                <button type="submit">Change password</button>
              </form>
            )}
          </Formik>
        )}
      </ChangePasswordComponent>
    </Layout>
  );
};

ChangePassword.getInitialProps = ({
  query: { token }
}: NextContext<{ token: string }>) => {
  return { token };
};

export default ChangePassword;
