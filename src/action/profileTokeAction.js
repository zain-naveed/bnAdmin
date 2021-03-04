export const PROFILE_TOKEN = "PROFILE_TOKEN ";

export function profileToken(data){
    return {
        type:PROFILE_TOKEN,
        payload:data
    }
}