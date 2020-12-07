import * as chatActionType from '../types/chatActionType';
import { handleActions } from "redux-actions";

const initialState = {
    messages: [
        {
            id: 4,
            message: "Yeah, fine thanks.",
            userId: 2
        },
        {
            id: 3,
            message: "Fine thanks. And you?",
            userId: 1
        },
        {
            id: 2,
            message: "hi Peter . How are you?",
            userId: 2
        },
        {
            id: 1,
            message: "hi John",
            userId: 1,
        }
    ],
    currentUserId: 1
}

export default handleActions({
    [chatActionType.ADD_MESSAGE]: addMessage,
    [chatActionType.CHANGE_USER]: changeUser,
}, initialState)


function addMessage(state, { payload }) {
    return {
        ...state,
        messages: [payload, ...state.messages]
    }
}

function changeUser(state, { payload }) {
    return {
        ...state,
        currentUserId: payload
    }
}