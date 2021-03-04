import { getCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";
import * as listSuperProduct from "../../action/listSuperProductSuperAdminAction";
import * as ApiCallsAction from "../../action/apiCallsStatus";
export function listSuperProductSuperAdmin() {
	
    var url = Constants.apiUrl + "store/listSuperProducts";
    
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
							apiCall:"List Super Product Super Admin"
						})
					);
                    dispatch(
						listSuperProduct.listSuperProductSuperAdmin({
                            data:res.data
                        })
					);
				} else {
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: false,
							message: res.message,
							apiCall:"List Super Product Super Admin",
						})
					);
				}
			})
			.catch((err) => {
				dispatch(
					ApiCallsAction.setApiCallsStatus({
						isSuccess: false,
						message: "Error in Super Product ",
						apiCall:"List Super Product Super Admin",
					})
				);
			});
	};
}
