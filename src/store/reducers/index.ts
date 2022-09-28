import { combineReducers } from "redux";
import messageReducer from "./messageReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import communityTypesReducer from "./communityTypesReeducer";
import userReducer from "./userReducer";
import communityReducer from "./communityReducer";
import occupancyTypesReducer from "./occupancyTypesReeducer";
import gatesReducer from "./gatesReducer";
import communityMembersReducer from "./communityMembersReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "community", "members"], // which reducer want to store
};

const rootReducer = combineReducers({
  message: messageReducer,
  communityTypes: communityTypesReducer,
  occupancyTypes: occupancyTypesReducer,
  community: communityReducer,
  gates: gatesReducer,
  user: userReducer,
  members: communityMembersReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
