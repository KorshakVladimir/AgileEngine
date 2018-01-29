import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import ProductsMain from './ProductsMain';
export const store = configureStore();
import theme from '../assets/react-toolbox/theme';
import { ThemeProvider } from 'react-css-themr';

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ProductsMain />
        </ThemeProvider>
      </Provider>
    );
  }
}
