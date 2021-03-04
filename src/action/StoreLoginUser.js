export const STORE_LOGIN_ADMIN = "STORE_LOGIN_ADMIN";

export function storeLoginAdminAction(data){
    return{
        type: STORE_LOGIN_ADMIN,
        payload: data
    }
}