import initialState from './initialState';
import * as GetStoreUserId from '../action/getAdminSuperAdmin';
export function getStoreUserIdAdminReducer(state=initialState.getStoreUserId,action){
    switch(action.type){
        case GetStoreUserId.GET_ADMIN_AND_SUPERADMIN_ID :
            state = action.payload;
            return state;
        default:
         return   state;
    }
}