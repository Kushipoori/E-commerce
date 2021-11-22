/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import route from './route';
import NotFound from './NotFound';
import Header from './Header/index';
import CartProvider from './Context/cartContext';
import LogOut from './LogOut';
import Cart from './Cart';

// import NavAppBar from './NavAppBar';

class App extends Component {
      state={
        isAuthenticated: false,
      }

      componentDidMount() {
        const token = sessionStorage.getItem('token');
        this.setState({
          isAuthenticated: !!token,
        });
      }

      render() {
        const { isAuthenticated } = this.state;
        return (
          <BrowserRouter>
            <CartProvider>
              <div>
                <Header routes={isAuthenticated ? route.filter((x) => x.isAuthRequired) : route.filter((x) => !x.isAuthRequired)} />
                <main>
                  <Switch>
                    {!isAuthenticated
             && route
               .filter((x) => !x.isAuthRequired)
               .map(({ ...rest }) => (
                 <Route
                   key={rest.path}
                   {...rest}
                 />
               ))}

                    {isAuthenticated
          && route
            .filter((x) => x.isAuthRequired)
            .map(({ ...rest }) => (

              <Route key={rest.path} {...rest} />

            ))}
                    {' '}
                    <Route path="/cart" component={Cart} />
                    <Route path="/logout" component={LogOut} />

                    <Route component={NotFound} />

                  </Switch>
                </main>

              </div>
            </CartProvider>
          </BrowserRouter>
        );
      }
}

export default App;
