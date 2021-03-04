import initialState from '../initialState';
import * as Feature from '../../action/storeAdminAction/featureAction';

export const FeatureProductReducer = (state=initialState.featureProduct,action)=>{
    switch(action.type){
        case Feature.FEATURE_PRODUCT_ACTION:
            state = action.payload;
            return state;
        default: 
        return state;
    }
}