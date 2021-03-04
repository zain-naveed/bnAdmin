// https://bncollagecustomstore.herokuapp.com/api/storeClient/getStoreBySubURL/rameez

import { getCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";
import * as listMenus from "../../action/storeAdminAction/listStoreMenusAction";
// import * as ApiCallsAction from "../../action/apiCallsStatus";
//hasnanin passsword cmnkfhv6as
export function listStoreMenusService() {
	var url = Constants.apiUrl + "storeClient/getStoreBySubURL/husnain";
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
				 console.log(res)
				if (res && res.type && res.type === "success") {
					dispatch(
                        listMenus.listStoreMenus({
                            isSuccess:true,
                            message: res.message,
                            menus: res.data && res.data.store && res.data.store.superMenus ?  res.data.store.superMenus: [],
                            apiCall:"LIst Super Menus"
                        })
                    )
				
					
				} else {
                    dispatch(
                        listMenus.listStoreMenus({
                            isSuccess:false,
                            message: res.message,
                            apiCall:"LIst Super Menus"
                        })
                    )
					
				}
			})
			.catch((err) => {
                console.log("error");
                dispatch(
                    listMenus.listStoreMenus({
                        isSuccess:false,
                        message: "Server Error",
                        apiCall:"LIst Super Menus"
                    })
                )
			
			});
	};
}