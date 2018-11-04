import React, {Component} from 'react';
import { Text, View } from 'react-native';
import Home from './src/screens/containers/home'
import Header from './src/sections/components/header'
import SuggestionList from './src/videos/containers/suggestion-list'
import API from './utils/api'
import CategoryList from './src/videos/containers/category-list'
import Player from './src/player/containers/player'

// console.disableYellowBox = true // para deshabilitar las advertencias en el localhos:8081/debugger-ui

export default class App extends Component {
  state = {
    suggestionList: [],
    categoryList: [],
    loadingCategories: true,
    loadingSuggestions: true
  }

  async componentDidMount() {
    const movies = await API.getSuggestion(10)
    const categories = await API.getMovies()
    console.log(movies)
    console.log(categories)
    this.setState({
      suggestionList: movies,
      categoryList: categories,
      loadingCategories: false,
      loadingSuggestions: false
    })
  }
  render() {
    return (
      <Home>
        <Header />
        <Player />
        <Text>Buscador</Text>
        <CategoryList
          list={this.state.categoryList}
          loading={this.state.loadingCategories}
        />
        <SuggestionList
          list={this.state.suggestionList}
          loading={this.state.loadingSuggestions}
        />
      </Home>
    );
  }
}
