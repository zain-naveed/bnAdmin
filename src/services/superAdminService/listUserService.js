import { getCookie, setCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";
import * as User from "../../action/listUser";
import * as ApiCallsAction from "../../action/apiCallsStatus";
import axios from 'axios';
// email:"junaidbasit17@gmail.com", default credentials
// password:"password@123"
export function listUserService() {
	
    var url = Constants.apiUrl + "store/listRequestCustomStore";
    
//  debugger;
            
          
	return (dispatch) => {
		fetch(url, {
            method: "GET",
            headers: { 
                'Authorization': `Bearer ${getCookie("access_token")}`
              }
			
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				  
				if (res && res.type && res.type === "success") {
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess:true,
                            message:res.message,
							apiCall:"List User"
						})
					);
                    dispatch(
						User.listUser({
                            data:res.data,
                        })
					);
				} else {
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: false,
							message: res.message,
							apiCall: "User List Empty",
						})
					);
				}
			})
			.catch((err) => {
				dispatch(
					ApiCallsAction.setApiCallsStatus({
						isSuccess: false,
						message: "Error in User List",
						apiCall: "User List",
					})
				);
			});
	};
}
