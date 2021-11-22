/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { TextField } from '@mui/material';

const RegisterInput = ({ field, form: { errors, touched }, ...rest }) => (
  <TextField
    {...field}
    error={errors[field.name] && touched[field.name]}
    style={{ marginBottom: 15 }}
    variant="outlined"
    fullWidth
    {...rest}
  />

);

export default RegisterInput;
