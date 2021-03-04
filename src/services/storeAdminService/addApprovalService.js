import * as Approval from '../../action/approvalAction';
import {getCookie} from '../../cookies/cookies';
import { Constants } from "../../constants";

export function addApprovalService(obj){
    let url = Constants.apiUrl + "store/addRequestProduct";

    let data = {
        productId: obj.featureProductid,
        message: obj.featureMessage
    }
    console.log(data)
    debugger;
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
                console.log(res)
                if (res && res.type && res.type === "success") {
                   
				
					dispatch(
                        Approval.addProductApproval({
                            message: res.message,
                            isSuccess: true,
                            data: res.data,
                            apiCall: "Add Product Approvals"
                        })
					);
				} else {
					dispatch(
                        Approval.addProductApproval({
                            message: res.message,
                            isSuccess: false,
                            apiCall: "Add Product Approvals"
                        })
					);
				}
            })
            .catch(err=>{
                console.log("server")
                dispatch(
                    Approval.addProductApproval({
                        message: "Server Error",
                        isSuccess: false,
                        apiCall: "Add Product Approvals"
                    })
                );
            })
    }
}