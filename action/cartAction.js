/* eslint-disable import/prefer-default-export */
import axiosInstance from '../axiosInstance';

export const loadCartAction = () => async (dispatch) => {
  try {
    dispatch({ type: 'load-cart-request' });
    const res = await axiosInstance.get('cart');
    dispatch({ type: 'load-cart-success', payload: res });
  } catch (error) {
    dispatch({ type: 'load-cart-failure', payload: error });
  }
};

export const addToCartAction = (item) => async (dispatch) => {
  try {
    dispatch({ type: 'add-cart-request' });
    const res = await axiosInstance.post('cart', {
      ...item,
      quantity: 1,

    });
    dispatch({ type: 'add-cart-success', payload: res });
  } catch (error) {
    dispatch({ type: 'add-cart-failure', payload: error });
  }
};

export const updateToCartAction = (item) => async (dispatch) => {
  try {
    dispatch({ type: 'update-cart-request' });
    const res = await axiosInstance.put(`cart/${item.id}`, item);
    dispatch({ type: 'update-cart-success', payload: res });
  } catch (error) {
    dispatch({ type: 'update-cart-failure', payload: error });
  }
};

export const deleteFromCartAction = (item) => async (dispatch) => {
  try {
    dispatch({ type: 'delete-cart-request' });
    await axiosInstance.delete(`cart/${item.id}`);
    dispatch({ type: 'delete-cart-success', payload: item });
  } catch (error) {
    dispatch({ type: 'delete-cart-failure', payload: error });
  }
};
