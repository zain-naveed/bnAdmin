export const GET_STORE_PRODUCT_ID = 'GET_STORE_PRODUCT_ID';

export const getStoreProductId = (data)=>{
    return {
        type: GET_STORE_PRODUCT_ID,
        payload: data
    }
}