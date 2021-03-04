export const ORDER_DETAIL_STORE_ADMIN_ID = 'ORDER_DETAIL_STORE_ADMIN_ID';

export const orderDetailStoreAdmin = (data)=>{
    return {
        type:ORDER_DETAIL_STORE_ADMIN_ID,
        payload:data
    }
}