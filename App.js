import React, {Component} from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor }from './store'

import Loading from './src/sections/components/loading'
import AppLayout from './src/app'
import AppNavigatorWithState from './src/app-navigator-with-state'

// console.disableYellowBox = true // para deshabilitar las advertencias en el localhos:8081/debugger-ui
export default class App extends Component {
  render() {
    return (
      <Provider
        store={store}
      >
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
        >
          <AppNavigatorWithState />
        </PersistGate>
      </Provider>
    );
  }
}
