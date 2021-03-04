import * as Profile from '../../action/profileTokeAction';
import { getCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";
import * as ApiCallsAction from "../../action/apiCallsStatus";

export function profileTokenService() {
	
    var url = Constants.apiUrl + "users/me";
    console.log(getCookie("access_token"))
 
    debugger;
            
          
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
                
				//   console.log(res.message)
				if (res && res.type && res.type === "success") {
                    // console.log(res)
					dispatch(
						Profile.profileToken({
                            data:res.data.user
                        })
                    
					);
                    dispatch(
                        ApiCallsAction.setApiCallsStatus({
                            isSuccess:true,
                            message: res.message,
                            apiCall:"ProfileToken"
                        })
                    )
                    
				} else {
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: false,
							message: res.message,
							apiCall: "ProfileToken",
						})
					);
				}
			})
			.catch((err) => {
				console.log("error")
				dispatch(
					ApiCallsAction.setApiCallsStatus({
						isSuccess: false,
						message: "Error in List Store",
						apiCall: "ProfileToken",
					})
				);
			});
	};
}
