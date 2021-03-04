import {getCookie,setCookie} from '../../cookies/cookies';
import * as forgot from '../../action/forgotAction';
import * as apiStatus from '../../action/apiCallsStatus';
import {Constants} from '../../constants';
export function forgotService(obj){
    var url = Constants.apiUrl + "users/passwordResetRequest";
    
    debugger;
    console.log(obj.email)
    let data = {
        email: obj.email
    }
    return (dispatch)=>{
        fetch(url,{
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            return response.json();
        })
        .then((res)=>{
            console.log(res)
            if(res && res.type === "success"){
                
                dispatch(
                    forgot.forgotAction({
                        isSuccess: true,
                        type:res.type,
                        message:res.message,
                        apiCall: "forgot"
                    })
                )
            }else{
                dispatch(
                    apiStatus.setApiCallsStatus({
                        isSuccess:false,
                        message: res.message,
						apiCall: "forgot",
                    })
                )
            }
        })
        .catch(e=>{
            dispatch(
                apiStatus.setApiCallsStatus({
                    isSuccess: false,
                    message: "Error in Login APi",
                    apiCall: "forgot",
                })
            );
        })
    }
}