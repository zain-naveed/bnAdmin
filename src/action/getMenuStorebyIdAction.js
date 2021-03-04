export const GET_MENU_STORE_BY_ID = "GET_MENU_STORE_BY_ID";

export const getMenuStoreById = (data)=>{
    return{
        type:GET_MENU_STORE_BY_ID,
        payload:data
    }
}