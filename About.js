/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeContext } from './Context';

const About = (props) => (
  <div>
    About Page
    <button
      type="button"
      onClick={() => {
        props.history.push('/contact');
      }}
    >
      Goto Contact

    </button>
    <ThemeContext.Consumer>
      {(val) => (
        <div>
          <h1>{val.theme}</h1>
          <button type="button" onClick={() => { val.ChangeTheme('Light'); }}>Change theme</button>
        </div>
      )}

    </ThemeContext.Consumer>
  </div>
);

export default About;
