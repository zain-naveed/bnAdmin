import * as GetStoreProductId from "../../action/getStoreProductbyIdAction";
import { getCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";

export function getStoreProductId(id) {
	let url = Constants.apiUrl + `store/listStoreProducts/${id}`;
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
                        GetStoreProductId.getStoreProductId({
                            isSuccess: true,
                            data:res.data,
                            message: res.message,
                            apiCall:"get store Product by Id",
                        })
                    )
					
					
				} else {
					dispatch(
                        GetStoreProductId.getStoreProductId({
                            isSuccess: false,
                            message: res.message,
                            apiCall:"get store Product by Id",
                        })
                    )
				}
			})
			.catch((err) => {
				dispatch(
                    GetStoreProductId.getStoreProductId({
                        isSuccess: false,
                        message: "Server Error",
                        apiCall:"get store Product by Id",
                    })
                )
			});
	};
}
