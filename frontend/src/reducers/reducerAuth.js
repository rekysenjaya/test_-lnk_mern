import * as actionType from '../actions/actionTypes'

const INITIAL_STATE = {
}

const storeAuth = (state, action) => ({ ...state, ...action.data })

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.AUTH_STORE:
      return storeAuth(state, action)
    default:
      return state
  }
}

export default AuthReducer