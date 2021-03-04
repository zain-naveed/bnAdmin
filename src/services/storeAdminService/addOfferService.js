import * as AddOffer from '../../action/storeAdminAction/addOfferAction';
import {getCookie} from '../../cookies/cookies';
import { Constants } from "../../constants";

export function addOfferService(obj){
    let url = Constants.apiUrl + "store/addOffer";

    console.log(obj)
    debugger;
    const result = obj && Object.keys(obj).length > 0 && obj.resultMenu && obj.resultMenu.length > 0 ? obj.resultMenu :"" 
    const formData = new FormData();
    formData.append("header[backgroundColor]",obj.headerBackground);
    formData.append("header[text]",obj.headertext)
    formData.append("body[backgroundColor]",obj.bodyBackground)
    formData.append("body[text]",obj.bodyText)
    formData.append("footer[backgroundColor]",obj.footerBackground)
    formData.append("footer[text]",obj.footertext)
    formData.append("backgroundImage",obj.backgroundImage)
    formData.append("isActive",true);
    result.forEach((data,indx)=>{
        formData.append(`menus[${indx}][backgroundColor]`,data.backgroundColor);
        formData.append(`menus[${indx}][text]`,data.text)
        formData.append(`menus[${indx}][menuId]`,data.menuId)
    })
    debugger;
    // let data = {
    //     products: obj.products,
    //     subMenuId: obj.subValue
    // }
    // console.log(data)
    return (dispatch)=>{
        fetch(url, {
			method: "POST",
			headers: { 
                'Authorization':  `Bearer ${ getCookie("access_token") } `,
                // 'content-type':'application/json'
			  },
			body: formData,
		})
			.then((response) => {
				return response.json();
            })
            .then((res)=>{
                console.log(res)
                if (res && res.type && res.type === "success") {
                   
				
					dispatch(
						AddOffer.addOfferAction({
                            message: res.message,
                            isSuccess: true,
                            data: res.data,
                            apiCall: "Add Offers"
                        })
					);
				} else {
                   
					dispatch(
						AddOffer.addOfferAction({
                            message: res.message,
                            isSuccess: false,
                            apiCall: "Add Offers"
                        })
					);
				}
            })
            .catch(err=>{
                console.log("server")
                dispatch(
                    AddOffer.addOfferAction({
                        message: "Server Error",
                        isSuccess: false,
                        apiCall: "Add Offers"
                    })
                );
            })
    }
}