import initialState from '../initialState';
import * as addOffer from '../../action/storeAdminAction/addOfferAction';

export const addOfferReducer = (state=initialState.addOffer,action)=>{
    switch(action.type){
        case addOffer.ADD_OFFER:
            state = action.payload;
            return state;
        default: 
        return state;
    }
}