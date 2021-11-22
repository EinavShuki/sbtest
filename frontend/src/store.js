import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  peopleFetchReducer,
  updatePageReducer,
} from "./reducers/peopleReducers";

const reducer = combineReducers({
  peopleFetch: peopleFetchReducer,
  updatePage: updatePageReducer,
});

const initialState = {
  updatePage: { page: 0 },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
