import * as Approval from '../action/approvalAction';
import initialState from './initialState';

export const addApprovalReducer = (state=initialState.addApproval,action)=>{
    switch(action.type){
        case Approval.Add_Product_Approval:
            state = action.payload;
            return state;
        default:
            return state;
    }
}
export const ListApprovalReducer = (state=initialState.listApproval,action)=>{
    switch(action.type){
        case Approval.List_Product_Approval:
            state = action.payload;
            return state;
        default:
            return state;
    }
}
export const updateApprovalReducer = (state=initialState.updateApproval,action)=>{
    switch(action.type){
        case Approval.Update_Product_Approval:
            state = action.payload;
            return state;
        default:
            return state;
    }
}