export const Dashboard_Common = 'Dashboard_Common';

export function dashboardAction(data){
    return{
        type: Dashboard_Common,
        payload:data
    }
}