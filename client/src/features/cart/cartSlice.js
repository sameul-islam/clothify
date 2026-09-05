import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem("sepy-cart");

    if (!savedCart) {
      return {
        items: [],
      };
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart?.items)) {
      return {
        items: [],
      };
    }

    return {
      items: parsedCart.items,
    };
  } catch (error) {
    console.error("Failed to load cart:", error);

    return {
      items: [],
    };
  }
};

const initialState = getInitialCart();

const saveCart = (items) => {
  try {
    localStorage.setItem(
      "sepy-cart",
      JSON.stringify({
        items,
      })
    );
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.productId === product.productId &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );

      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        state.items.push(product);
      }

      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.cartItemId !== action.payload
      );

      saveCart(state.items);
    },

    updateCartQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.cartItemId === cartItemId
      );

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.cartItemId !== cartItemId
        );
      } else {
        item.quantity = quantity;
      }

      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];

      saveCart(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;