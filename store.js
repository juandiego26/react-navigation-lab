import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import reducer from './reducers/index'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

// const store = createStore(reducer, {
//   suggestionList: [],
//   categoryList: []
// })

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['selectedMovie']
}

const persistedReducer = persistReducer(persistConfig, reducer)
const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
)

const store = createStore(
  persistedReducer,
  applyMiddleware(navigationMiddleware)
)
const persistor = persistStore(store)

export { store, persistor }
