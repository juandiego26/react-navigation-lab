import React, { Component } from 'react'
import { FlatList, Text } from 'react-native'
import Layout from '../components/suggestion-list-layout'
import Empty from '../components/empty'
import Separator from '../components/vertical-separator'
import Suggestion from '../components/suggestion'
import Loader from '../../loader/components/loader'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    list: state.suggestionList
  }
}

class SuggestionList extends Component {
  keyExtractor = item => item.id.toString()
  renderEmpty = () => <Empty text="No hay sugerencias :(" />
  itemSeparator = () => <Separator />
  viewMovie = (item) => {
    this.props.dispatch({
      type: 'SET_SELECTED_MOVIE',
      payload: {
        movie: item
      }
    })
  }
  renderItem = ({item}) => {
    return (
      <Suggestion
        {...item}
        onPress={() => {  this.viewMovie(item)  }}
      />
    )
  }
  render() {
    return (
      <Layout
        title="Recomendado para ti"
      >
      {this.props.loading ?
        (<Loader />) :
        (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.list}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.itemSeparator}
            renderItem={this.renderItem}
          />
        )
      }
      </Layout>
    )
  }
}

export default connect(mapStateToProps)(SuggestionList)
