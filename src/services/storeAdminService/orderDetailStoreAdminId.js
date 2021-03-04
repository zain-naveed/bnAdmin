import * as OrderDetailStore from "../../action/storeAdminAction/orderDetailByStoreId";
import { getCookie, setCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";

export function OrderDetailStoreService() {
	var { storeId } = getCookie("profile");
	const url = Constants.apiUrl + "order/getOrdersByStoreId/" + storeId;
	console.log(storeId);
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
						OrderDetailStore.orderDetailStoreAdmin({
							isSuccess: true,
							message: res.message,
							data: res.data && res.data.orders ? res.data.orders : [],
							apiCall: "Order Store Admin by Id",
						})
					);
				} else {
					dispatch(
						OrderDetailStore.orderDetailStoreAdmin({
							isSuccess: false,
							message: res.message,
							apiCall: "Order Store Admin by Id",
						})
					);
				}
			})
			.catch((err) => {
				dispatch(
					OrderDetailStore.orderDetailStoreAdmin({
						isSuccess: false,
						message: "Server Error",
						apiCall: "Order Store Admin by Id",
					})
				);
			});
	};
}
