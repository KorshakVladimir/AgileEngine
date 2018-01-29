import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';

import ProductForm from './ProductForm';
import ProductsGrid from './ProductsGrid';

import { SHOW_HIDE_MODAL } from '../constants';

class ProductsMain extends Component {
  handleClick (){
    this.props.dispatch({type: SHOW_HIDE_MODAL, modal_state: true});
  }

  render () {
    return (
      <div>
        <Button onClick={this.handleClick.bind(this)}
                label="Add Product"
                primary
        />
        <ProductForm/>
        <ProductsGrid/>
      </div>
    );
  }
}

// AsyncApp.propTypes = {
//   selectedSubreddit: PropTypes.string.isRequired,
//   posts: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// }

export default connect()(ProductsMain);
