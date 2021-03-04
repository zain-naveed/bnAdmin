import {Constants} from '../../constants';
import * as Approval from "../../action/approvalAction";
// import * as ApiCallsAction from "../../action/apiCallsStatus";
import {getCookie} from '../../cookies/cookies';

export function updateApprovalService(obj) {
	
	var url = Constants.apiUrl + "store/updateRequestProduct";
	console.log(obj);

	let data = {
		requestId: obj.RequestId,
		action: obj.status , 
		
	}
	

	debugger;
	return (dispatch) => {
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
			.then((res) => {
				console.log(res)
				  
				if (res && res.type && res.type === "success") {

					dispatch(
                        Approval.updateProductApproval({
                            data:res.data,
                            isSuccess:true,
                            message:res.message,
                            apiCall:"Update Api Call"
                        })
                    );
				} else {
					dispatch(
						Approval.updateProductApproval({
                            isSuccess:false,
                            message:res.message,
                            apiCall:"Update Api Call"
                        })
					);
				}
			})
			.catch((err) => {
				console.log("error")
				dispatch(
					Approval.updateProductApproval({
                        isSuccess:false,
                        message:"Server Error",
                        apiCall:"Update Api Call"
                    })
				);
			});
	};
}
