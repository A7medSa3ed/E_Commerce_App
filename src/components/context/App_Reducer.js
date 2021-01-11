export default function reducer(state, action) {
  switch (action.type) {
    case "[FETCH_PRODUCT]":
      return {
        ...state,
        products: action.payload,
      };
    case "[FETCH_CART]":
      return {
        ...state,
        cart: action.payload,
      };
    case "[ADD_TO_CART]":
      return {
        ...state,
        cart: action.payload,
      };
    case "[UPDATE_QTY]":
      return {
        ...state,
        cart: action.payload,
      };
    case "[REMOVE_ITEM]":
      return {
        ...state,
        cart: action.payload,
      };
    case "[EMPTY_CART]":
      return {
        ...state,
        cart: action.payload,
      };
    case "[GET_TOKEN]":
      return {
        ...state,
        cartToken: action.payload,
      };
    case "[HANDLE_ORDER]":
      return {
        ...state,
        order: action.payload,
      };
    case "[REFRESH_CART]":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
}
