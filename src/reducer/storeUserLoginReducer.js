import initialState from './initialState';
import * as LoginStoreAdmin from '../action/StoreLoginUser';

export const StoreLoginUserReducer = (state=initialState.storeAdminLogin,action)=>{
    switch(action.type){
        case  LoginStoreAdmin.STORE_LOGIN_ADMIN:
            state = action.payload;
            return state;
        default:
            return state;
    }
}