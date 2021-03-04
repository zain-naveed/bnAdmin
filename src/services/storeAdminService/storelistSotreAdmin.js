import { getCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";
import * as listStoreAdminProduct from "../../action/storeAdminAction/listStoreAdminAction";
// import * as ApiCallsAction from "../../action/apiCallsStatus";

export function StoreAdminProductListService() {
	var url = Constants.apiUrl + "store/listStoreProducts";
	console.log(getCookie("access_token"));

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
				 console.log("res",res)
				if (res && res.type && res.type === "success") {
					dispatch(
						listStoreAdminProduct.storeAdminListAction({
							data: res.data,
							isSuccess: true,
							message: res.message,
							type: "success",
							apiCall: "List Store Admin Product",
						})
					);
					
				} else {
                    console.log(res)
					dispatch(
						listStoreAdminProduct.storeAdminListAction({
							
							isSuccess: false,
							message: res.message,
							type: "fail",
							apiCall: "List Store Admin Product",
						})
					);
				}
			})
			.catch((err) => {
				console.log("error");
				dispatch(
					listStoreAdminProduct.storeAdminListAction({
						
						isSuccess: false,
						message: "Server Error",
						type: "fail",
						apiCall: "List Store Admin Product",
					})
				);
			});
	};
}