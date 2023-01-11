import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import Routers from './Routers'
import configureStore from './store/configureStore'

import './App.css';

const { persistor, store } = configureStore()

console.disableYellowBox = true;

const Entrypoint = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routers />
      </PersistGate>
    </Provider>
  )
}

export default Entrypoint