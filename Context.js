/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

class ThemeProvider extends Component {
    state ={
      theme: 'dark',
    }

    render() {
      const { children } = this.props;
      const { theme } = this.state;
      return (
        <ThemeContext.Provider value={{
          theme,
          ChangeTheme: (newTheme) => { this.setState({ theme: newTheme }); },
        }}
        >
          {children}
        </ThemeContext.Provider>
      );
    }
}
export default ThemeProvider;
