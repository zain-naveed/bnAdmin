import axios from "axios";
import { getCookie, setCookie } from "../../cookies/cookies";
import { Constants } from "../../constants";
import * as UserProfileActions from "../../action/userLogin";
import * as ApiCallsAction from "../../action/apiCallsStatus";
import {listAllRolesService} from '../listAllRoles';
// email:"junaidbasit17@gmail.com", default credentials
// password:"password@123"
export function UserLogin(obj) {
	debugger;
	var url = Constants.apiUrl + "users/login";
	// var OPTIONS = {
	// 	url: url1,
	// 	method: "POST",
	// 	data: {
	// 		email: obj.email,
	// 		password: obj.password,
	// 	},
	// 	headers: {
	// 		"content-type": "application/json",
	// 	},
	// };
	let data = {
		email: obj.email,
		password: obj.password,
	};
	return (dispatch) => {
		fetch(url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				//   console.log(res.data.data.user)
				if (res && res.type && res.type === "success") {
					setCookie("profile", JSON.stringify(res.data.user), "30");
					setCookie("access_token", res.data.token, "30");
					dispatch(listAllRolesService());
					dispatch(UserProfileActions.currentUserProfile(res.data.user));
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: true,
							message: res.message,
							apiCall: "login",
						})
					);
				} else {
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: false,
							message: res.message,
							apiCall: "login",
						})
					);
				}
			})
			.catch((err) => {
				dispatch(
					ApiCallsAction.setApiCallsStatus({
						isSuccess: false,
						message: "Server Error",
						apiCall: "login",
					})
				);
			});
	};
}
