import { GET_PRODUCTS, CREATE_PRODUCT } from './constants';


export function get_products (data) {
  return {
    type: GET_PRODUCTS,
    data
  };
};

export function create_product (data) {
  return {
    type: CREATE_PRODUCT,
    data
  };
};