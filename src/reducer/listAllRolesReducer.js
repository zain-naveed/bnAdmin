import * as listRoles from '../action/listAllRolesAction';
import initialState from './initialState';
export const ListAllRolesReducer = (state=initialState.listAllRoles,action)=>{
    switch(action.type){
        case listRoles.LIST_ALL_ROLES:
             state = action.payload;
             return state;
        default:
            return state;
    }
}