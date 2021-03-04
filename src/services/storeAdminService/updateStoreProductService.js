import {Constants} from '../../constants';
import * as updateProductAction from '../../action/storeAdminAction/updateStoreAdminAction';
import {getCookie} from '../../cookies/cookies';


export function updateProduct(obj){
    const url = Constants.apiUrl + "store/updateStoreProduct";
    let data = {
        productId: obj.id,
        price: obj.ammount,
        description: obj.description,
        stock:obj.stock,
        discountPrice: obj.discount,
        allowedRules:obj.selectRoles,
        status:obj.options
    }
    console.log(obj.options)
    debugger;
    return (dispatch)=>{
        fetch(url, {
			method: "POST",
			headers: { 
                'Authorization':  `Bearer ${ getCookie("access_token") } `,
                'content-type':'application/json'
			  },
			body: JSON.stringify(data),
		})
			.then((response) => {
				return response.json();
            })
            .then((res)=>{
                console.log(res)
                if (res && res.type && res.type === "success") {
                    dispatch(
                        updateProductAction.updateStoreAdminProductAction({
                            data: res.data,
                            isSuccess: true,
                            message: res.message,
                            apiCall: "Get Single Product by Admin"   
                        })
                    )
                   
				} else {
                    dispatch(
                        updateProductAction.updateStoreAdminProductAction({
                           
                            isSuccess: false,
                            message: res.message,
                            apiCall: "Get Single Product by Admin"   
                        })
                    )
					
				}
            })
            .catch(err=>{
                console.log("server");
                dispatch(
                    updateProductAction.updateStoreAdminProductAction({
                        isSuccess: false,
                        message: "Server Error",
                        apiCall: "Get Single Product by Admin"   
                    })
                )
               
            })
    }
}