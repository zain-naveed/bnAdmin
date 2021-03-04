import React,{useState} from 'react';
import {useSelector} from 'react-redux';
export default function ViewStoreUser(){
    const individualStore = useSelector(state=>state.GetStoreUserId);
    const [storeUser,setStoreUser] = useState({});
console.log(individualStore);
if(individualStore &&
   individualStore.data &&
  individualStore.data.users &&
  Object.keys(storeUser).length === 0
  ){
      individualStore.data.users.forEach((obj)=>{
        console.log(obj)
        if(obj.roleId === "5fddb9680a4e690017c0fc53"){
          setStoreUser(obj);
      }
      })
  }
  console.log(storeUser)
    return (
        <>
        <form className="form" >
              <div className="card-body" >
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Frist Name</h6>
                  </div>
                  <div className=" col-4 text-secondary ">
                    {storeUser.firstName}
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-4">
                    <h6 className="mb-0 text-white">Last Name</h6>
                  </div>
                 
                  <div className="col-4 text-secondary ">
                  
                        {storeUser.lastName}
                    
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Email</h6>
                  </div>
                 
                  <div className="col-4 text-secondary text-left ">
                  
                        {storeUser.email}
                    
                    </div>
                </div>
               
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Role</h6>
                  </div>
                  <div className="col-4 text-secondary ">
                    Store Admin
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-4">
                    <h6 className="mb-0 text-white">Profile Image</h6>
                  </div>
                  <div className="col-10 text-secondary   mt-4 ">
                    {
                      console.log(storeUser)
                    }
                    <img src={storeUser.profileImageURL ? storeUser.profileImageURL :"https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg" } className="img-fluid" style={{height:"20rem",width:"20rem"}} />
                    </div>
                </div>
                {/* <hr />   */}
               
           

              </div>
             
              </form>
         
        
        </>
    );
}