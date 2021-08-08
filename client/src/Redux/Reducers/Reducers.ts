import { GET_PRODUCTS } from '../Actions/Products/getProducts';
import { GET_PRODUCTS_DETAIL } from '../Actions/Products/getProductsDetail';
import { GET_FILTERED_PRODUCTS } from '../Actions/Products/getFilteredProducts';
import { POST_PRODUCTS } from '../Actions/Products/postProduct';
import { CLEAR_FILTERS } from '../Actions/Products/clearFilters';

const initialState = {
  products: [],//filtro o todos
  productsDetail: {},
  AllProducts: [],//no tocar!
};

function getProductReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log(action.payload);
      return {
        ...state,
        AllProducts: action.payload,
        products: action.payload,
      };
    case GET_PRODUCTS_DETAIL:
      return {
        ...state,
        productsDetail: action.payload
      };
    case GET_FILTERED_PRODUCTS:
      return {
        ...state,
        products: state.AllProducts.filter((p: any) => p.category === action.payload)
      }
    case CLEAR_FILTERS:
      return {
        ...state,
        products:state.AllProducts
      }
      case POST_PRODUCTS:
        return{
          ...state,
          products: [ ...state.products, action.payload ]
        }
      default:
        return state;
  };
};

export default getProductReducer;
