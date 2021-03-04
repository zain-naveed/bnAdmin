import * as FeatureProducts from '../../action/storeAdminAction/featureAction';
// import * as ApiCallsAction from '../../action/apiCallsStatus';
import { getCookie } from '../../cookies/cookies';
import { Constants } from '../../constants';

export function FeatureProduct() {
    let url = Constants.apiUrl + `store/listStoreFeaturedProducts`
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
                        FeatureProducts.featureProduct({
                            data: res && res.data && res.data.products && res.data.products.length > 0 ?  res.data.products:"",
                            isSuccess: true,
                            message: res.message,
                            apiCall: "Feature Porduct list"
                        })
                        );
                   
                } else {
                    dispatch(
                        FeatureProducts.featureProduct({
                              isSuccess: false,
                              message: res.message,
                              apiCall: "Feature Porduct list"
                          })
                          );
                }
            })
            .catch(err => {
                dispatch(
                    FeatureProducts.featureProduct({
                          isSuccess: false,
                          message: "Server Error",
                          apiCall: "Feature Porduct list"
                      })
                      );
            })
    }

}