import * as GetStoreId from "../../action/getAdminSuperAdmin";
import * as ApiCallsAction from "../../action/apiCallsStatus";
import { getCookie,setCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";

export function getStoreUserId(id) {
	let url = Constants.apiUrl + `store/storeById/${id}`;

	return (dispatch) => {
		fetch(url, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${getCookie("access_token")}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				if (res && res.type === "success") {
	
					dispatch( 
						GetStoreId.getAdminAndSuperAdminId({
							data: res.data.store,
						})
					);
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: true,
							message: res.message,
							apiCall: "Store User",
						})
					);
				} else {
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: false,
							message: res.message,
							apiCall: "Store User",
						})
					);
				}
			})
			.catch((err) => {
				dispatch(
					ApiCallsAction.setApiCallsStatus({
						isSuccess: false,
						message: "Error in Store User",
						apiCall: "Store User",
					})
				);
			});
	};
}
