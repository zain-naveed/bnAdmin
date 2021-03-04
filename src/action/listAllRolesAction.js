export const LIST_ALL_ROLES = 'LIST_ALL_ROLES';

export function listAllRolesAction(data){
    return {
        type:LIST_ALL_ROLES,
        payload:data
    }
}