import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import Post from "./reducers/PostDuck";
import User from "./reducers/UserDuck";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";

let rootReducer = combineReducers({
  Post,
  User,
});
let devoolt =
  (this && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, devoolt(applyMiddleware(thunk)));

//? creacion de la funcion que permite usar redux con nextjs
export const wrapper = createWrapper(() => store);

export default store;
