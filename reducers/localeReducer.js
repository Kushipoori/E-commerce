const initialLocaleState = 'en';

const localeReducer = (state = initialLocaleState, { type, payload }) => {
  switch (type) {
    case 'change_locale':
      return payload;

    default:
      return state;
  }
};

export default localeReducer;
