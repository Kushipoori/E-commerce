import axiosInstance from '../axiosInstance';

export const loadProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: 'load-products-request' });
    const res = await axiosInstance.get('products');
    dispatch({ type: 'load-products-success', payload: res });

    console.log('res', res);
  } catch (error) {
    dispatch({ type: 'load-products-failure', payload: error });
  }
};
