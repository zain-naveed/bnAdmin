import React, { useEffect, useState } from 'react';
import TopMenu from '../topMenue';
import { Tabs, Tab ,Form, Modal,Button,Spinner } from 'react-bootstrap';
import EditStoreUser from './EditStoreBySuperAdmin/editStoreUser';
import EditCustomStore from './EditStoreBySuperAdmin/editCustomStore';
import { getStoreUserId } from '../../services/superAdminService/getStoreUserIdService';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import EditMenu from './EditStoreBySuperAdmin/editMenu';
import EditProductStore from './EditStoreBySuperAdmin/editProductStore';
import EditSuperMenus from './EditStoreBySuperAdmin/editSuperMenus';
import EditHeaderBackground from './EditStoreBySuperAdmin/editHeaderBackground';
import {EditStoreService} from '../../services/superAdminService/editStoreService';
import {setApiCallsStatus} from '../../action/apiCallsStatus';
import {getCookie} from '../../cookies/cookies';
import ListUserEachStore from './EditStoreBySuperAdmin/listUserEachStore';
export default function EditStore() {
  const [loadingStatus,setLoadingStatus] = useState(true);
  const [logoImage,setLogoImage]= useState("");
  const [cover,setCover]= useState("");
  const [databoolean,setdataboolean]=useState(true);
  const [storeUser,setStoreUser] = useState([]);

  const [show, setShow] = useState(false);

	const [finame, setfname] = useState("");
	const [laname, setlName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [logo, Setlogo] = useState("");
	const [errorFor, setErrorFor] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
  const [btnLoading, setbtnLoading] = useState(false);
  const [ids,setId] = useState("");
  const dispatch = useDispatch();
  const param = useParams();
  let { id } = param;
  useEffect(() => {
    setLoadingStatus(true)
    dispatch(
      getStoreUserId(id)
    );
  },[]);
  const apiStatus = useSelector(state => state.apiCallStatus);
  const individualStore = useSelector(state => state.GetStoreUserId);
  
  if(apiStatus.isSuccess &&
     individualStore &&
    Object.keys(individualStore).length > 0 &&
    Object.keys(apiStatus).length > 0 && loadingStatus
       ){
        setLoadingStatus(false);
        // setTimeout(() => {
        //   dispatch(
        //     setApiCallsStatus({})
        //   )
        // }, 3000);
       }
    else if(
      !apiStatus.isSuccess
      && Object.keys(apiStatus).length > 0
      && loadingStatus
    ){
      setLoadingStatus(false);
      // setTimeout(() => {
      //   dispatch(
      //     setApiCallsStatus({})
      //   )
      // }, 3000);
    }
    
//     if(individualStore &&
//       Object.keys(individualStore).length > 0 &&
//       individualStore.data &&
//       Object.keys(individualStore.data).length > 0 &&
//       individualStore.data.users && individualStore.data.users.length > 0
//       &&
//       storeUser.length === 0
//       && !loadingStatus
//       ){
//         setLoadingStatus(true)
//         const listRoles = getCookie("listRoles");
//         console.log(listRoles)
//         const rawData = []
//           individualStore.data.users.forEach(element => {
//             if(element.roleId !== "5fddb9680a4e690017c0fc53"){
//                 rawData.push(element)
//             }
//           });
//           // setStoreUser(filter);
//         console.log(listRoles);
//         console.log("rawData",rawData)
//         setStoreUser(rawData)
//       }
// console.log(Object.keys(individualStore).length);
// console.log(storeUser)
// var roles = getCookie("listRoles");
// 	var rolelist = [];

// 	for (let subindex = 0 + 1; subindex < roles.roles.length; subindex++) {
// 		if (roles.roles[subindex - 1].id !== "5fddb9680a4e690017c0fc52" && roles.roles[subindex].id !== "5fddb9680a4e690017c0fc53") {
// 			rolelist.push(roles.roles[subindex])
// 		}

// 	}
// const resetErrorMsg = () => {
//   setErrorMsg("");
//   setErrorFor("");
// };
// const handleFile = (e) => {
//   resetErrorMsg();
//   console.log(e.target.files[0]);
//   const LogoFile = e.target.files[0];
//   Setlogo(LogoFile);
// };
// const ValidateInfo = () => {
//   if (finame === "") {
//     setErrorFor("fName");
//     setErrorMsg("First Name is required");
//     return false;
//   } else if (laname === "") {
//     setErrorFor("lName");
//     setErrorMsg("Last Name is required");
//     return false;
//   } else if (email === "") {
//     setErrorFor("email");
//     setErrorMsg("Email is required");
//     return false;
//   } else if (!/\S+@\S+\.\S+/.test(email)) {
//     setErrorFor("email");
//     setErrorMsg("Please enter valid email");
//     return false;
//   }
  
//   else if (role === "") {
//     setErrorFor("role");
//     setErrorMsg("Role is required");
//     return false;
//   }
  
//   else {
//     return true;
//   }
// };
// const submitForm = (e) => {
//   e.preventDefault();
//   console.log("validte")
//   let value = ValidateInfo();
//   if (value) {
    
//     dispatch(
//       EditStoreService({finame,laname,ids,role})
//     )
//     setbtnLoading(true)
//   }

// }
// const handleClose = () => setShow(false);
//   const handleShow = (obj) =>{ 
//     console.log(obj);
//     setfname(obj.firstName);
//     setlName(obj.lastName);
//     setRole(obj.roleId);
//     setEmail(obj.email);
//     setId(obj.id);
//     setShow(true);
//   }
const getStoreLogoImage = (image)=>{
  
  setLogoImage(image);
}
const getStoreCoverImage = (image)=>{
    setCover(image)
}
// console.log(logoImage)
  return <>
    <div className="main-content singlemenu">
      <LoadingOverlay active={loadingStatus} spinner text="Loading..." >
      <TopMenu user="Store"  />
     
      <div className="container">
        
   
  {
   apiStatus.apiCall === "Store User" && apiStatus.isSuccess &&  Object.keys( individualStore).length > 0 ? 
    <div className="container-fluid">
    <div className="main-content-body">
    <EditHeaderBackground setlogoimage={getStoreLogoImage} setHeader={getStoreCoverImage} />
      <div class="container bootstrap snippet card py-4">
        <div class="row d-flex justify-content-center">

          <div className="col-sm-9">

            <Tabs defaultActiveKey="Custom Store" id="uncontrolled-tab-example" >
              <Tab eventKey="Custom Store" title="Custom Store">
                <EditCustomStore storeLogoImage={logoImage} storecoverimage={cover} />
              </Tab>



              <Tab eventKey="Store User" title="Store User"  >
                <EditStoreUser />
              </Tab>


              <Tab eventKey="Menu" title="Menu">
                {/* <EditMenu /> */}
                <EditSuperMenus />
              </Tab>
              <Tab eventKey="Product" title="Product">
              <EditProductStore />
              </Tab>
                  
            </Tabs>
            
          </div>

        </div>
      </div>
      <div className="container">

        {/* {
          console.log(individualStore)
        } */}
        <ListUserEachStore />
        

      </div>


    </div>

  </div>


: 
apiStatus.isSuccess && Object.keys(individualStore).length === 0 ? 
<div>No Data Found</div> :
!apiStatus.isSuccess && Object.keys(individualStore).length === 0 ?
<div>
  {apiStatus.message}
</div>
: ""
  }

</div>
      </LoadingOverlay>

    </div>
  </>
}