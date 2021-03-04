import { getCookie} from '../cookies/cookies';
import { Constants } from '../constants';
import * as Dashboard from '../action/dashboardAction';

export function DashboardService() {

    let url = Constants.apiUrl + `users/dashboard`
    // debugger;
    return (dispatch) => {
        fetch(url, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${getCookie("access_token")}`
            }

        })
            .then(response => { return response.json() })
            .then(res => {
                console.log(res)
                if (res && res.type === "success") {
                    dispatch(
                        Dashboard.dashboardAction({
                          isSuccess:true,
                          data: res && res.data && res.data.dashboard ? res.data.dashboard : {} ,
                          message:res.message,
                           apiCall: "Dashboard Api"
                        })
                    )
                   
                } else {
                    dispatch(
                        Dashboard.dashboardAction({
                          isSuccess:false,
                          message:res.message,
                           apiCall: "Dashboard Api"
                        })
                    )
                   
        }
    })
            .catch(err => {
                dispatch(
                    Dashboard.dashboardAction({
                      isSuccess:false,
                      message:"Server Error",
                       apiCall: "Dashboard Api"
                    })
                )
            })
    }

}