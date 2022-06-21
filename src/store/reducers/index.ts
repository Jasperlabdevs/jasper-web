import { combineReducers } from "redux";
import messageReducer from "./messageReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import communityTypesReducer from "./communityTypesReeducer";
import userReducer from "./userReducer";
import communityReducer from "./communityReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ['user'], // which reducer want to store
};

const rootReducer = combineReducers({
  message: messageReducer,
  communityTypes: communityTypesReducer,
  community: communityReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
