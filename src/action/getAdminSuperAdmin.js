export const GET_ADMIN_AND_SUPERADMIN_ID = 'GET_ADMIN_AND_SUPERADMIN_ID';

export function getAdminAndSuperAdminId(data){
        return {
            type: GET_ADMIN_AND_SUPERADMIN_ID,
            payload: data
        }
}