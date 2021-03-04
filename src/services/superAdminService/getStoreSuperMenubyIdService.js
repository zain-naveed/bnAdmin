import * as GetStoreSuperMenuId from "../../action/getMenuStorebyIdAction";
import { getCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";

export function getStoreSuperMenusService(id) {
	let url = Constants.apiUrl + `store/getStoreSuperMenuById/${id}`;
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
                console.log(res);
				if (res && res.type === "success") {
					dispatch(
                        GetStoreSuperMenuId.getMenuStoreById({
                            isSuccess: true,
                            data: res.data,
                            message:res.message,
                            apiCall:"Get Super Menu by id of store"
                        })
                    )
					
					
				} else {
					dispatch(
                        GetStoreSuperMenuId.getMenuStoreById({
                            isSuccess: false,
                            message:res.message,
                            apiCall:"Get Super Menu by id of store"
                        })
                    )
				}
			})
			.catch((err) => {
				dispatch(
                    GetStoreSuperMenuId.getMenuStoreById({
                        isSuccess: false,
                        message: "Server Error",
                        apiCall:"Get Super Menu by id of store"
                    })
                )
			});
	};
}
