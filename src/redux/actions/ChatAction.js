import * as chatActionType from '../types/chatActionType';

export const addMessage = (message) => {
  return {
    type: chatActionType.ADD_MESSAGE,
    payload: message
  }
}

export const changeUser = (userId) => {
  return {
    type: chatActionType.CHANGE_USER,
    payload: userId
  }
}
