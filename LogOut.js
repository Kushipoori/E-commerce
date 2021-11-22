/* eslint-disable react/prop-types */
import React from 'react';

const LogOut = (props) => {
  const clearUserDetails = () => {
    sessionStorage.clear();
    localStorage.clear();
    props.history.replace('/login');
    props.history.go(0);
  };
  return (
    <div>
      <h2>Are you sure you want to log out?</h2>
      <button type="button" onClick={clearUserDetails}>logout</button>
      {' '}
      <button type="button" onClick={() => { props.history.replace('/'); }}>cancel</button>
    </div>
  );
};

export default LogOut;
