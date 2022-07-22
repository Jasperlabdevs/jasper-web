import persistedReducer from "./reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";

import { composeWithDevTools } from "redux-devtools-extension";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(persistedReducer, composeEnhancers);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof persistedReducer>;
