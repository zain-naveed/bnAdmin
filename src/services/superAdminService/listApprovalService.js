import { getCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";
import * as Approval from "../../action/approvalAction";

export function listProductApprovalService() {
	var url = Constants.apiUrl + "store/listRequestProducts";
	// console.log(getCookie("access_token"));
	 debugger;

	return (dispatch) => {
		fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${getCookie("access_token")}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				//   console.log(res.message)
				if (res && res.type && res.type === "success") {
					dispatch(
                        Approval.listProductApproval({
                            data:res.data,
                            isSuccess:true,
                            message:res.message,
                            apiCall:"List Approval Api Call"
                        })	
					);
					
				} else {
					dispatch(
						Approval.listProductApproval({
                            isSuccess:false,
                            message:res.message,
                            apiCall:"List Approval Api Call"
                        })
					);
				}
			})
			.catch((err) => {
				console.log("error");
				dispatch(
					Approval.listProductApproval({
                        isSuccess:false,
                        message:"Server Error",
                        apiCall:"List Approval Api Call"
                    })
				);
			});
	};
}
