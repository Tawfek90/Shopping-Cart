const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SUCCESSS":
      return { ...state, loading: false, cart: action.data };
    case "FAILED":
      return { ...state, loading: false, err: action.message };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "REMOVE":
      const filteredData = state.cart.filter(
        (item) => item.id !== action.payload
      );

      return { ...state, cart: filteredData };

    case "CHANGE":
      const dataChanges = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            if (action.word === "increase") {
              return { ...item, amount: item.amount + 1 };
            } else if (action.word === "decrease") {
              return { ...item, amount: item.amount - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.amount >= 1);
      return { ...state, cart: dataChanges };
    case "TOTAL&AMOUNT":
      let { total, amount } = state.cart.reduce(
        (accumulator, item) => {
          accumulator.total += item.amount * item.price;
          accumulator.amount += item.amount;
          return accumulator;
        },
        { total: 0, amount: 0 }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
  }
  return state;
};

export default reducer;
