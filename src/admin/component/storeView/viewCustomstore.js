import React from 'react';
import {useSelector} from 'react-redux';
// import {} from 'react-bootstrap';
export default function ViewCustomStore(){
    const individualStore = useSelector(state=>state.GetStoreUserId);
console.log(individualStore)
    return (
        <>
        <form className="form" >
              <div className="card-body" >
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Store Name</h6>
                  </div>
                  <div className=" col-4 text-secondary ">
                    {individualStore.data.name}
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-4">
                    <h6 className="mb-0 text-white">Background Color</h6>
                  </div>
                 
                  <div className="col-4 text-secondary ">
                  
                        {individualStore.data.background}
                    
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">URL</h6>
                  </div>
                 
                  <div className="col-4 text-secondary text-left ">
                  
                        {individualStore.data.URL}
                    
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">email</h6>
                  </div>
                  <div className="col-4 text-secondary text-left">
                    {individualStore.data.email}
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">mobile</h6>
                  </div>
                  <div className="col-4 text-secondary ">
                    {individualStore.data.mobile}
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-4">
                    <h6 className="mb-0 text-white">Education Type</h6>
                  </div>
                  <div className="col-4 text-secondary ">
                    {individualStore.data.edu_type}
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">URL</h6>
                  </div>
                 
                  <div className="col-4 text-secondary text-left">
                  
                        {individualStore.data.URL}
                    
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Sub URL</h6>
                  </div>
                 
                  <div className="col-4 text-secondary ">
                  
                        {individualStore.data.subURL}
                    
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Bg Image</h6>
                  </div>
                 
                  <div className="col-12 mt-3 text-secondary ">
                  
                        <img src={individualStore.data.cover} style={{width:"100%",height:"20rem"}} />
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Logo</h6>
                  </div>
                 
                  <div className="col-10 text-secondary mt-4">
                    <img src={individualStore.data.logo} style={{width:"40%",height:"12rem"}} />
                    
                    </div>
                </div>
                <hr />

              </div>
             
              </form>
         
        
        </>
    )
}