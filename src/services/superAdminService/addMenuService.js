import * as ApiCallsAction from "../../action/apiCallsStatus";
import {getCookie} from '../../cookies/cookies';
import { Constants } from "../../constants";

export function addMenuService(arr){
    let url = Constants.apiUrl + "store/addStoreSuperMenus";
    console.log(arr)

    let data = {
        superMenus: arr
    }
    console.log(data)
    return (dispatch)=>{
        fetch(url, {
			method: "POST",
			headers: { 
                'Authorization':  `Bearer ${ getCookie("access_token") } `,
                'content-type':'application/json'
			  },
			body: JSON.stringify(data),
		})
			.then((response) => {
				return response.json();
            })
            .then((res)=>{
                if (res && res.type && res.type === "success") {
                   
				
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: true,
							message:res.message,
							apiCall: "AddMenu",
						})
					);
				} else {
                   
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: false,
							message: res.message,
							apiCall: "AddMenu",
						})
					);
				}
            })
            .catch(err=>{
                console.log("server")
                dispatch(
                    ApiCallsAction.setApiCallsStatus({
                        isSuccess: false,
                        message: "Server Error",
                        apiCall: "AddMenu",
                    })
                );
            })
    }
}