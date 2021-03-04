import { Constants } from "../../constants";
import * as AddCustomStore from "../../action/customStoreAction";
import * as ApiCallsAction from "../../action/apiCallsStatus";
import { getCookie, setCookie } from "../../cookies/cookies";
// import axios from 'axios';

export function AddCustomStoreService(obj) {
	var Serurl = Constants.apiUrl + "store/addCustomStore";
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
	bodyformdata.append("isApprovalRequired", check);
	bodyformdata.append("email", obj.email);
	bodyformdata.append("mobile", obj.mobile);
	bodyformdata.append("address", obj.address);
	bodyformdata.append("edu_type", obj.eduType);

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
				if (res && res.type && res.type === "success") {
					console.log(res);
					setCookie("store", res.data.store);
					dispatch(
						AddCustomStore.customStoreAction({
							message: res.message,
							store: res.data,
						})
					);
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: true,
							message: res.message,
							apiCall: "CustomStore",
						})
					);
				} else {
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: false,
							message: res.message,
							apiCall: "CustomStore",
						})
					);
				}
			})
			.catch((err) => {
				console.log("error");
				dispatch(
					ApiCallsAction.setApiCallsStatus({
						isSuccess: false,
						message: "Error in Adding Custom Store",
						apiCall: "CustomStore",
					})
				);
			});
	};
}
