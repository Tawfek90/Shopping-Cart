import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
import axios from "axios";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    loading: false,
    amount: 0,
    total: 0,
    cart: [],
    err: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "LOADING" });
    axios
      .get(url)
      .then((res) => {
        dispatch({ type: "SUCCESSS", data: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "FAILED",
          message: "SORRY PROBLEM WITH FETCHING DATA",
        });
      });
  }, []);

  useEffect(() => {
    dispatch({ type: "TOTAL&AMOUNT" });
  }, [state.cart]);

  const changeItem = (id, word) => {
    dispatch({ type: "CHANGE", payload: id, word });
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        changeItem,
        remove,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
