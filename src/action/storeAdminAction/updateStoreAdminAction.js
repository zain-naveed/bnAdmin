export const UPDATE_STORE_ADMIN_PRODUCT = 'UPDATE_STORE_ADMIN_PRODUCT';

export const updateStoreAdminProductAction = (data)=>{
    return {
        type:UPDATE_STORE_ADMIN_PRODUCT,
        payload:data
    }
}