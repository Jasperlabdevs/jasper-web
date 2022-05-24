import { combineReducers } from 'redux'
import messageReducer from './messageReducer'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [] // which reducer want to store
  };


const rootReducer = combineReducers({
    message : messageReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer