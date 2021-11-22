import React, { createContext, Component } from 'react';
import axiosInstance from '../axiosInstance';

export const CartContext = createContext();

export default class CartProvider extends Component {
  state = {

    cart: [],

  };

  async componentDidMount() {
    try {
      const res = await axiosInstance.get('660/cart');
      this.setState({
        cart: res,
      });
    } catch (error) {
      // this.setState({
      //   error,
      // });
    }
  }

  addToCart = async (item) => {
    const processType = 'ADD';
    try {
      const res = await axiosInstance.post('cart', {
        ...item,
        quantity: 1,
      });
      this.setState(({ cart, status }) => ({
        cart: [...cart, res],
      }));
    } catch (error) {
      //   this.setState(({ status }) => ({
      //     error,
      //   }));
    }
  };

  updateCart = async (item) => {
    try {
      const res = await axiosInstance.put(`cart/${item.id}`, item);
      this.setState(({ cart }) => {
        const index = cart.findIndex((x) => x.id === item.id);
        return {
          cart: [...cart.slice(0, index), res, ...cart.slice(index + 1)],
        };
      });
    } catch (error) {
      //   this.setState({ error });
    }
  };

  deleteItem = async (item) => {
    try {
      await axiosInstance.delete(`cart/${item.id}`);
      this.setState(({ cart }) => {
        const index = cart.findIndex((x) => x.id === item.id);
        return {
          cart: [...cart.slice(0, index), ...cart.slice(index + 1)],
        };
      });
    } catch (error) {
      //   this.setState({ error });
    }
  };

  render() {
    const { cart } = this.state;
    return (
      <CartContext.Provider
        value={{
          addToCart: this.addToCart,
          updateCart: this.updateCart,
          deleteItem: this.deleteItem,
          cart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
