import * as OrderDetailSuper from "../../action/orderSuperAdminAction";
import { getCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";

export function OrderUpdateSuperService(obj) {
    const url = Constants.apiUrl + "order/updateOrderById";
    let data = {
        
        orderId:obj.id,
        status:obj.value
    }


console.log(data)
    debugger;
	return (dispatch) => {
		fetch(url, {
			method: "POST",
			headers: {
                'Authorization': `Bearer ${getCookie("access_token")}`,
                'content-type':'application/json'
            },
            body: JSON.stringify(data)
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				console.log(res);
				if (res && res.type && res.type === "success") {
					dispatch(
						OrderDetailSuper.updateOrderSuperAdmin({
                            isSuccess:true,
                            message:res.message,
                            apiCall:"Update Order Super Admin"
                        })
					);
				} else {
					dispatch(
						OrderDetailSuper.updateOrderSuperAdmin({
                            isSuccess:false,
                            message:res.message,
                            apiCall:"Update Order Super Admin"
                        })
					);
				}
			})
			.catch((err) => {
				dispatch(
                    OrderDetailSuper.updateOrderSuperAdmin({
                        isSuccess:false,
                        message:"Server Error",
                        apiCall:"Update Order Super Admin"
                    })
                );
			});
	};
}
