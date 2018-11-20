import React, { Component } from 'react'
import { FlatList } from 'react-native'
import Empty from '../components/empty'
import Separator from '../../sections/components/horizontal-separator'
import Category from '../components/category'
import Layout from '../components/category-list-layout'
import Loader from '../../loader/components/loader'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  // debugger
  return {
    list: state.videos.categoryList
  }
}

class CategoryList extends Component {
  keyExtractor = item => item.id.toString()
  renderEmpty = () => <Empty text="No hay sugerencias :(" />
  itemSeparator = () => <Separator />
  renderItem = ({item}) => {
    return (
      <Category {...item}/>
    )
  }
  render() {
    return (
      <Layout
        title="Categorias"
      >
      {this.props.loading ?
        (<Loader />) :
        (
          <FlatList
            horizontal
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

export default connect(mapStateToProps)(CategoryList)
