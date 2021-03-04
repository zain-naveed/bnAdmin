export const LIST_STORE_MENUS = "LIST_STORE_MENUS";

export const listStoreMenus = (data)=>{
    return {
        type:LIST_STORE_MENUS,
        payload:data
    }
}