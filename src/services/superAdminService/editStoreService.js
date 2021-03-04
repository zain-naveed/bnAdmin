import * as EditStore from '../../action/editStoreAction';
import { Constants } from "../../constants";
import { getCookie } from "../../cookies/cookies";


export function EditStoreService(obj) {
    var serurl = Constants.apiUrl + "users/updateStoreUser";
    console.log(obj)
    let data = {
        firstName:obj.finame,
        lastName:obj.laname,
        isActive:true,
        userId:obj.id ? obj.id : obj.ids ,
        roleId:obj.role
    }
    
    debugger;

    return (dispatch)=>{
        fetch(serurl,{
            method:"POST",
            headers: {
                'Authorization':  `Bearer ${ getCookie("access_token") } `,
                'content-type':'application/json'
            },
            
            body: JSON.stringify(data)
        })
        .then(response=>{
            return response.json();
        })
        .then(res=>{
            console.log(res)
            if(res && res.type && res.type === "success"){
                    dispatch(
                        EditStore.editStore({
                            message: res.message,
							store: res.data,
							isSuccess:true,
							apiCall: "Edit Store",
                        })
                    )
            }else{
                dispatch(
                    EditStore.editStore({
                        message: res.message,
                        isSuccess:false,
                        apiCall: "Edit Store",
                    })
                )
            }
        }).catch(e=>{
            dispatch(
                EditStore.editStore({
                    message: "Server Error",
                    isSuccess:false,
                    apiCall: "Edit Store",
                })
            )
        })   
    }
}