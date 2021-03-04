export const ADD_PRODUCT_SUPERADMIN = "ADD_PRODUCT_SUPERADMIN";

export function addProductSuperAdmin(data){
    return {
        type: ADD_PRODUCT_SUPERADMIN,
        payload: data
    }
}