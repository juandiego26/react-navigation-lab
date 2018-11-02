import React, {Component} from 'react';
import { Text } from 'react-native';
import Home from './src/screens/containers/home'
import Header from './src/sections/components/header'
import Loader from './src/loader/components/loader'
import SuggestionList from './src/videos/containers/suggestion-list'
import API from './utils/api'

// console.disableYellowBox = true // para deshabilitar las advertencias en el localhos:8081/debugger-ui

export default class App extends Component {
  state = {
    suggestionList: [],
    loading: true // Esto nos indica cuando la lista de la api este cargando
  }

  async componentDidMount() {
    const movies = await API.getSuggestion(10)
    console.log(movies)
    this.setState({
      suggestionList: movies,
      loading: false // cuando los datos son renderizados cambia el estado del loader
    })
  }
  render() {
    return (
      <Home>
        <Header />
        <Text>Buscador</Text>
        <Text>Categorías</Text>
        {this.state.loading ?
          (<Loader />) :
          (
          <SuggestionList
            list={this.state.suggestionList}
          />
          )
        }
      </Home>
    );
  }
}
