import * as UserList from '../action/listUser';
import initialState from './initialState';
export const userListReducer = (state=initialState.ListUser,action)=>{
    switch(action.type){
        case UserList.List_User:
             state = action.payload;
             return state;
        default:
            return state;
    }
}