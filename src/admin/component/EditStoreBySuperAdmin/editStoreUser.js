import React,{useState,useEffect, lazy} from 'react';
import {EditStoreService} from '../../../services/superAdminService/editStoreService';
import {useDispatch,useSelector} from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import {Modal} from 'react-bootstrap';
import {editStore} from '../../../action/editStoreAction';
import {Switch} from 'antd';
import 'antd/dist/antd.css';
import {getCookie} from '../../../cookies/cookies';
export default function EditStoreUser(){
  const [finame,setfirstname] = useState("");
  const [laname,setlastname] = useState("");
  const [email,setEmail] = useState("");
  const [isActive,setActive] = useState(true);
  const [profileImg,setProfileImg] = useState("");
  const [role,setRole] = useState("");
  const [storeUser,setStoreUser] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storeboolean,setStoreBoolean] = useState(true);
  const [storeAdmin,setStoreAdmin] = useState({});
  const dispatch = useDispatch();
  const individualStore = useSelector(state => state.GetStoreUserId);
  const apiStatus = useSelector(state=>state.editStore);
  // const user = individualStore.data.users;
 

  if(individualStore &&
    Object.keys(individualStore).length > 0 &&
    individualStore.data &&
    Object.keys(individualStore.data).length > 0 &&
    individualStore.data.users &&
    Object.keys(storeUser).length === 0
    && storeboolean
    ){
  setStoreUser(individualStore.data.users);
  setStoreBoolean(false);
      // console.log(storeUser)
      // user.forEach((respon)=>{
       
      //   if(respon.role === "StoreAdmin"){
      //       setStoreUser(respon)
      //   }else{
      //     setStoreUser(respon)
      //   }
      // })
    }
    // if()
    // console.log(storeUser)
    if(storeUser && storeUser.length > 0 && Object.keys(storeAdmin).length === 0){
      // const allRoles = getCookie("listRoles");
      // console.log(allRoles)
      storeUser.forEach(element => {
        // console.log(element.roleId)
        if(element.roleId === "5fddb9680a4e690017c0fc53"){
            setStoreAdmin(element);
        }
      });
    }
    useEffect(()=>{
      console.log("use effect");
      setfirstname(storeAdmin.firstName);
      setlastname(storeAdmin.lastName);
      setEmail(storeAdmin.email);
      setProfileImg(storeAdmin.profileImageURL);
      setRole(storeAdmin.roleId);
      setActive(storeAdmin.isActive);
    },[]);
  if(
    apiStatus &&
    Object.keys(apiStatus).length > 0 &&
    apiStatus.isSuccess &&
    loading
    ){
        
        setLoading(false);
        setShow(true);
        setTimeout(() => {
            setShow(false);
            dispatch(
            editStore({})
            )
        }, 3000);
    }
    else
    if(
        apiStatus &&
        Object.keys(apiStatus).length > 0 &&
        !apiStatus.isSuccess &&
        loading 
    ){
        setLoading(false);
        setShow(true);
        setTimeout(() => {
            setShow(false);
            dispatch(
           editStore({})
            )
        }, 3000);  
    }

  const handleSbumit = (e)=>{
    var id = storeAdmin.id;
    e.preventDefault();
    setLoading(true);
    dispatch(
    EditStoreService({finame,laname,id,role,isActive})
    )
    console.log("asd;fjl")
  }
  //  const RenderInput = ({fname,sname,typef,typeS})=>{
  //       return  <div className="form-row">
                      
                          
  //       <div class="col-6">
  //   <label for="first_name" className="mt-4"><h5 className="text-secondary">{fname}</h5></label>
  //           <input type={typef} class="form-control" value={finame} onChange={(e)=>setfirstname(e.target.value)}  name="first_name" id="first_name" placeholder={fname} title="enter your first name if any." />
  //       </div>
    

  //       <div class="col-6">
  //   <label for="last_name" className="mt-4"><h5 className="text-secondary">{sname}</h5></label>
  //           <input type={typeS} class="form-control" onChange={(e)=> setlastname(e.target.value)} name="last_name" id="last_name" placeholder={sname} title="enter your last name if any." />
  //       </div>
   
  //   </div>
  //   }
    const handleClose = () => setShow(false);
    const ModalComponent = () => {
     // console.log(apiStatus.message);
     return (
       <>
         <Modal
           show={show}
           onHide={handleClose}
           backdrop="static"
           keyboard={false}
         >
           <Modal.Body className="text-secondary text-center">
             {apiStatus.message}
           </Modal.Body>
         </Modal>
       </>
     );
   };
    return (
            <>
            <LoadingOverlay active={loading} spinner text="Loading...">
           {
            apiStatus && Object.keys(apiStatus).length > 0
            && apiStatus.isSuccess && show
            ? (
                <ModalComponent />
            ) : 
            apiStatus && Object.keys(apiStatus).length > 0
            && !apiStatus.isSuccess && show ?
            (
                <ModalComponent />
            ):"" }
                     <div class="row">
                       <div class="col-sm-3 text-center mt-3">
                         {/* <h1 className="text-white">User name</h1> */}
      
        <img src={profileImg} loading={lazy} className=" img-circle img-responsive avatar " style={{height:"200px",width:"200px"}} alt="avatar" />
        {/* <h6>Upload a different photo...</h6>
        <input type="file" class="text-center center-block file-upload" /> */}
     <hr /><br />
          </div>
  		
    	<div class="col-sm-9">
            

              
          <div class="tab-content">
            <div class="tab-pane active" id="home">
                <hr />
                  <form class="form" id="registrationForm" onSubmit={handleSbumit}>
                  <div className="form-row">
                      
                          
                      <div class="col-6">
                  <label for="first_name" className="mt-4"><h5 className="text-secondary">First Name</h5></label>
                          <input type="text" class="form-control" value={finame} onChange={(e)=>setfirstname(e.target.value)}  name="first_name" id="first_name" placeholder="enter first name" title="enter your first name if any." />
                      </div>
                  
              
                      <div class="col-6">
                  <label for="last_name" className="mt-4"><h5 className="text-secondary">Last Name</h5></label>
                          <input type="text" class="form-control" value={laname} onChange={(e)=> setlastname(e.target.value)} name="last_name" id="last_name" placeholder="Enter You last Name" title="enter your last name if any." />
                      </div>
                 
                  </div>
                  <div className="form-row">
                      
                          
                      <div class="col-12">
                  <label for="first_name" className="mt-4"><h5 className="text-secondary">Email</h5></label>
                          <input type="text" class="form-control" defaultValue={email}  name="first_name" id="first_name" placeholder="enter first name" title="enter your first name if any." />
                      </div>
                  
              
                      {/* <div class="col-6">
                  <label for="last_name" className="mt-4"><h5 className="text-secondary">Role</h5></label>
                          <input type="text" class="form-control" defaultValue={role ? "StoreAdmin"} name="last_name" id="last_name" placeholder="Enter You last Name" title="enter your last name if any." />
                      </div> */}
                      <div className="col-6 mt-2">
                        <Switch defaultChecked={isActive} ></Switch>
                      </div>
                 
                  </div>
                     
                      <div class="form-group">
                           <div class="col-xs-12">
                                <br />
                              	<button class="btn btn-lg btn-outline-dark" type="submit"><i class="glyphicon glyphicon-ok-sign"></i>Update</button>
                               	{/* <button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button> */}
                            </div>
                      </div>
              	</form>
              
              <hr />
              
             </div>
               
              </div>
          </div>

        </div>
        </LoadingOverlay>
            </>
    );
}