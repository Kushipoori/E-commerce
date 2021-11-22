/* eslint-disable react/prop-types */
import { Formik, Field } from 'formik';
import React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import './LoginStyle.css';
import Typography from '@mui/material/Typography';
import axiosInstance from '../axiosInstance';
import LoginInput from './LoginInput';
import saveUserDetails from '../Utils/index';

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

const Login = ({ history }) => {
  const onLogin = async (values, action) => {
    try {
      // const res = await fetch('http://localhost:3000/login', {
      //   method: 'POST',
      //   body: JSON.stringify(values),
      //   headers: {
      //     'Content-type': 'application/json',
      //     Accept: 'application/json',
      //   },

      // });
      const res = await axiosInstance.post('login', values);
      await wait(3000);
      // const data = await res.json(values);
      // if (!res.ok) throw new Error(data);
      console.log(res.data);
      saveUserDetails(res);
      action.resetForm();
      history.go(0);
    } catch (error) {
      action.setError({ serverError: error });
    }
  };
  return (
    <div className="login-container">
      <Paper style={{
        flex: 1,
        maxWidth: 500,
        padding: 20,
      }}
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(value) => {
            const errors = {}; if (!value.email) errors.email = 'Email is required...';
            if (!value.password) errors.password = 'Password is required';
            return errors;
          }}
          onSubmit={onLogin}
        >
          {({ handleSubmit, errors, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              {!!errors.serverError && <h1>{errors.serverError}</h1>}
              <Field name="email" component={LoginInput} label="email" />
              <Field name="password" component={LoginInput} label="Password" type="password" />
              <Button disabled={isSubmitting} type="submit" variant="contained" fullWidth>Login</Button>
              <Typography>
                Not a User?
                <a href="/register">Register</a>
              </Typography>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default Login;
