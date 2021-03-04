export const FEATURE_PRODUCT_ACTION = 'FEATURE_PRODUCT_ACTION';

export const featureProduct = (data)=>{
    return {
    type:FEATURE_PRODUCT_ACTION,
    payload:data
}
}