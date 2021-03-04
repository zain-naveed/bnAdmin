export const ADD_STORE_USER = "ADD_STORE_USER";

export function addStorUserAction(data){
    console.log(data)
    return {
        type:ADD_STORE_USER,
        payload:data
    }
}