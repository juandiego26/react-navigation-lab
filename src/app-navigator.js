import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from './screens/containers/home'
import Movie from './screens/containers/movie'

const Main = createStackNavigator(
  {
    Home: Home,
    Movie: Movie
  }
)

const App = createAppContainer(Main)

export default App
