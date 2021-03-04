import {Constants} from '../../constants';
import * as offerAction from '../../action/storeAdminAction/OfferAction';
import {getCookie} from '../../cookies/cookies';


export function updateOfferService(obj){
    const url = Constants.apiUrl + "store/updateOffer";
    var menus = obj && obj.resultMenu ? obj.resultMenu :"";
    console.log(obj);
    debugger;
    let bodyform = new FormData();
    bodyform.append("header[backgroundColor]",obj.headerBackground);
    bodyform.append("header[text]",obj.headertext);
    bodyform.append("body[backgroundColor]",obj.bodybackground);
    bodyform.append("body[text]",obj.bodyText);
    bodyform.append("footer[backgroundColor]",obj.footerBackground);
    bodyform.append("footer[text]",obj.footertext);
    bodyform.append("offerId",obj.offerid);
    bodyform.append("isActive",obj.Status);
    if(obj.cover === ""){

    }else if(obj.cover === undefined){
        
    }else{
        bodyform.append("backgroundImage",obj.cover);
    }
    
    menus.forEach((data,indx) => {
        bodyform.append(`menus[${indx}][backgroundColor]`,data.backgroundColor);
        bodyform.append(`menus[${indx}][text]`,data.text)
        bodyform.append(`menus[${indx}][menuId]`,data.menuId)
    });

    return (dispatch)=>{
        fetch(url, {
			method: "POST",
			headers: { 
                'Authorization':  `Bearer ${ getCookie("access_token") } `,
			  },
			body:bodyform
		})
			.then((response) => {
				return response.json();
            })
            .then((res)=>{
                console.log(res)
                if (res && res.type && res.type === "success") {
                    dispatch(
                        offerAction.UpdateOffer({
                            isSuccess:true,
                            message:res.message,
                            apiCall:"update Offer"
                        })
                    )
                   
				} else {
                    
					dispatch(
                        offerAction.UpdateOffer({
                            isSuccess:false,
                            message:res.message,
                            apiCall:"update Offer"
                        })
                    )
				}
            })
            .catch(err=>{
                console.log("server");
                dispatch(
                    offerAction.UpdateOffer({
                        isSuccess:false,
                            message:"Server Error",
                            apiCall:"update Offer"
                    })
                )
               
            })
    }
}