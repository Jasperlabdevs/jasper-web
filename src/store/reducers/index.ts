import { combineReducers } from "redux";
import messageReducer from "./messageReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import communityTypesReducer from "./communityTypesReeducer";
import userReducer from "./userReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [ ], // which reducer want to store
};

const rootReducer = combineReducers({
  message: messageReducer,
  communityTypes: communityTypesReducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
