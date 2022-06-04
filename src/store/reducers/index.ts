import { combineReducers } from "redux";
import messageReducer from "./messageReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import communityTypesReducer from "./communityTypesReeducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [], // which reducer want to store
};

const rootReducer = combineReducers({
  message: messageReducer,
  communityTypes: communityTypesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
