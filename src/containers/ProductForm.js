import React, { Component } from 'react';
import { connect } from 'react-redux';

import InputValidation from './InputValidation';
import Checkbox from 'react-toolbox/lib/checkbox';

import ModalForm from '../components/ModalForm';

import {
  POST_PRODUCT,
  SHOW_HIDE_MODAL,
} from '../constants';

const ProductModel = () => {
  return {
    name: '',
    color: []
  };
};

class ProductForm extends Component {
  constructor(props){
    super()
    this.state = new ProductModel();
    this.pristineForm = true;
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm (e){
    this.pristineForm = true;
    if (this.state.name.length === 0){
      return;
    }
    this.setState({...new ProductModel()});
    this.props.addProduct(this.state);

  }

  handleChange = (field, value) => {
    this.pristineForm = value.length === 0;
    this.setState({...this.state, [field]: value});
  };
  handleChangeColor = (color_value, value) => {
    let state_color = this.state.color;
    if (value){
      state_color.push(color_value);
    } else {
      state_color = state_color.filter(el => el !== color_value);
    }
    this.setState({...this.state, 'color': state_color});
  };
  render () {
    const props = this.props;
    return (
      <ModalForm pristineForm={this.pristineForm}
                 show={props.show}
                 hideModal={props.hideModal}
                 submitForm={this.submitForm}
                 valid={props.valid}
      >
        <InputValidation type='text'
               label='Name'
               name='name'
               maxLength={8}
               value={this.state.name}
               validators={['minLength4', 'onlyNumbersLetters']}
               onChange={this.handleChange.bind(this, 'name')}
          />
          {
            ['red', 'green', 'blue'].map(color_val=>
              <Checkbox key={color_val}
                        checked={this.state.color.indexOf(color_val) > -1}
                        label={color_val}
                        onChange={this.handleChangeColor.bind(this, color_val)}
              />
            )
          }
      </ModalForm>
    );

  }
}


const mapStateToProps = (state) => {
  return {
    show: state.modal.modal_state,
    valid: state.form_management.valid
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => {
      dispatch({type: SHOW_HIDE_MODAL, modal_state: false});
    },
    addProduct: (data) => {
      dispatch({type: POST_PRODUCT, data});
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
