import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { connect } from 'react-redux';
import { HANDLE_FORM_CHANGE } from '../constants.js';

class InputValidation extends Component {
  error = '';

  validate (props, value){
    let validators = [];
    if ('validators' in props) {
      validators = props.validators;
    }
    if (validators.indexOf('required') > -1) {
      if (value) {
        return {'input_data': ' ', 'error': 'Required'};
      }
    }
    if (validators.indexOf('onlyNumbersLetters') > -1 && value.length > 0) {
      if (/^[a-z0-9]+$/i.exec(value) === null) {
        return {'input_data': props.value,
                'error': 'Only number and letter allowed'};
      }
    }
    if (validators.indexOf('minLength4') > -1) {
      if (value.length < 4) {
        return {'input_data': value, 'error': 'Min length is 4 symbols'};
      }
    }
    return {'input_data': value, 'error': ''};
  }

  handleChanges (value) {
    const result = this.validate(this.props, value);
    const error = result.error;
    this.error = error;
    const valid = error.length > 0 ? false : true;
    this.props.dispatch({type: HANDLE_FORM_CHANGE, valid});
    this.props.onChange(result.input_data);
  }
  render () {
    const defProps = {...this.props, onChange: this.handleChanges.bind(this)};
    return (<Input {...defProps} error={this.error}/>);
  }
}

export default connect()(InputValidation);
