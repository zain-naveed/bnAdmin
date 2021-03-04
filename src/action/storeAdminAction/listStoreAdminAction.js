export const STORE_ADMIN_LIST = 'STORE_ADMIN_LIST';

export function storeAdminListAction(data){
    return {
        type:STORE_ADMIN_LIST,
        payload:data
    }
}