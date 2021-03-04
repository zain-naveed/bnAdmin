export const List_User = "List_User";
export function listUser(data){
    console.log(data)
    return {
        type:List_User,
        payload:data
    }
}