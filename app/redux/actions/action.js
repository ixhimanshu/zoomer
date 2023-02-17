import { HELPER_DETAILS_ID, CHAT_ID } from '../constants';
export function setHelperId(id) {
    return {
        type: HELPER_DETAILS_ID,
        payload: id
    }
}
export function setChatId(id) {
    return {
        type: CHAT_ID,
        payload: id
    }
}
export function setChatUserName(name) {
    return {
        type: CHAT_ID,
        payload: name
    }
}