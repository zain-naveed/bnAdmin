import {Constants} from '../../constants';
import * as offerAction from '../../action/storeAdminAction/OfferAction';
import {getCookie} from '../../cookies/cookies';


export function OfferbyIdService(id){
    const url = Constants.apiUrl + `store/getOfferById/${id}`;
    
    return (dispatch)=>{
        fetch(url, {
			method: "GET",
			headers: { 
                'Authorization':  `Bearer ${ getCookie("access_token") } `,
                'content-type':'application/json'
            }
		})
			.then((response) => {
				return response.json();
            })
            .then((res)=>{
                console.log(res)
                if (res && res.type && res.type === "success") {
                    dispatch(
                        offerAction.GetOfferbyId({
                            data:res.data,
                            isSuccess:true,
                          message:res.message,
                          apiCall:"single Offer" 
                        })
                    )
                   
				} else {
                    
					dispatch(
                        offerAction.GetOfferbyId({
                            isSucces:false,
                          message:res.message,
                          apiCall:"single Offer"
                        })
                    )
				}
            })
            .catch(err=>{
                console.log("server");
                dispatch(
                    offerAction.GetOfferbyId({
                        isSucces:false,
                          message:"Server Error",
                          apiCall:"single Offer"
                    })
                )
               
            })
    }
}