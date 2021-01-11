import React, { createContext, useReducer, useEffect, useContext } from "react";
import reducer from "./App_Reducer";
import { fetchProducts, fetchCart } from "./App_Actions.js";
import { FETCH_PRODUCTS, FETCH_CART } from "./Action_Types";

// Initial Store
export const contextStore = createContext({
  products: [],
  cart: {},
  cartToken: {},
  order: {},
});

const App_Context = props => {
  const iniState = useContext(contextStore);
  const [state, dispatch] = useReducer(reducer, iniState);

  // Fetch Data On Load
  useEffect(() => {
    fetchProducts(FETCH_PRODUCTS, dispatch);
    fetchCart(FETCH_CART, dispatch);
  }, []);

  return (
    <contextStore.Provider value={{ state, dispatch }}>
      {props.children}
    </contextStore.Provider>
  );
};

export default App_Context;
