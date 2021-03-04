import * as GetProduct from '../../action/storeAdminAction/getProductbyidStoreAdmin';
// import * as ApiCallsAction from '../../action/apiCallsStatus';
import { getCookie } from '../../cookies/cookies';
import { Constants } from '../../constants';

export function getProductbyid(id) {

    let url = Constants.apiUrl + `store/getStoreProductById/${id}`
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
                            apiCall: "Get Single Product by Admin"
                        })
                        );
                   
                } else {
                    dispatch(
                        GetProduct.getProductSingle({
                              isSuccess: false,
                              message: res.message,
                              apiCall: "Get Single Product by Admin"
                          })
                          );
                }
            })
            .catch(err => {
                dispatch(
                    GetProduct.getProductSingle({
                          isSuccess: false,
                          message: "Server Error",
                          apiCall: "Get Single Product by Admin"
                      })
                      );
            })
    }

}