import React from 'react';
import ReactDOM from 'react-dom';
// import WeatherComponent from './WeatherComp/WeatherComponent';
// import ToDo from './src/ToDo';
import { Provider } from 'react-redux';
import store from './configureStore/configureStore';
import ThemeProvider from './Context';
import App from './App';

ReactDOM.render(<Provider store={store}><ThemeProvider><App /></ThemeProvider></Provider>, document.getElementById('root'));
