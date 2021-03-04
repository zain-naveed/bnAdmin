import { act } from 'react-dom/test-utils';
import * as AddMenu from '../action/addMenuAction';
import initialState from './initialState';

export const AddMenuReducer = (state=initialState.addMenu,action)=>{
    switch(action.type){
        case AddMenu.ADD_MENU:
            state = action.payload;
            return state;
        default:
            return state;
    }
}