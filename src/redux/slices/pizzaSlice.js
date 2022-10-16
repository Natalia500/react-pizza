import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, search, sortBy, order, currentPage } = params;
    const { data } = await axios.get(
      `https://63287e729a053ff9aab955d6.mockapi.io/items?page=${currentPage}&limit=3&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  pizzaItems: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzaItems(state, action) {
      state.pizzaItems = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.pizzaItems = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzaItems = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.pizzaItems = [];
    },
  },
});

export const { setPizzaItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
