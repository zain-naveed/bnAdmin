import { Constants } from "../../constants";
import * as EditCustomStore from "../../action/editCustomStoreAction";
import * as ApiCallsAction from "../../action/apiCallsStatus";
import { getCookie, setCookie } from "../../cookies/cookies";
// import axios from 'axios';

export function EditCustomStoreService(obj) {
	var Serurl = Constants.apiUrl + "store/updateCustomStore";
	// console.log(Serurl)
	var id = getCookie("profile");
	// console.log(id.id)
	console.log(obj);
	var name = obj.name;
	var url1 = obj.url;
	var background = obj.background;
	// var userid = id.id;
	var nfile = obj.file;
	var sub = obj.subUrl;
	var check = obj.checkbox;
	var header = obj.headerfile;
	console.log({ name, url1, background, nfile, sub, check, header });

	let bodyformdata = new FormData();
	bodyformdata.append("name", name);
	bodyformdata.append("URL", url1);
	bodyformdata.append("background", background);
	bodyformdata.append("cover", header);
	bodyformdata.append("logo", nfile);
	bodyformdata.append("subURL", sub);
	bodyformdata.append("isApprovedPermission", check);
	bodyformdata.append("email", obj.email);
	bodyformdata.append("mobile", obj.mobile);
	bodyformdata.append("address", obj.address);
	bodyformdata.append("edu_type", obj.eduType);
	bodyformdata.append("storeId",obj.id)
	bodyformdata.append("isActive",obj.customStoreStatus)
// 	console.log(obj)
// console.log("zain naveed")
	return (dispatch) => {
		fetch(Serurl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getCookie("access_token")} `,
			},
			body: bodyformdata,
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
                console.log(res)
				if (res && res.type && res.type === "success") {
					console.log(res);
					// setCookie("store", res.data.store);
					dispatch(
						EditCustomStore.editCustomStore({
							message: res.message,
							store: res.data,
							isSuccess:true,
							apiCall: "Edit CustomStore",
						})
					);
					// dispatch(
					// 	ApiCallsAction.setApiCallsStatus({
					// 		isSuccess: true,
					// 		message: res.message,
					// 		apiCall: "Edit CustomStore",
					// 	})
					// );
				} else {
					dispatch(
						EditCustomStore.editCustomStore({
							message: res.message,
							isSuccess:false,
							apiCall: "Edit CustomStore",
						})
					);
				}
			})
			.catch((err) => {
				console.log("error");
				dispatch(
					EditCustomStore.editCustomStore({
						message: "Server Error",
						isSuccess:false,
						apiCall: "Edit CustomStore",
					})
				);
			});
	};
}
