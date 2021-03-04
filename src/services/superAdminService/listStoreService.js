import { getCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";
import * as listStore from "../../action/listStore";
import * as ApiCallsAction from "../../action/apiCallsStatus";

export function listStoreService() {
	var url = Constants.apiUrl + "store/listStores";
	console.log(getCookie("access_token"));
	//  debugger;

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
						listStore.listStore({
							data: res.data,
						})
					);
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: true,
							message: res.message,
							type: "success",
							apiCall: "List Store",
						})
					);
				} else {
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: false,
							type: "fail",
							message: res.message,
							apiCall: "List store",
						})
					);
				}
			})
			.catch((err) => {
				console.log("error");
				dispatch(
					ApiCallsAction.setApiCallsStatus({
						isSuccess: false,
						type: "fail",
						message: "Server Error in List Store",
						apiCall: "List Store",
					})
				);
			});
	};
}
