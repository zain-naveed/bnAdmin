import {Constants} from '../../constants';
import * as AddStoreUser from "../../action/addUserStore";
// import * as ApiCallsAction from "../../action/apiCallsStatus";
import {getCookie} from '../../cookies/cookies';

export function AddStoreUserService(obj) {
	
	var url = Constants.apiUrl + "users/addStoreUser";
	console.log(obj);
	let bodyFormData = new FormData();
	
	bodyFormData.append("email",obj.email);
	// bodyFormData.append("role",obj.role);
	bodyFormData.append("firstName",obj.fname);
	bodyFormData.append("lastName",obj.lname);
	// bodyFormData.append("password",obj.password);
	bodyFormData.append("profileImage",obj.logo)
	bodyFormData.append("storeId",obj.id)
	bodyFormData.append("roleId",obj.role)


	// let data = {
	// 	email: obj.email,
	// 	role: obj.role , 
	// 	firstName: obj.fname, 
	// 	lastName: obj.lname,
	// 	password: obj.num
	// }
	// console.log(data)

	debugger;
	return (dispatch) => {
		fetch(url, {
			method: "POST",
			headers: { 
				'Authorization':  `Bearer ${ getCookie("access_token") } `
			  },
			body: bodyFormData,
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				console.log(res)
				  
				if (res && res.type && res.type === "success") {

					dispatch(AddStoreUser.addStorUserAction({
						message: res.message,
						user: res.data,
						isSuccess: true,
							message:res.message,
							apiCall: "StoreUser",
					}));
				} else {
					dispatch(
						AddStoreUser.addStorUserAction({
							isSuccess: false,
							message: res.message,
							apiCall: "StoreUser",
						})
					);
				}
			})
			.catch((err) => {
				console.log("error")
				dispatch(
					AddStoreUser.addStorUserAction({
						isSuccess: false,
						message: "Error in  Add User in Store",
						apiCall: "StoreUser",
					})
				);
			});
	};
}
