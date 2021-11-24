/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
// import './headerStyle.css';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { connect } from 'react-redux';
import { CartContext } from '../Context/cartContext';

const token = sessionStorage.getItem('token');

const Header = ({ routes, cart }) => (
  <AppBar position="sticky">
    <Toolbar style={{ alignItems: 'center' }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Kushal
      </Typography>
      {token && routes
        .filter((x) => x.isAuthRequired)
        .map((x) => (
          <Button key={x.name} color="inherit">
            <Link style={{ textDecoration: 'none', color: 'white', mr: 2 }} to={x.path}>
              {x.title}
            </Link>
          </Button>
        ))}
      {!token && routes
        .filter((x) => !x.isAuthRequired)
        .map((x) => (
          <Button key={x.name} color="inherit">
            <Link style={{ textDecoration: 'none', color: 'white', mr: 2 }} to={x.path}>
              {x.title}
            </Link>
          </Button>
        ))}

      {token && (
      <>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Badge badgeContent={cart.reduce((p, c) => p + c.quantity, 0)} color="error">
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/cart">
              <ShoppingCartIcon />
            </Link>
          </Badge>
        </IconButton>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {/* <a href="logout" > */}
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/logout">
            {' '}
            <LogoutIcon />
            {' '}
            {/* </a> */}
          </Link>

        </IconButton>

      </>
      )}
    </Toolbar>
  </AppBar>
);
const mapStateToProps = (store) => ({ cart: store.cart.data });

export default connect(mapStateToProps)(Header);
