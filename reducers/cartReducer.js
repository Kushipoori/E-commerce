const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'load-cart-request':
      return { ...state, loading: true };
    case 'load-cart-success':
      return { ...state, loading: false, data: payload };
    case 'load-cart-failure':
      return { ...state, loading: false, error: payload };
    case 'add-cart-request':
      return { ...state, loading: true };
    case 'add-cart-success':
      return { ...state, loading: false, data: [...state.data, payload] };
    case 'add-cart-failure':
      return { ...state, loading: false, error: payload };
    case 'update-cart-request':
      return { ...state, loading: true };
    case 'update-cart-success': {
      const index = state.data.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        loading: false,
        data: [...state.data.slice(0, index), payload, ...state.data.slice(index + 1)],
      };
    }
    case 'update-cart-failure':
      return { ...state, loading: false, error: payload };
    case 'delete-cart-request':
      return { ...state, loading: true };
    case 'delete-cart-success': {
      const index = state.data.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        loading: false,
        data: [...state.data.slice(0, index), ...state.data.slice(index + 1)],
      };
    }
    case 'delete-cart-failure':
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
