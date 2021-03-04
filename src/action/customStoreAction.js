export const ADD_CUSTOM_STORE = 'ADD_CUSTOM_STORE';

export function customStoreAction(data){
    return{
        type: ADD_CUSTOM_STORE,
        payload:data
    }
}