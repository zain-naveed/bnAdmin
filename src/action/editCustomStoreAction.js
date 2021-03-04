export const EDIT_CUSTOM_STORE = 'EDIT_CUSTOM_STORE';

export const editCustomStore = (data)=>{
    return {
        type:EDIT_CUSTOM_STORE,
        payload:data
    }
}