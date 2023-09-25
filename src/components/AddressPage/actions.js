// actions.js
import axios from 'axios';

export const fetchAddresses = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:8080/address');
      dispatch(fetchAddressesSuccess(response.data));
    } catch (error) {
      dispatch(fetchAddressesFailure(error));
    }
  };
};

export const fetchAddressesSuccess = (addresses) => ({
  type: 'FETCH_ADDRESSES_SUCCESS',
  payload: addresses,
});

export const fetchAddressesFailure = (error) => ({
  type: 'FETCH_ADDRESSES_FAILURE',
  payload: error,
});
