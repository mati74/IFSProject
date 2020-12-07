import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/RootReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(
        thunk,
    ),
);

let persistor = persistStore(store);

export {
    store,
    persistor,
};
