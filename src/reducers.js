import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { get_products, create_product } from './actions';
import Rx from 'rxjs';
import {
  SHOW_HIDE_MODAL,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  HANDLE_FORM_CHANGE,
  FETCH_PRODUCTS,
  POST_PRODUCT,
  GET_PRODUCTS,
  URL_BACKEND
} from './constants';

function modal (state = {modal_state: false}, action) {
  switch (action.type) {
    case SHOW_HIDE_MODAL:
      return {...state, modal_state: action.modal_state};
    default:
      return state;
  }
}

function products (state = [], action) {
  switch (action.type) {
    case CREATE_PRODUCT:
      return [...state, action.data];
    case GET_PRODUCTS:
      return [...state, ...action.data];
    case DELETE_PRODUCT:
      return state.filter(product => product.name !== action.name);
    default:
      return state;
  }
}

function form_management (state = {valid: false}, action) {
  switch (action.type) {
    case HANDLE_FORM_CHANGE:
      return {valid: action.valid};
    default:
      return state;
  }
}


const fetchProductsEpic = action$ =>
  action$.ofType(FETCH_PRODUCTS)
    .mergeMap(action =>
      Rx.Observable.ajax.getJSON(`${URL_BACKEND}/product/`)
        .map(response => get_products(response))
    );

const postProductEpic = action$ =>
  action$.ofType(POST_PRODUCT)
    .mergeMap(action =>
      Rx.Observable.ajax.post(`${URL_BACKEND}/product/`, action.data)
        .map(response => create_product(response.response))
    );

export const rootEpic = combineEpics(
  fetchProductsEpic,
  postProductEpic,
);

export const rootReducer = combineReducers({
  modal,
  products,
  form_management
});

