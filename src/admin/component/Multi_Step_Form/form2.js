import React, { useState } from "react";
import { AddStoreUserService } from "../../../services/superAdminService/addStoreUser";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import Text from "../text";
import { addStorUserAction } from "../../../action/addUserStore";
import {getCookie} from '../../../cookies/cookies';
function Form2({ handle2 }) {
	const dispatch = useDispatch();
	const [fname, setfName] = useState("");
	const [lname, setlName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [logo, Setlogo] = useState("");
	const [errorFor, setErrorFor] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [check, setcheck] = useState(false);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	var roles = getCookie("listRoles");
	console.log(roles)
	var rolelist = [];
	
		for (let subindex = 0; subindex < roles.roles.length; subindex++) {
			console.log("zain")
			if( roles.roles[subindex].id === "5fddb9680a4e690017c0fc53"){
				// console.log(roles.sroles[subindex])
				rolelist.push(roles.roles[subindex])
			}
			
		}
		
console.log(rolelist)
	const apiStatus = useSelector((State) => State.addStoreUser);

	// const storeUser = useSelector(state=>state.addStoreUser);
	if (
		apiStatus &&
		apiStatus.isSuccess &&
		check &&
		apiStatus.apiCall === "StoreUser" &&
		loading
	) {
		// alert(apiStatus.message)
		setShow(true);
		setLoading(false);
		// alert();
		console.log(show);
		setTimeout(() => {
			setShow(false);
		}, 2000);
		setTimeout(() => {
			// return handle2(3);
			dispatch(addStorUserAction({}));
			return handle2(3, "Add Store Menus");
		}, 1000);
		setcheck(false);
	} else if (
		apiStatus &&
		!apiStatus.isSuccess &&
		check &&
		apiStatus.apiCall === "StoreUser" &&
		loading
	) {
		setTimeout(() => {
			setLoading(false);
		}, 1000);

		// alert(apiStatus.message)
		// setShow(true);
		setTimeout(() => {
			setErrorMsg(apiStatus.message);

			setErrorFor("serverError");
			setShow(false);
		}, 2000);
		setTimeout(() => {
			dispatch(addStorUserAction({}));
			resetErrorMsg();
		}, 3000);
		setcheck(false);
	}
	console.log(apiStatus);
	const ValidateInfo = () => {
		let validPassword = validatePassword();
		debugger;
		if (fname === "") {
			setErrorFor("fName");
			setErrorMsg("First Name is required");
			return false;
		} else if (lname === "") {
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
		// if (password === "") {
		// 	setErrorFor("password");
		// 	setErrorMsg("Password is required");
		// } else if (password !== "" && password.length < 8) {
		// 	setErrorFor("password");
		// 	setErrorMsg("Password have minmum 8 charecters");
		// } else if (!validPassword) {
		// 	setErrorFor("password");
		// 	setErrorMsg(
		// 		"The password must contain one upper case letter, one lowercase letter and one numeric digit"
		// 	);
		// }
		else if (role === "") {
			setErrorFor("role");
			setErrorMsg("Role is required");
			return false;
		}
		// else if (logo === "") {
		// 	setErrorFor("logo");
		// 	setErrorMsg("Logo is required");
		// 	return false;
		// }
		else {
			return true;
		}
	};
	const resetErrorMsg = () => {
		setErrorMsg("");
		setErrorFor("");
	};
	const validatePassword = () => {
		var re = /^(?=^.{3,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/;
		return re.test(password);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		let value = ValidateInfo();
		debugger;
		if (value) {
			// return handle2(3 ,"Add Store Menus");
			// console.log({fname,lname,email,password,role,logo})
			var getStoreid = getCookie("store");

	console.log(getStoreid)
	var id = getStoreid.id
			setLoading(true);
			dispatch(AddStoreUserService({ fname, lname, email, role, logo,id }));
			setcheck(true);
		}
	};

	const handleFile = (e) => {
		resetErrorMsg();
		console.log(e.target.files[0]);
		const LogoFile = e.target.files[0];
		Setlogo(LogoFile);
	};
	const handleClose = () => setShow(false);
	const ModalComponent = () => {
		console.log(apiStatus.message);
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
					{/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
				</Modal>
			</>
		);
	};

	return (
		<>
			<LoadingOverlay active={loading} spinner text="Loading...">
				{apiStatus.isSuccess && show && apiStatus.apiCall === "StoreUser" ? (
					<ModalComponent />
				) : (
					<ModalComponent />
				)}
				<div className="container card py-4 mt-4">
					<div className="text-center">
						<Text text="Add Store Admin" />
					</div>
					<div className="card card-body">
						{/* <form onSubmit={handleSubmit}> */}
						<div class="form-group">
							<label for="inputEmail4">First Name</label>
							<input
								type="type"
								class="form-control"
								id="inputEmail4"
								placeholder="First Name"
								onChange={(e) => {
									setfName(e.target.value);
									resetErrorMsg();
								}}
							/>
							{errorFor === "fName" && errorMsg !== "" ? (
								<div className="alert alert-danger mt-2">{errorMsg}</div>
							) : (
								""
							)}
						</div>
						<div class="form-group">
							<label for="inputPassword4">Last Name</label>
							<input
								type="text"
								class="form-control"
								id="inputPassword4"
								placeholder="Last Name"
								onChange={(e) => {
									setlName(e.target.value);
									resetErrorMsg();
								}}
							/>
						</div>
						{errorFor === "lName" && errorMsg !== "" ? (
							<div className="alert alert-danger mt-2">{errorMsg}</div>
						) : (
							""
						)}{" "}
						<div class="form-group">
							<label for="inputAddress">Email</label>
							<input
								type="text"
								class="form-control"
								id="inputAddress"
								placeholder="example@gmail.com"
								onChange={(e) => {
									setEmail(e.target.value);
									resetErrorMsg();
								}}
							/>
						</div>
						{errorFor === "email" && errorMsg !== "" ? (
							<div className="alert alert-danger mt-2">{errorMsg}</div>
						) : (
							""
						)}
						{/* <div class="form-group">
						<label for="inputPassword4">Password</label>
						<input
							type="password"
							class="form-control"
							id="inputPassword4"
							placeholder="*************"
							onChange={(e) => {
								setPassword(e.target.value);
								resetErrorMsg();
							}}
						/>
					</div> */}
						{/* {errorFor === "password" && errorMsg !== "" ? (
						<div className="alert alert-danger mt-2">{errorMsg}</div>
					) : (
						""
					)} */}
						<div class="form-group">
							<label for="inputEmail4">Select Role</label>
							<select
								onChange={(e) => {
									setRole(e.target.value);
									resetErrorMsg();
								}}
								className="custom-select"
							>
								<option selected>Selct Role</option>
								
								{
									rolelist.map((role,indx)=>{
										return  <option value={role.id} key={indx}>{role.name}</option> 
									})
								}
								{/* <option value="StoreAdmin">StoreAdmin</option> */}
							</select>
							{errorFor === "role" && errorMsg !== "" ? (
								<div className="alert alert-danger mt-2">{errorMsg}</div>
							) : (
								""
							)}
						</div>
						<div class="form-group">
							<label for="inputEmail4">Profile Image</label>
							<input
								type="file"
								id="file"
								style={{ display: "none" }}
								className="form-control"
								onChange={handleFile}
							/>
							<label htmlFor="file" style={{ width: "100%" }}>
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
							{errorFor === "serverError" && errorMsg !== "" ? (
								<div className="alert alert-danger mt-2">{errorMsg}</div>
							) : (
								""
							)}
						</div>
						<div className="d-flex justify-content-center">
							<button onClick={handleSubmit} class="btn btn-outline-dark">
								Next
							</button>
						</div>
						{/* </form> */}
					</div>
				</div>
			</LoadingOverlay>
		</>
	);
}
export default Form2;
