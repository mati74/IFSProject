import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import ChatReducer from './ChatReducer';

const chatPersistConfig = {
  key: 'chat',
  storage: AsyncStorage,
}

export default combineReducers({
  chat: persistReducer(chatPersistConfig, ChatReducer),
})
