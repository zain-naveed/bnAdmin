export const EDIT_STORE = "EDIT_STORE";

export function editStore(data){
    return {
        type:EDIT_STORE,
        payload:data
    }
}