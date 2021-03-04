import React,{useState,useEffect} from 'react';
import {AddStoreUserService} from '../../../services/superAdminService/addStoreUser';
import {useDispatch,useSelector} from 'react-redux';


function Success(props){
    const dispatch = useDispatch();
    const [fristname,setfirstName] = useState('');
    const [lastName,setlastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('');
    const [logo,setLogo] = useState("");
    const addUser = useSelector(state=>state.addStoreUser);
    const status = useSelector(state =>state.apiCallStatus);
    console.log(status)
    useEffect(()=>{
        setfirstName(props.succ.fname);
        setlastName(props.succ.lname);
        setEmail(props.succ.email);
        setPassword(props.succ.num);
        setRole(props.succ.role)
        setLogo(props.succ.logo)
        
    })
    const {isSuccess,message} = status;
    console.log(props.succ)
    var success = props.succ;
    const handleSubmit = (e)=>{
        e.preventDefault();
        setfirstName(props.succ.fname);
        setlastName(props.succ.lname);
        setEmail(props.succ.email);
        setPassword(props.succ.num);
        setRole(props.succ.role)
        console.log({fristname,lastName,email,password,role})
        dispatch(AddStoreUserService({fristname,lastName,email,password,role,logo}))
    }
    console.log({fristname,lastName,email,password,role,logo})
    return     <div className="d-flex justify-content-center"  >
        
    <div className="card mb-3" style={{width:"40rem"}}>
    {
            isSuccess ? "" : message
        }
        <form className="form" onSubmit={handleSubmit} >
              <div className="card-body" >
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">First Name</h6>
                  </div>
                  <div className=" col-4 text-secondary ">
                    {fristname}
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Last Name</h6>
                  </div>
                  <div className="col-4 text-secondary ">
                    {lastName}
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Email</h6>
                  </div>
                  <div className="col-4 text-secondary ">
                    {email}
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Password</h6>
                  </div>
                 
                  <div className="col-4 text-secondary ">
                  
                        {password}
                    
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Role</h6>
                  </div>
                 
                  <div className="col-4 text-secondary ">
                  
                        {role}
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                  <div className="col-3">
                    <h6 className="mb-0 text-white">Logo</h6>
                  </div>
                 
                  <div className="col-4 text-secondary ">
                  
                       {
                           logo.name
                       }
                    
                    </div>
                </div>
                <hr />

              </div>
              <div className="text-center my-4">
              <button className="btn btn-secondary btn-block py-2" type="submit">submit</button>
              </div>
              </form>
            </div>
    </div>
}
export default Success;