import * as OrderDetailSuper from "../../action/orderSuperAdminAction";
import { getCookie, setCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";

export function OrderDetailSuperService() {
	const url = Constants.apiUrl + "order/getAllOrder";
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
				console.log(res);
				if (res && res.type && res.type === "success") {
					dispatch(
						OrderDetailSuper.orderDetailSuperAdmin({
							isSuccess: true,
							data: res.data && res.data.orders ? res.data.orders : [],
							message: res.message,
							apiCall: "Order Detail Super Admin",
						})
					);
				} else {
					dispatch(
						OrderDetailSuper.orderDetailSuperAdmin({
							isSuccess: false,
							message: res.message,
							apiCall: "Order Detail Super Admin",
						})
					);
				}
			})
			.catch((err) => {
				dispatch(
					OrderDetailSuper.orderDetailSuperAdmin({
						isSuccess: false,
						message: "Server Error",
						apiCall: "Order Detail Super Admin",
					})
				);
			});
	};
}
