import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reduxThunk from 'redux-thunk'

import auth from '../reducers/reducerAuth'

const config = {
  key: 'lnk-storege',
  storage,
  whitelist: ['auth'],
}

const rootReducers = combineReducers({
  auth,
})

const reducers = persistReducer(config, rootReducers)
const store = createStore(reducers, {}, compose(applyMiddleware(reduxThunk)))
const persistor = persistStore(store)

const configureStore = () => {
  return { persistor, store }
}

export default configureStore;
