import axios from 'axios'
import * as actionTypes from './actionTypes'
import Config from '../constants/Config'

export const getProfile = () => {
  return (dispatch, getState) => {

    const { token } = getState().auth

    dispatch(storeUpdate({ authStatus: 'loading' }))
    axios
      .get(Config.API_URL + 'users/profile', {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        }
      })
      .then((response) => {
        console.log(response, '====data');
        if (response.data.success) {
          dispatch(storeUpdate({ authStatus: 'success' }))
        } else {
          dispatch(storeUpdate({ authStatus: 'error' }))
        }
      })
      .catch((error) => {
        console.log(error, '===errro');
        dispatch(storeUpdate({ authStatus: 'catch' }))
      });
  }
}

export const signOut = () => {
  return (dispatch, getState) => {

    const { idTimestamp, token } = getState().auth

    if (!idTimestamp) {
      return
    }

    axios
      .put(Config.API_URL + 'users/signout/' + idTimestamp, {}, {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        }
      })
      .then((response) => {
        dispatch(storeUpdate({ token: null, name: null, username: null, authStatus: null, idTimestamp: null }))
        console.log(response, '====data');
      })
      .catch((error) => {
        console.log(error, '===errro');
      });
  }
}

export const actionLogin = (data) => {
  return (dispatch, getState) => {

    axios
      .post(Config.API_URL + 'users/signin', data)
      .then((response) => {
        console.log(response, '====data');
        if (response.data.success) {
          dispatch(storeUpdate({ signinStatus: 'success', ...response.data.data }))
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