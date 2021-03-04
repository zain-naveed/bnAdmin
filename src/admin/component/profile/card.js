import React from 'react';
import {useSelector} from 'react-redux';
function Card({show,response}) {
    // console.log(!response)
    const useridData = useSelector(state=>state.GetStoreUserId);
    const profile = useSelector(state=>state.profileToken);
    console.log(profile)
    return (
    <>
    {
      show === "store user" ?  <div className="card mb-3">
      <div className="card-body" style={{padding:"50px"}}>
        {
            !useridData.data ?   "Loading..." : <>
            <div className="row d-flex justify-content-between">
          <div className="col-sm-4">
            <h6 className="mb-0 text-white">URl</h6>
          </div>
          <div className="col-sm-4 text-white">
            {useridData.data.URL}
            </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-between" >
          <div className="col-sm-4">
            <h6 className="mb-0 text-white">Background</h6>
          </div>
          <div className="col-sm-4 text-secondary">
           { useridData.data.background}
            </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-between">
          <div className="col-sm-4">
            <h6 className="mb-0 text-white">name</h6>
          </div>
          <div className="col-sm-4 text-secondary">
            {useridData.data.name}
            </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-between">
          <div className="col-sm-4">
            <h6 className="mb-0 text-white">subUrl</h6>
          </div>
          <div className="col-sm-4 text-secondary">
            {useridData.data.subURL}
            </div>
        </div>
        <hr />
          
          </>
          
        }
        

      </div>
    </div> :  <div className="card mb-3">
      
              <div className="card-body" style={{padding:"50px"}}>
                {
                  !profile.data ? "Loading..." : <>
                  <div className="row d-flex justify-content-between">
                  <div className="col-sm-4">
                    <h6 className="mb-0 text-white">First Name</h6>
                  </div>
                  <div className="col-sm-4 text-secondary">
                    {
                      profile.data.firstName
                    }
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between" >
                  <div className="col-sm-4">
                    <h6 className="mb-0 text-white">Last Name</h6>
                  </div>
                  <div className="col-sm-4 text-secondary">
                   {
                     profile.data.lastName
                   }
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-sm-4">
                    <h6 className="mb-0 text-white">Email</h6>
                  </div>
                  <div className="col-sm-4 text-secondary">
                   {
                     profile.data.email
                   }
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-sm-4">
                    <h6 className="mb-0 text-white">Role</h6>
                  </div>
                  <div className="col-sm-4 text-secondary">
                   {
                     profile.data.role
                   }
                    </div>
                </div>
                <hr />
                  </>
                }
                

              </div>
            </div>
    }
   
    </>
    );
}
export default Card;