import React, { useEffect, useState } from "react";
// import { UserLogin } from "../action/userLogin";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserLogin } from "../services/superAdminService/loginService";
import LoadingOverlay from 'react-loading-overlay';
import {currentUserProfile} from '../action/userLogin';
import {setApiCallsStatus} from '../action/apiCallsStatus';
import {Modal} from 'react-bootstrap';

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorFor,setErrorFor] = useState("");
	const [errorMsg,setErrorMsg] = useState("");
	const [checkLogin,setCheckLogin] = useState(false);
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const res = useSelector((state) => state.profile);
	const apiStatus = useSelector((state) => state.apiCallStatus);
	// debugger;

	if(apiStatus && 
		Object.keys(apiStatus) && 
		apiStatus.isSuccess &&
		apiStatus.apiCall === "login" && !show

	){
		setCheckLogin(false);
		setShow(true);
		setTimeout(() => {
			// alert(apiStatus.message);
			setShow(false);
			dispatch(setApiCallsStatus({}))	
		}, 3000);
	}else if(
		apiStatus && 
		Object.keys(apiStatus) && 
		Object.keys(apiStatus).length > 0 &&
		!apiStatus.isSuccess 
		&& apiStatus.apiCall === "login" 
		&& checkLogin 
		&& !show
	){
		setCheckLogin(false);
		setShow(true);
		
		setTimeout(() => {
			// alert(apiStatus.message);
			setShow(false);
			setEmail("");
			setPassword("");
			dispatch(setApiCallsStatus({}))	
		}, 3000);
		
	}

	const validation = ()=>{
		if(email === ""){
			setErrorFor("email");
			setErrorMsg("Email is required")
			return false
		}
		else if(password === ""){
			setErrorFor("password");
			setErrorMsg("Password is requried");
			return false;
		}
		else{
			return true;
		}

	}
	const restError = ()=>{
		setErrorMsg("");
		setErrorFor("");
	}
	const handleSubmit = (e) => {
		e.preventDefault();
	const value = validation();
	if(value){
		
		dispatch(UserLogin({ email, password }));

		
		
		setCheckLogin(true);
		restError();
	}
	};
	const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);
	const ModalComponent = () => {
		console.log(apiStatus);
		return (
			<>
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Body className="text-secondary text-center">
						
                        {
                            apiStatus.message
                        }
					</Modal.Body>
				</Modal>
			</>
		);
	};

	return (
		<>
		<LoadingOverlay
  active={checkLogin}
  spinner
  text='Loading...'
  >
	  {
			apiStatus && apiStatus.isSuccess && apiStatus.apiCall == "login" ? <>
			<ModalComponent /> 
			</>
			:
			apiStatus && !apiStatus.isSuccess && Object.keys(apiStatus).length > 0 && apiStatus.apiCall == "login"  ? <>
			
			<ModalComponent />
			</>
			 : 
			""
		}

			<div className="row">
				<div
					className="col-7"
					style={{
						height: "100vh",
						backgroundImage:
							"url(https://images.pexels.com/photos/4855424/pexels-photo-4855424.jpeg?cs=srgb&dl=pexels-cottonbro-4855424.jpg&fm=jpg)",
						backgroundSize: "cover",
						backgroundPosition: "center center",
					}}
				></div>
				<div className="col-5" style={{ backgroundColor: "#171B25" }}>
					<div class="login d-flex align-items-center py-2">
						<div class="container p-0">
							<div class="row">
								<div class="col-md-10 col-lg-10 col-xl-9 mx-auto">
									<div class="card-sigin">
										<div class="main-signup-header">
											<h2>BN College</h2>

											<form onSubmit={handleSubmit}>
												<div class="form-group">
													<label className="text-white">Email</label>
													<input
														class="form-control"
														placeholder="Enter your email"
														type="email"
														value={email}
														onChange={(e) => {
															setEmail(e.target.value);
															restError();
														}}
													/>
													
												</div>
												{
														errorFor === 'email' && errorMsg !== "" ?
														<div className="alert alert-danger">
																{
																	errorMsg
																}
														</div>:""
													}
												<div class="form-group">
													<label className="text-white">Password</label>{" "}
													<input
														class="form-control"
														placeholder="Enter your password"
														type="password"
														value={password}
														onChange={(e) => {
															setPassword(e.target.value);
															restError();
														}}
													/>
												</div>
												{
														errorFor === 'password' && errorMsg !== "" ?
														<div className="alert alert-danger">
																{
																	errorMsg
																}
														</div>:""
													}
												<div class="mt-3">
													<button
														class="btn btn-main-primary btn-block py-2"
														type="submit"
													>
														Sign In
													</button>
												</div>
											</form>
										</div>
										<div class="main-signin-footer mt-5">
											<p>
												<Link to="/forget" className="text-white">
													Forgot password?
													</Link>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		
		
		</LoadingOverlay>	
		</>
	);
}
export default Login;
