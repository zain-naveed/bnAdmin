import * as AddProductToCutomStore from "../action/addProductToCustomStoreAction";
import {getCookie} from '../cookies/cookies';
import { Constants } from "../constants";

export function addProductToCustomStoreService(arr){
    let url = Constants.apiUrl + "store/addProductsToStore";
    console.log(arr)
    // "https://bncollagecustomstore.herokuapp.com/api/store/addProductsToStore"
    let data = {
        products: arr
    }
    console.log(data)
    debugger
    return (dispatch)=>{
        fetch(url, {
			method: "POST",
			headers: { 
                'Authorization':  `Bearer ${ getCookie("access_token") } `,
                'content-type':"application/json"
			  },
			body: JSON.stringify(data),
		})
			.then((response) => {
				return response.json();
            })
            .then((res)=>{
                // console.log(res)
                if (res && res.type && res.type === "success") {
                   console.log(res)
                    dispatch(
                        AddProductToCutomStore.addProductCustomSToreAction({
                        isSuccess: true,
                        message: res.message,
                        apiCall: "Product Custom Store", 
                    })
                    );

				} else {
                   
					dispatch(
						AddProductToCutomStore.addProductCustomSToreAction({
							isSuccess: false,
							message: res.message,
							apiCall: "Product Custom Store",
						})
					);
				}
            })
            .catch(err=>{
                console.log("server")
                dispatch(
                    AddProductToCutomStore.addProductCustomSToreAction({
                        isSuccess: false,
                        message: "Server Error",
                        apiCall: "Product Custom Store",
                    })
                );
            })
    }
}