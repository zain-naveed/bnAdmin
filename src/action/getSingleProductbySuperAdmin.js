export const GET_PRODUCT_SINGLE_SUPER_ADMIN = 'GET_PRODUCT_SINGLE_SUPER_ADMIN';

export const getProductSingle = (data)=>{
    return {
        type:GET_PRODUCT_SINGLE_SUPER_ADMIN,
        payload:data
    }
}