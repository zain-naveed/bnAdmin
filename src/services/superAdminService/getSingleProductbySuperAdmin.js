import * as GetProduct from '../../action/getSingleProductbySuperAdmin';
// import * as ApiCallsAction from '../../action/apiCallsStatus';
import { getCookie } from '../../cookies/cookies';
import { Constants } from '../../constants';

export function getSingleProductbySuperAdmin(id) {

    let url = Constants.apiUrl + `store/getSuperProductById/${id}`
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
                      GetProduct.getProductSingle({
                            data: res.data.product,
                            isSuccess: true,
                            message: res.message,
                            apiCall: "Get Single Product by Super Admin"
                        })
                        );
                   
                } else {
                    dispatch(
                        GetProduct.getProductSingle({
                              isSuccess: false,
                              message: res.message,
                              apiCall: "Get Single Product by Super Admin"
                          })
                          );
                }
            })
            .catch(err => {
                dispatch(
                    GetProduct.getProductSingle({
                          isSuccess: false,
                          message: "Server Error",
                          apiCall: "Get Single Product by Super Admin"
                      })
                      );
            })
    }

}