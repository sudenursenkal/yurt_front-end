// reducers.js
const initialState = {
    addresses: [],
    loading: false,
    error: null,
  };
  
  const addressReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ADDRESSES':
        return { ...state, loading: true, error: null };
      case 'FETCH_ADDRESSES_SUCCESS':
        return { ...state, addresses: action.payload, loading: false, error: null };
      case 'FETCH_ADDRESSES_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default addressReducer;
  