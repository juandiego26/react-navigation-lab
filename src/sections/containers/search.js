import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import API from '../../../utils/api'
import { connect } from 'react-redux'

class Search extends Component {
  state = {
    text: ''
  }
  handleSubmit = async () => {
    // console.log('submit')
    const movies = await API.searchMovie(this.state.text)
    console.log(movies)
    this.props.dispatch({
      type: 'SET_SELECTED_MOVIE',
      payload: {
        movie: movies[0]
      }
    })
  }
  handleChangeText = (text) => {
    this.setState({
      text
    })
  }
  render() {
    return (
      <TextInput
        placeholder="Busca tu película favorita"
        autoCorrect={false}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        onSubmitEditing={this.handleSubmit} // función para manejar el submit
        onChangeText={this.handleChangeText} // cuando cambie el texto
        style={styles.input}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#eaeaea'
  }
})

export default connect(null)(Search)