const initialState = {
    data:[],
    loading:false,
    error:null,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'load-products-request':
        return { ...state, loading:true}

    case 'load-products-success':
        return { ...state, loading:false, data: payload}

    case 'load-products-failure':
        return { ...state, loading:false, error: payload}

    default:
        return state
    }
}
