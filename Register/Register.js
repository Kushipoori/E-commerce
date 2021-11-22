/* eslint-disable react/prop-types */
import React from 'react';
// import axios from 'axios';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Formik, Field } from 'formik';
import Typography from '@mui/material/Typography';
import './Register.css';
import RegisterInput from './RegisterInput';
import axiosInstance from '../axiosInstance';

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

const Register = ({ history }) => {
  const onRegister = async (values, action) => {
    console.warn(action);
    const { confirmPassword, ...rest } = values;
    try {
      // const res = await fetch('http://localhost:3000/register', {
      //   method: 'POST',
      //   body: JSON.stringify(values),
      //   headers: {
      //     'Content-type': 'application/json',
      //     Accept: 'application/json',
      //   },
      // });
      const res = await axiosInstance.post('register', rest);
      await wait(2000);
      // const data = await res.json(values);
      // if (!res.ok) throw new Error(data);
      console.log(res.data);

      action.resetForm();
      history.replace('/login');
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
          initialValues={{
            username: '', email: '', contact: '', password: '', confirmPassword: '',
          }}
          validate={(value) => {
            const errors = {};
            if (!value.username) errors.username = 'Username is required...';
            if (!value.password) errors.password = 'Password is required';
            if (!value.email) errors.username = 'Email is required...';
            if (!value.contact) errors.contact = 'Contact is required...';
            if (!value.confirmPassword) errors.confirmPassword = 'Password is required';
            if (value.password !== value.confirmPassword) errors.confirmPassword = 'Password is not same';

            return errors;
          }}
          onSubmit={onRegister}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Field name="username" component={RegisterInput} label="Username" />
              <Field name="contact" component={RegisterInput} label="Contact" type="contact" />
              <Field name="email" component={RegisterInput} label="Email" type="email" />
              <Field name="password" component={RegisterInput} label="Password" type="password" />
              <Field name="confirmPassword" component={RegisterInput} label="Confirm Password" type="password" />
              <Button disabled={isSubmitting} type="submit" variant="contained" fullWidth>Register</Button>
              <Typography>
                Already Registered?
                {' '}
                <a href="/login">Login</a>
              </Typography>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default Register;
