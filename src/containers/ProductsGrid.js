import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {DELETE_PRODUCT, FETCH_PRODUCTS} from '../constants.js';
import DataTable from '../components/DataTable';


class ProductsGrid extends Component {
  constructor (props){
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount (){
    this.props.get_products();
  }
  handleDelete (name){
    this.props.deleteProduct(name);
  }

  render () {
    return <DataTable handleDelete={this.handleDelete}
                      products={this.props.products}
      />;
  }
}

function mapStateToProps (state) {
  return {
      products: state.products
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (name) => dispatch({type: DELETE_PRODUCT, name}),
    get_products: () => dispatch({type: FETCH_PRODUCTS})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsGrid);
