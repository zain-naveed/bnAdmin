
import {Constants} from '../../constants';
import * as offerAction from '../../action/storeAdminAction/OfferAction';
import {getCookie} from '../../cookies/cookies';


export function listOfferService(){
    const url = Constants.apiUrl + "store/listOffers";
    
    return (dispatch)=>{
        fetch(url, {
			method: "GET",
			headers: { 
                'Authorization':  `Bearer ${ getCookie("access_token") } `,
                'content-type':'application/json'
			  },
		})
			.then((response) => {
				return response.json();
            })
            .then((res)=>{
                console.log(res)
                if (res && res.type && res.type === "success") {
                    dispatch(
                        offerAction.listOffer({
                          data:res.data,
                          isSuccess:true,
                          message:res.message,
                          apiCall:"list offer"  
                        })
                    )
                   
				} else {
                    
					dispatch(
                        offerAction.listOffer({
                            isSuccess:false,
                          message:res.message,
                          apiCall:"list offer"
                        })
                    )
				}
            })
            .catch(err=>{
                console.log("server");
                dispatch(
                    offerAction.listOffer({
                        isSuccess:false,
                          message:"Server Error",
                          apiCall:"list offer"
                    })
                )
               
            })
    }
}