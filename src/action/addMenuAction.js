export const ADD_MENU = "ADD_MENU";

export function adMenu(data){
    return{
        type:ADD_MENU,
        payload:data
    }
}