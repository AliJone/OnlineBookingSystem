import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const AppContext = createContext();

const initialState = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
  collapsed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
      };
    case "STORE_BOOKING_DETAIL":
      return {
        ...state,
        storeBookingDetail: action.payload,
      };
    case "BREADCRUMBS":
      return {
        ...state,
        breadcurms: action.payload,
      };
    case "SIDEBAR_COLLAPSED":
      return {
        ...state,
        collapsed: action.payload,
      };
    case "UPDATE_STATE":
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return state;
  }
}

export function AppProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
