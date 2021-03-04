// import * as GetProduct from '../../action/getSingleProductbySuperAdmin';
// import * as ApiCallsAction from '../../action/apiCallsStatus';
import { getCookie , setCookie } from '../cookies/cookies';
import { Constants } from '../constants';

export function listAllRolesService() {

    let url = Constants.apiUrl + `users/rolesList`
    // debugger;
    return (dispatch) => {
        fetch(url, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${getCookie("access_token")}`
            }

        })
            .then(response => { return response.json() })
            .then(res => {
                console.log(res)
                if (res && res.type === "success") {
                    setCookie("listRoles",res.data);
                    
                   
                } else {
                   
        }
    })
            .catch(err => {
               
            })
    }

}