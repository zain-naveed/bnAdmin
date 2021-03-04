import initialState from './initialState';
import * as Dashboard from '../action/dashboardAction';
export const dashboardReducer = (state=initialState.dashboard,action)=>{
    switch(action.type){
        case Dashboard.Dashboard_Common:
            state = action.payload;
            return state;
        default:
            return state;
    }
}