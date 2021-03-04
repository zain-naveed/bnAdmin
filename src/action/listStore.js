export const LIST_STORE = 'LIST_STORE';

export function listStore(data){
    return {
        type:LIST_STORE,
        payload:data
    }
}