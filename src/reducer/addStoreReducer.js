import * as StoreUser from '../action/addUserStore';
import initialState from './initialState';
export function addStoreUser(state=initialState.addStoreUser,action){
    switch(action.type){
        case StoreUser.ADD_STORE_USER:
            state = action.payload
            return state;
        default:
            return state;
    }
}