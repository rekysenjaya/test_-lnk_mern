import * as actionTypes from './actionTypes'

export const actionLogin = (data) => {
  return (dispatch, getState) => {
  }
}

export const signupAction = (data) => {
  const { name, username, email, password, phone, cityId } = data
  return (dispatch) => {
  };
};

export const storeUpdate = (data) => ({
  type: actionTypes.AUTH_STORE,
  data
})