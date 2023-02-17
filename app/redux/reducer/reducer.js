import { HELPER_DETAILS_ID, CHAT_ID, CHAT_USERNAME } from '../constants';
const initialState = {
    chatId: 0,
    helperId: 0,
    chatUserName: 0
};
const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case HELPER_DETAILS_ID:
            return {
                ...state,
                helperId: action.payload
            };
        case CHAT_ID:
            return {
                ...state,
                chatId: action.payload
            };
        case CHAT_USERNAME:
            return {
                ...state,
                chatUserName: action.payload
            };
        default:
            return state;
    }
}
export default commonReducer;