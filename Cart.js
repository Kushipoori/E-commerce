/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import I18n from 'i18n-js';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from 'react-redux';
import {
  loadCartAction, addToCartAction, updateToCartAction, deleteFromCartAction,
} from './action/cartAction';

class Cart extends Component {
    state={
      cart: [],
      error: null,
    }

    async componentDidMount() {
      const { loadCart } = this.props;
      loadCart();
    }

    render() {
      const {
        cartData, updateCart, deleteItem,
      } = this.props;
      return (
        cartData.data.map((item) => (
          <Card key={item.title} sx={{ display: 'flex', margin: 2, minHeight: 200 }}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={item.image}
              alt={item.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Box
                  component="div"
                  overflow="hidden"
                  whiteSpace="pre-line"
                  textOverflow="ellipsis"
                  height={30}
                >
                  <Typography component="div" variant="h5">
                    {item.title}
                  </Typography>
                </Box>
                <Box
                  component="div"
                  overflow="hidden"
                  whiteSpace="pre-line"
                  textOverflow="ellipsis"
                  height={60}
                >
                  <Typography
                    sx={{
                      overflow: 'hidden',
                    }}
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {item.description}
                  </Typography>
                </Box>
                <Rating
                  name="read-only"
                  value={item.rating.rate}
                  precision={0.5}
                  readOnly
                />
                <Typography
                  variant="h6"
                  color="text.secondary"
                  component="div"
                >
                  {I18n.toCurrency(item.price)}
                </Typography>
                {item && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {item.quantity <= 1 ? (
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => deleteItem(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => updateCart({
                          ...item,
                          quantity: item.quantity - 1,
                        })}
                      >
                        <RemoveIcon />
                      </IconButton>
                    )}
                    <Typography component="div" variant="h5">
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ ml: 2 }}
                      onClick={() => updateCart({
                        ...item,
                        quantity: item.quantity + 1,
                      })}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Box>
          </Card>
        ))
      );
    }
}
const mapStateToProps = (store) => ({
  cartData: store.cart,
});

const mapDispatchToProps = (dispatch) => ({
  loadCart: () => loadCartAction()(dispatch),
  addToCart: (item) => addToCartAction(item)(dispatch),
  updateCart: (item) => updateToCartAction(item)(dispatch),
  deleteItem: (item) => deleteFromCartAction(item)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
