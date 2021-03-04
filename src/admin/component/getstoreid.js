import React,{useEffect,useState} from 'react';
import TopMenu from '../topMenue'
import {useParams} from 'react-router-dom';
import {getStoreUserId} from '../../services/superAdminService/getStoreUserIdService';
import {useDispatch,useSelector} from 'react-redux';
// import ProfileCard from './profile/ProfileCard';
import {Tabs,Tab} from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
// import ProfileList from './profile/list';
// import Card from './profile/card';
import ViewCustomStore from './storeView/viewCustomstore';
import ViewStoreUser from './storeView/viewStoreUser';
import ViewMenu from './storeView/viewMenu';
import ViewProductStore from './storeView/viewProduct';
import ListUserEachStore from './EditStoreBySuperAdmin/listUserEachStore';

function GetstoreAdminSuperAdminId(){
  const [loadingStatus,setLoadingStatus]= useState(false);
    const param = useParams();
    let dispatch = useDispatch();
    let {id} = param;
    useEffect(()=>{
       setLoadingStatus(true);
        dispatch(
        getStoreUserId(id)
        )
},[dispatch])

const apiStatus = useSelector(state => state.apiCallStatus);
const individualStore = useSelector(state=>state.GetStoreUserId);
console.log(individualStore)
console.log(apiStatus)
if(apiStatus && apiStatus.isSuccess && apiStatus.apiCall === "Store User" && loadingStatus ){
  setLoadingStatus(false);
}
if(apiStatus && !apiStatus.isSuccess && apiStatus.apiCall === "Store User" && loadingStatus){
  setLoadingStatus(false);
}
// console.log(useridData)
    return <>   
<div className="main-content singlemenu">
      <LoadingOverlay active={loadingStatus} spinner text="Loading..." >
      <TopMenu user="Store" />
  {
   apiStatus.apiCall === "Store User" && apiStatus.isSuccess &&  Object.keys(apiStatus).length > 0 
   && individualStore && individualStore.data && Object.keys(individualStore.data).length > 0
   ? 
    <div className="container-fluid">
    <div className="main-content-body">

      <div class="container bootstrap snippet card py-4">
        <div class="row d-flex justify-content-center">

          <div className="col-sm-9">

            <Tabs defaultActiveKey="Custom Store" id="uncontrolled-tab-example" >
              <Tab eventKey="Custom Store" title="Custom Store">
                <ViewCustomStore />
              </Tab>



              <Tab eventKey="Store User" title="Store User"  >
               <ViewStoreUser />
              </Tab>


              <Tab eventKey="Menu" title="Menu">
        
                <ViewMenu />
              </Tab>
              <Tab eventKey="Product" title="Product">
                <ViewProductStore />
              </Tab>
                  
            </Tabs>
          </div>

        </div>

      </div>




    <div className="container">
    <ListUserEachStore />
    </div>



    </div>

  </div>

: 
apiStatus.isSuccess && Object.keys(apiStatus).length === 0 ? 
<div>No Data Found</div> :
!apiStatus.isSuccess && Object.keys(apiStatus).length > 0 ?
<div className="container">
  {apiStatus.message}
</div>
:""
  }


      </LoadingOverlay>

    </div>
{/* 
    <div className="main-content singlemenu">
				
                <TopMenu user="Get Store User by Id" />			
                <div className="container mt-4">
        <div className="main-body">
          <div className="row gutters-sm">
            {
              apiStatus.isSuccess ? <>
              <div className="col-md-4 mb-3">
              
              <ProfileCard show="store user" />
        
            </div>
            <div className="col-md-8">
              
                 <Card show="store user" />
              
            
            </div>
              </> : "Loading...."
            }
            
          </div>
        </div>
      </div>
</div> */}

</>
}
export default GetstoreAdminSuperAdminId;
