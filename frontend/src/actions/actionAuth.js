import axios from 'axios'
import * as actionTypes from './actionTypes'
import Config from '../constants/Config'

export const actionLogin = (data) => {
  return (dispatch, getState) => {
    
    axios
      .post(Config.API_URL + 'users/signin', data)
      .then((response) => {
        console.log(response, '====data');
        if (response.data.success) {
          dispatch(storeUpdate({ signinStatus: 'success' }))
        } else {
          dispatch(storeUpdate({ signinStatus: 'error' }))
        }
      })
      .catch((error) => {
        console.log(error, '===errro');
        dispatch(storeUpdate({ signinStatus: 'catch' }))
      });
  }
}

export const signupAction = (data) => {

  return (dispatch) => {
    axios
      .post(Config.API_URL + 'users', data)
      .then((response) => {
        console.log(response, '====data');
        if (response.data.success) {
          dispatch(storeUpdate({ signupStatus: 'success' }))
        } else {
          dispatch(storeUpdate({ signupStatus: 'error' }))
        }
      })
      .catch((error) => {
        console.log(error, '===errro');
        dispatch(storeUpdate({ signupStatus: 'catch' }))
      });
  };
};

export const storeUpdate = (data) => ({
  type: actionTypes.AUTH_STORE,
  data
})