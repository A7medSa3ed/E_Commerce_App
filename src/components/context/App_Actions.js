import { commerce } from "../../lib/commerce";

// Get All Products
const fetchProducts = async (actionType, dispatch) => {
  const { data } = await commerce.products.list();
  dispatch({ type: actionType, payload: data });
};

// Get Cart Data
const fetchCart = async (actionType, dispatch) => {
  const cart = await commerce.cart.retrieve();
  dispatch({ type: actionType, payload: cart });
};

// Handle Add To Cart
const handleAddToCart = async (productId, quantity, actionType, dispatch) => {
  const { cart } = await commerce.cart.add(productId, quantity);
  dispatch({ type: actionType, payload: cart });
};

// Handle Update Item Quantity
const handleUpdateQty = async (productId, quantity, actionType, dispatch) => {
  const { cart } = await commerce.cart.update(productId, { quantity });
  dispatch({ type: actionType, payload: cart });
};

// Handle Remove Item From Cart
const handleRemoveItem = async (productId, actionType, dispatch) => {
  const { cart } = await commerce.cart.remove(productId);
  dispatch({ type: actionType, payload: cart });
};

// Handle Empty Cart
const handleEmpty = async (actionType, dispatch) => {
  const { cart } = await commerce.cart.empty();
  dispatch({ type: actionType, payload: cart });
};

// Get Cart Token
const generateToken = async (cart, actionType, dispatch, history) => {
  try {
    const token = await commerce.checkout.generateToken(cart.id, {
      type: "cart",
    });
    dispatch({ type: actionType, payload: token });
  } catch (error) {
    console.log(error);
    history.push("/");
  }
};

//Handle Order For Payment
const hanldeOrder = async (checkoutTokenId, newOrder, actionType, dispatch) => {
  // There Is A Problem in commerce.checkout.capture
  try {
    const incomingOrder = await commerce.checkout.capture(
      checkoutTokenId,
      newOrder
    );
    dispatch({ type: actionType, payload: incomingOrder });
  } catch (error) {
    console.log("Order Problem ==>", error);
  }
};
//Refresh Cart After Order Is Done
const refreshCart = async (actionType, dispatch) => {
  const { newCart } = await commerce.cart.refresh();
  dispatch({ type: actionType, payload: newCart });
};

export {
  fetchProducts,
  fetchCart,
  handleAddToCart,
  handleUpdateQty,
  handleRemoveItem,
  handleEmpty,
  generateToken,
  hanldeOrder,
  refreshCart,
};
