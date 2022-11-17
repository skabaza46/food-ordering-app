import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  // Add the item into the list
  if (action.type === "ADD"){

    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem){
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;

    } else {
      updatedItems = state.items.concat(action.item)
    }

    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };

  }

  // Remove the item with the ID from the list
  if (action.type === "REMOVE"){
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )

    const existingItem = state.items[existingCartItemIndex]
    // Decrease the total amount
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1){
      // remove the whole item and also decrease the amount
      updatedItems = state.items.filter( (item) => item.id !== action.id);

    } else {
      // Keep the item and decrease the amount
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];

      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === "CLEAR"){
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  // Add item into the cart
  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };

  // Remove item from the cart
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  const clearCartHandler = () => {

    dispatchCartAction({type: "CLEAR"});
  };


  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
};

export default CartProvider;
