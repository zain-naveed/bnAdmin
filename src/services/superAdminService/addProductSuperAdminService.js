import { Constants } from "../../constants";
import * as AddProductSuperAdmin from "../../action/addProductSuperAdminAction";
import * as ApiCallsAction from "../../action/apiCallsStatus";
import {getCookie} from '../../cookies/cookies';

export function AddProductSuperAdminService(obj) {
	
	var url = Constants.apiUrl + "store/addProduct";
	console.log(obj.files);
	
	let bodyFormData = new FormData();
	console.log(obj);
	// debugger;
	const size = obj.size;
	// const color = obj.color;
	const images = obj.files;
	
	
	bodyFormData.append("name",obj.pname);
	bodyFormData.append("price",obj.price);
	bodyFormData.append("discountPrice",obj.discount);
	bodyFormData.append("description",obj.description);
	// bodyFormData.append("stock",obj.stock);
	images.forEach((img)=>{
		bodyFormData.append("images",img)
	})
	// color.forEach((clr)=>{
	// 	bodyFormData.append("colors",clr);
	// });
	console.log(size)
	debugger;
	if(Object.keys(size).length > 0){
	Object.keys(size).forEach((data)=>{
		size[data].forEach((inf,indx)=>{
			
			bodyFormData.append(`sizes[${data}][${indx}][totalStock]`,inf.totalStock);
			bodyFormData.append(`sizes[${data}][${indx}][color]`,inf.color)
			bodyFormData.append(`sizes[${data}][${indx}][skuCode]`,inf.skucode)
		})
	})
	}
	
	 

	


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
				
				  
				if (res && res.type && res.type === "success") {
                    console.log(res)
				dispatch(
                    AddProductSuperAdmin.addProductSuperAdmin({
					   data: res.data, 
					   isSuccess: true,
						message:res.message,
						apiCall: "AddProductSuperAdmin",
                    })
                )
					dispatch(
						ApiCallsAction.setApiCallsStatus({
							isSuccess: true,
							message:res.message,
							apiCall: "AddProductSuperAdmin",
						})
					);
				} else {
                    console.log(res)
					dispatch(
						AddProductSuperAdmin.addProductSuperAdmin({
						   isSuccess: false,
							message:res.message,
							apiCall: "AddProductSuperAdmin",
						})
					)
				}
			})
			.catch((err) => {
				console.log("error")
				dispatch(
                    AddProductSuperAdmin.addProductSuperAdmin({
					  
					   isSuccess: false,
						message: "Server Error",
						apiCall: "AddProductSuperAdmin",
                    })
                )
			});
	};
}
