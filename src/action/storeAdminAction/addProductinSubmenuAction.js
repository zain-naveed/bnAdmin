export const ADD_PRODUCT_SUBMENU = 'ADD_PRODUCT_SUBMENU';

export const addProducttoSbumenu = (data)=>{
    return {
        type: ADD_PRODUCT_SUBMENU,
        payload: data
    }
}