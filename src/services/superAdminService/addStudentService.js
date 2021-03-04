import * as AddStudent from "../../action/addStudentAction";
import {getCookie} from '../../cookies/cookies';
import { Constants } from "../../constants";

export function addStudentService(obj){
    let url = Constants.apiUrl + "store/addStoreSuperMenus";
    console.log(arr)

    let data = {
        superMenus: obj
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
                if (res && res.type && res.type === "success") {
                   dispatch(
                       AddStudent.addStudentAction({
                           isSuccess:true,
                           message:res.message,
                           data:res.data,
                           apiCall:"Add Student"
                       })
                   )
				
					
				} else {
                    dispatch(
                        AddStudent.addStudentAction({
                            isSuccess:false,
                            message:res.message,
                            apiCall:"Add Student"
                        })
                    )
					
				}
            })
            .catch(err=>{
                console.log("server")
                dispatch(
                    AddStudent.addStudentAction({
                        isSuccess:false,
                        message:"Server Error",
                        apiCall:"Add Student"
                    })
                )
            })
    }
}