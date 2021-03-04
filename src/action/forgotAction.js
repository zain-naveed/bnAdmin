export const FORTGET_PASSWORD = 'FORGET_PASSWORD';

export function forgotAction(data){
    return {
        type:FORTGET_PASSWORD,
        payload:data
    }
}