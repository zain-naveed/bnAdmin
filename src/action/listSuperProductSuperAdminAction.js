export const List_SUPER_PRODUCT_SUPER_ADMIN = "List_SUPER_PRODUCT_SUPER_ADMIN";
export function listSuperProductSuperAdmin(data){
    console.log(data)
    return {
        type:List_SUPER_PRODUCT_SUPER_ADMIN,
        payload:data
    }
}