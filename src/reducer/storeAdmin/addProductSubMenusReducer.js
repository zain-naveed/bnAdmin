import initialState from '../initialState';
import * as AddProductSubMenus from '../../action/storeAdminAction/addProductinSubmenuAction';

export const addProductSubMenusReducer = (state=initialState.addProductSubMenu,action)=>{
    switch(action.type){
        case AddProductSubMenus.ADD_PRODUCT_SUBMENU:
            state = action.payload;
            return state;
        default: 
        return state;
    }
}