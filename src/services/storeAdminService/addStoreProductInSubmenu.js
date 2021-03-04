import * as AddProductSubMenus from '../../action/storeAdminAction/addProductinSubmenuAction';
import {getCookie} from '../../cookies/cookies';
import { Constants } from "../../constants";

export function addProdcutinSubMenusService(obj){
    let url = Constants.apiUrl + "store/addProductsIntoSubMenu";

    let data = {
        products: obj.products,
        subMenuId: obj.subValue
    }
    console.log(data)
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
						AddProductSubMenus.addProducttoSbumenu({
                            message: res.message,
                            isSuccess: true,
                            data: res.data,
                            apiCall: "Add Product to Sub Menus"
                        })
					);
				} else {
                   
					dispatch(
						AddProductSubMenus.addProducttoSbumenu({
                            message: res.message,
                            isSuccess: false,
                            apiCall: "Add Product to Sub Menus"
                        })
					);
				}
            })
            .catch(err=>{
                console.log("server")
                dispatch(
                    AddProductSubMenus.addProducttoSbumenu({
                        message: "Server Error",
                        isSuccess: false,
                        apiCall: "Add Product to Sub Menus"
                    })
                );
            })
    }
}