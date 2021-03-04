export const ADD_PRODUCT_TO_CUSTOM_STORE ="ADD_PRODUCT_TO_CUSTOM_STORE"

export function addProductCustomSToreAction(data){
    return {
        type:ADD_PRODUCT_TO_CUSTOM_STORE,
        payload:data
    }
}