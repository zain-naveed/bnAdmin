import { Constants } from "../../constants";
import * as EditStoreMenus from "../../action/editStoreMenusAction";
import { getCookie} from "../../cookies/cookies";
export function EditMenuService(obj) {
	var Serurl = Constants.apiUrl + "store/updateStoreSuperMenus";
	console.log(obj)
	var data = {
		superMenus:obj
	}
	console.log(data);
	return (dispatch) => {
		fetch(Serurl, {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${getCookie("access_token")} `,
				'content-type':'application/json'
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
                console.log(res)
				if (res && res.type && res.type === "success") {
					console.log(res);
					dispatch(
						EditStoreMenus.editStoreMenusAction({
							message: res.message,
							store: res.data,
							isSuccess:true,
							apiCall: "Edit Store Menus",
						})
					);
				} else {
					dispatch(
						EditStoreMenus.editStoreMenusAction({
							message: res.message,
							isSuccess:false,
							apiCall: "Edit Store Menus",
						})
					);
				}
			})
			.catch((err) => {
				console.log("error");
				dispatch(
					EditStoreMenus.editStoreMenusAction({
						message: "Server Error",
						isSuccess:false,
						apiCall: "Edit Store Menus",
					})
				);
			});
	};
}
