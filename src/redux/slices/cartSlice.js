import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  firstPrice: 0,
  itemsPizzasCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemPizza(state, action) {
      const findItemId = state.itemsPizzasCart.find(
        (obj) => obj.id == action.payload.id
      );
      if (findItemId) {
        findItemId.count++;
      } else {
        state.itemsPizzasCart.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.itemsPizzasCart.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, state.firstPrice);
    },

    minusItem(state, action) {
      const findItemId = state.itemsPizzasCart.find(
        (obj) => obj.id == action.payload
      );
      if (findItemId) {
        state.totalPrice = state.totalPrice - findItemId.price;
        findItemId.count--;
      }
    },

    removeItemPizza(state, action) {
      const findItemId = state.itemsPizzasCart.find(
        (obj) => obj.id == action.payload
      );
      state.itemsPizzasCart = state.itemsPizzasCart.filter(
        (obj) => obj.id !== action.payload
      );
      state.totalPrice = state.totalPrice - findItemId.price * findItemId.count;
    },
    clearCartPizzas(state, action) {
      state.itemsPizzasCart = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemPizza, removeItemPizza, minusItem, clearCartPizzas } =
  cartSlice.actions;

export default cartSlice.reducer;
