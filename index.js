import React from 'react';
import ReactDOM from 'react-dom';
// import WeatherComponent from './WeatherComp/WeatherComponent';
// import ToDo from './src/ToDo';
import ThemeProvider from './Context';
import App from './App';

ReactDOM.render(<ThemeProvider><App /></ThemeProvider>, document.getElementById('root'));
