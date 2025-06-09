import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItem: () => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const updatedItems = [...state.items];
      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }
      return { ...state, items: updatedItems };
      case "REMOVE_ITEM":
        const removeItemIndex = state.items.findIndex(
          (item) => item.id === action.id
        );
        const removeItem = state.items[removeItemIndex];
        const removeItemUpdatedItems = [...state.items];
        if (removeItem.quantity === 1) {
          removeItemUpdatedItems.splice(removeItemIndex, 1);
        } else {
          const updatedItem = {
            ...removeItem,
            quantity: removeItem.quantity - 1,
          };
          removeItemUpdatedItems[removeItemIndex] = updatedItem;
        }
        return { ...state, items: removeItemUpdatedItems };

    case "CLEAR_ITEM":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }
  function clearItem() {
    dispatchCartAction({ type: "CLEAR_ITEM" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
