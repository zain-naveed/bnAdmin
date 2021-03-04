export const GET_PRODUCT_SINGLE = 'GET_PRODUCT_SINGLE';

export const getProductSingle = (data)=>{
    return {
        type:GET_PRODUCT_SINGLE,
        payload:data
    }
}