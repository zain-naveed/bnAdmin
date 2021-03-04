import React,{useState} from 'react';
import {Form,Modal,Spinner,Button} from 'react-bootstrap'
import {EditStoreService} from '../../../services/superAdminService/editStoreService';
import { getStoreUserId } from '../../../services/superAdminService/getStoreUserIdService';
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getCookie} from '../../../cookies/cookies';
import {editStore} from '../../../action/editStoreAction';
export default function ListUserEachStore(){
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
  const editStoreStatus = useSelector(state=>state.editStore);
  const param = useParams();
  let { id } = param;
console.log(editStoreStatus);
if(editStoreStatus &&
	Object.keys(editStoreStatus).length > 0 &&
	editStoreStatus.isSuccess 
	&& btnLoading && show
	){
		setbtnLoading(false);
			setErrorFor("StoreUserEdit");
			setErrorMsg(editStoreStatus.message);
			setfname("");
				setlName("");
				setEmail("");
				setRole("");
				setTimeout(() => {
					setErrorMsg("");
					setErrorFor("");
					setShow(false);
					dispatch(
						getStoreUserId(id)
					)
					dispatch(
						editStore({})
					)
				}, 3000);

	}
	else if(
		editStoreStatus &&
	Object.keys(editStoreStatus).length > 0 &&
	!editStoreStatus.isSuccess 
	&& btnLoading && show
	){
		setbtnLoading(false);
			setErrorFor("StoreUserEdit");
			setErrorMsg(editStoreStatus.message);
			setfname("");
				setlName("");
				setEmail("");
				setRole("");
				setTimeout(() => {
					setErrorMsg("");
					setErrorFor("");
					setShow(false);
					dispatch(
						getStoreUserId(id)
					)
					dispatch(
						editStore({})
					)
				}, 3000);
	}
  const individualStore = useSelector(state => state.GetStoreUserId);
  var roles = getCookie("listRoles");
	var rolelist = [];

	for (let subindex = 0 + 1; subindex < roles.roles.length; subindex++) {
		if (roles.roles[subindex - 1].id !== "5fddb9680a4e690017c0fc52" && roles.roles[subindex].id !== "5fddb9680a4e690017c0fc53") {
			rolelist.push(roles.roles[subindex])
		}

	}
  const resetErrorMsg = () => {
    setErrorMsg("");
    setErrorFor("");
  };
  const ValidateInfo = () => {
    if (finame === "") {
      setErrorFor("fName");
      setErrorMsg("First Name is required");
      return false;
    } else if (laname === "") {
      setErrorFor("lName");
      setErrorMsg("Last Name is required");
      return false;
    } else if (email === "") {
      setErrorFor("email");
      setErrorMsg("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorFor("email");
      setErrorMsg("Please enter valid email");
      return false;
    }
    else if (role === "") {
      setErrorFor("role");
      setErrorMsg("Role is required");
      return false;
    }
    else {
      return true;
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log("validte")
    let value = ValidateInfo();
    if (value) {
      console.log({finame,laname,ids,role})
      dispatch(
        EditStoreService({finame,laname,ids,role})
      )
      setbtnLoading(true)
    }
  
  }
  const handleClose = () => setShow(false);
    const handleShow = (obj) =>{ 
      console.log(obj);
      setfname(obj.firstName);
      setlName(obj.lastName);
      setRole(obj.roleId);
      setEmail(obj.email);
      setId(obj.id);
      setShow(true);
    }
  
    return (
        <>
              <ul class="list-group wd-md-100p users-list-group">
      {
          individualStore && individualStore.data && individualStore.data.users.length > 0 ? individualStore.data.users.map((store,indx)=>{
            if(store.roleId !== "5fddb9680a4e690017c0fc53"){
              return <li class="list-group-item d-flex align-items-center" key={indx}>
              <img alt="" class="mr-3 rounded-circle avatar-md" src={store.profileImageURL} />
              <div>
                <h6 class="tx-15 mb-1 tx-inverse tx-semibold mg-b-0">{store.firstName}</h6><span class="d-block tx-13 text-muted">{store.email}</span>
              </div>
              <div class="d-flex float-left ml-auto">
                <a href="javascript:void(0)" onClick={()=>handleShow(store)} class="btn btn-primary btn-icon mr-2">
                <div class=""><i class="bx bx-edit" ></i></div>
                </a>
                {/* <a href="#" class="btn btn-danger btn-icon">
                  <div class=""><i class="bx bx-edit"></i></div>
                </a> */}
              </div>
            </li>
            
          
            }
         
          }) :"No Store User Found"
        }
        
        <Modal
													show={show}
													onHide={handleClose}
													backdrop="static"
													keyboard={false}
												>
												<Form onSubmit={submitForm}>
														<Modal.Body className="text-white">

															<Form.Group controlId="formBasicfname">
																<Form.Label>First Name</Form.Label>
																<Form.Control type="text" defaultValue={finame} disabled={btnLoading ? true:false
																} placeholder="Enter First Name" onChange={(e) => {
																	setfname(e.target.value);
																	resetErrorMsg();
																}}
																/>
																{errorFor === "fName" && errorMsg !== "" ? (
																	<div className="alert alert-danger mt-2">{errorMsg}</div>
																) : (
																		""
																	)}

															</Form.Group>
															<Form.Group controlId="formBasiclname">
																<Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name"
                                defaultValue={laname}
																disabled={btnLoading ? true:false
																}
																	onChange={(e) => {
																		setlName(e.target.value);
																		resetErrorMsg();
																	}}
																/>
																{errorFor === "lName" && errorMsg !== "" ? (
																	<div className="alert alert-danger mt-2">{errorMsg}</div>
																) : (
																		""
																	)}
															</Form.Group>
															<Form.Group controlId="formBasicemail">
																<Form.Label>Email</Form.Label>
																<Form.Control type="email"
                                  placeholder="example@gmail.com"
                                  defaultValue={email}
																	disabled={btnLoading ? true:false
																	}
																	onChange={(e) => {
																		setEmail(e.target.value);
																		resetErrorMsg();
																	}}
																/>
																{errorFor === "email" && errorMsg !== "" ? (
																	<div className="alert alert-danger mt-2">{errorMsg}</div>
																) : (
																		""
																	)}
															</Form.Group>
															<Form.Group>
																<Form.Label>Role</Form.Label>
																<select
																	onChange={(e) => {
																		setRole(e.target.value);
																		resetErrorMsg();
																	}}
																	className="custom-select"
																	disabled={btnLoading ? true:false
																	}
																>
																	<option selected value="">Selct Role</option>
																	{/* <option value="SuperAdmin">SuperAdmin</option> */}
																	{/* <option value="StoreAdmin">StoreAdmin</option> */}
																	{
																		rolelist.map((roles, indx) => {
                                   return   role === roles.id ? 
																			 <option value={roles.id} key={indx} selected>{roles.name}</option>
                                      : <option value={roles.id} key={indx}>{roles.name}</option>
																		})
																	}
																</select>
																{errorFor === "role" && errorMsg !== "" ? (
																	<div className="alert alert-danger mt-2">{errorMsg}</div>
																) : (
																		""
																	)}
															</Form.Group>
															{/* <Form.Group>
																<label for="inputEmail4">Profile Image</label>
																<input
																	type="file"
																	id="file"
																	style={{ display: "none" }}
																	className="form-control"
																	onChange={handleFile}
																	disabled={btnLoading ? true:false
																	}
																/>
																<label htmlFor="file" style={{ width: "100%", }} >
																	<div
																		className="upload-button"
																		style={{ border: "1px solid #3D4458", padding: "4px 0" }}
																		
																	>
																		<svg
																			data-v-445d13bf=""
																			className="icon"
																			style={{ height: "30px", cursor: "pointer", width: "100%" }}
																			viewBox="0 0 24.02 21.01"
																		>
																			<g id="Layer_2" data-name="Layer 2">
																				<path
																					d="M9.28 5.62L7.87 4.2l4.2-4.2 4.22 4.22-1.42 1.41-1.79-1.79V15h-2V3.82zM24 18v-7h-2v7a1 1 0 01-1 1H3a1 1 0 01-1-1v-7H0v7a3 3 0 003 3h18a3 3 0 003-3z"
																					id="Layer_1-2"
																					data-name="Layer 1"
																				></path>
																			</g>
																		</svg>
																		<div className="text-center mt-1">
																			{logo ? logo.name : ""}
																		</div>
																	</div>
																</label>

																{errorFor === "logo" && errorMsg !== "" ? (
																	<div className="alert alert-danger mt-2">{errorMsg}</div>
																) : (
																		""
																	)}
															</Form.Group> */}

															<Form.Group controlId="formBasicCheckbox">
															</Form.Group>
															{
																errorFor === "StoreUserEdit" && errorMsg !== "" ? 
																<div className="alert alert-success">
																	{errorMsg}
																</div>:""
															}

														</Modal.Body>
														<Modal.Footer>
															<Button variant="btn btn-default" onClick={handleClose}>
																Close
          </Button>
															<Button variant="primary" type="submit" 
															
														
															disabled={btnLoading ? true:false } >
																{
																	btnLoading ? <Spinner
																	as="span"
																	animation="grow"
																	size="sm"
																	role="status"
																	aria-hidden="true"
																/>: "Update"
																}
																
																</Button>
														</Modal.Footer>
													</Form>
												</Modal>

	</ul>


        </>
    )
}