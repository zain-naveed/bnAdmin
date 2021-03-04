export const EDIT_PRODUCT_SUPER_ADMIN = "EDIT_PRODUCT_SUPER_ADMIN";

export const editProductSuperAdmin = (data)=>{
    return {
        type: EDIT_PRODUCT_SUPER_ADMIN,
        payload:data
    }
}