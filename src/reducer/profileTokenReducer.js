import initialState  from './initialState';
import * as Profile from '../action/profileTokeAction';


export const profileTokeReducer = (state= initialState.profileToken,action)=>{
    switch(action.type){
        case Profile.PROFILE_TOKEN:
            state=action.payload;
            return state;
        default:
            return state;
    }
}