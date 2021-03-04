import React, { useState } from "react";
import AddUser from "./addStore";
import { Link } from "react-router-dom";
import Text from "./text";
import { Modal, Button, Form, Spinner,InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AddStoreUserService } from '../../services/superAdminService/addStoreUser';
import {addStorUserAction} from '../../action/addUserStore';
import { useParams } from 'react-router-dom'
import { getCookie } from '../../cookies/cookies';
import { getStoreUserId } from '../../services/superAdminService/getStoreUserIdService';
import {addOfferService} from '../../services/storeAdminService/addOfferService'
import {addOfferAction} from '../../action/storeAdminAction/addOfferAction';
import {listOfferService} from '../../services/storeAdminService/listOfferService';

function TopMenu1(props) {
	const dispatch = useDispatch();
	// console.log(props)
	const param = useParams();
	// console.log(param);
	const id = param.id;
	// console.log(id)
	// console.log(getCookie("profile"));
	var roles = getCookie("listRoles");

	if(roles && Object.keys(roles).length > 0 && roles.roles && roles.roles.length > 0){  
	var rolelist = [];

	for (let subindex = 0 + 1; subindex < roles.roles.length; subindex++) {
		if (roles.roles[subindex - 1].id !== "5fddb9680a4e690017c0fc52" && roles.roles[subindex].id !== "5fddb9680a4e690017c0fc53") {
			rolelist.push(roles.roles[subindex])
		}

	}
}


	// console.log("zain");
	// console.log(rolelist)

	const [show, setShow] = useState(false);

	const [fname, setfname] = useState("");
	const [lname, setlName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [logo, Setlogo] = useState("");
	const [errorFor, setErrorFor] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [btnLoading, setbtnLoading] = useState(false);
	const [offerboolean,setofferboolean] = useState(false);
	const [header,setHeader] = useState([]);
	const [bodyArray,setBodyArray] = useState([]);
	const [footerArray,setfooerArray] = useState([]);
	const [menusArray,setMenusArray] = useState([]);
	const [headertext,setheaderText] = useState("");
	const [headerBackground,setheadeBackground] = useState("");
	const [backgroundImage,setbackgroundImage] = useState("");
	const [image,setImage] = useState("");
	const [bodyText,setBodyText] = useState("");
	const [bodyBackground,setBodyBackground] = useState("");
	const [footertext,setfootertext] = useState("");
	const [footerBackground,setfooterbackground] = useState("");
	const [resultMenu,setResultMenu] = useState([]);
	const [listMenu,setListMenu] = useState("");
	const [offerbutton,setofferButton] = useState(false);
	// const [result]


	const StoreUserStatus = useSelector((State) => State.addStoreUser);
	const getstorewithId = useSelector((state) => state.GetStoreUserId);
	const offerStatus = useSelector(state=>state.addOffer);

//   console.log(getstorewithId);
// 	console.log(StoreUserStatus)
if(offerStatus && Object.keys(offerStatus).length > 0 && offerStatus.isSuccess && offerbutton && offerboolean){
	setofferButton(false);
	setErrorFor("OfferStatus");
	setErrorMsg(offerStatus.message);
	dispatch(
		listOfferService()
	)
	setTimeout(() => {
		setheaderText("");
		setheadeBackground("");
		setBodyText("");
		setBodyBackground("");
		setfootertext("");
		setfooterbackground("");
		setResultMenu([]);
		setListMenu("");
		setErrorMsg("");
		setErrorFor("");
		setofferboolean(false);
		dispatch(addOfferAction({}))
	}, 3000);

}else if(offerStatus && Object.keys(offerStatus).length > 0 && !offerStatus.isSuccess && offerbutton && offerboolean){
	setofferButton(false);
	setErrorFor("OfferStatus");
	setErrorMsg(offerStatus.message);
	dispatch(
		listOfferService()
	)
	setTimeout(() => {
		setofferboolean(false);
		setheaderText("");
		setheadeBackground("");
		setBodyText("");
		setBodyBackground("");
		setfootertext("");
		setfooterbackground("");
		setResultMenu([]);
		setListMenu("");
		setErrorMsg("");
		setErrorFor("");
		dispatch(addOfferAction({}))
	}, 3000);
}
	if(StoreUserStatus && 
		Object.keys(StoreUserStatus).length > 0 &&
		StoreUserStatus.isSuccess &&
		btnLoading && show
		){
			setbtnLoading(false);
			setErrorFor("StoreUser");
			setErrorMsg(StoreUserStatus.message);
			setfname("");
				setlName("");
				setEmail("");
				setRole("");
				Setlogo("");
				
			setTimeout(() => {
				setErrorMsg("");
				setErrorFor("");
				setShow(false);
				dispatch(
					getStoreUserId(id)
				)
				dispatch(
					addStorUserAction({})
				)
			}, 3000);
		}else
		if(StoreUserStatus && 
			Object.keys(StoreUserStatus).length > 0 &&
			!StoreUserStatus.isSuccess &&
		btnLoading){
			setbtnLoading(false)
			setErrorFor("StoreUser");
			setErrorMsg(StoreUserStatus.message);
			setfname("");
				setlName("");
				setEmail("");
				setRole("");
				Setlogo("");
			setTimeout(() => {
				
				setErrorFor("");
				setErrorMsg("");
				setShow(false)
				
				dispatch(
					addStorUserAction({})
				)
			}, 3000);
		}
	const ValidateInfo = () => {
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
		else if (logo === "") {
			setErrorFor("logo");
			setErrorMsg("Profile Image is required");
		}
		else if (logo === undefined) {
			setErrorFor("logo");
			setErrorMsg("Profile Image is required");
		}
		else {
			return true;
		}
	};
	const resetErrorMsg = () => {
		setErrorMsg("");
		setErrorFor("");
	};
	const handleFile = (e) => {
		resetErrorMsg();
		console.log(e.target.files[0]);
		const LogoFile = e.target.files[0];
		Setlogo(LogoFile);
	};
	const submitForm = (e) => {
		e.preventDefault();
		console.log("validte")
		let value = ValidateInfo();
		if (value) {
			
			dispatch(
				AddStoreUserService(
					{
						fname, lname, email, logo, role, id
					}
				)
			)
			setbtnLoading(true)
		}

	}
	const offerValidate = ()=>{
		if(headertext === ""){
			setErrorFor("headertext");
			setErrorMsg("Header Text is required");
			return false
		}else
		if(headerBackground === ""){
			setErrorFor("headerBackground");
			setErrorMsg("Header Background is required");
			return false
		}else
		if(backgroundImage === ""){
			setErrorFor("backgroundImage");
			setErrorMsg("Background Image is required");
			return false
		}
		else
		if(backgroundImage === undefined){
			setErrorFor("backgroundImage");
			setErrorMsg("Background Image is required");
			return false
		}else
		if(bodyText === ""){
			setErrorFor("bodytext");
			setErrorMsg("Body Text is required");
			return false
		}else 
		if(bodyBackground == ""){
			setErrorFor("bodybackground");
			setErrorMsg("Body Background is required");
			return false
		}
		if(footertext === ""){
			setErrorFor("footertext");
			setErrorMsg("Footer Text is required");
			return false
		}else
		if(footerBackground === ""){
			setErrorFor("footerBackground");
			setErrorMsg("Footer Background is required");
			return false
		}if(listMenu === ""){
			setErrorFor("menuslist");
			setErrorMsg("Please select Menus list is required");
			return false
		}else if(resultMenu.length === 0){
			setErrorFor("tabs");
			setErrorMsg("Please add Menus tabs");
			return false
		}
		else{
			return true
		}
	}
	const ressetOffer = ()=>{
		// setheaderText("");
		// setheadeBackground("");
		// setBodyText("");
		// setBodyBackground("");
		// setfootertext("");
		// setfooterbackground("");
		setErrorFor("");
		setErrorMsg("");

	}
const	offerForm = (e)=>{
	e.preventDefault();
	let offerValid = offerValidate();
	if(offerValid){
		ressetOffer();
		setofferButton(true);
		dispatch(
			addOfferService(
				{
					headertext,
					headerBackground,
					backgroundImage,
					bodyText,
					bodyBackground,
					footertext,
					footerBackground,
					resultMenu
				}
			)
		)
		// console.log(
		// 	{
		// 	headertext,
		// 	headerBackground,
		// 	backgroundImage,
		// 	bodyText,
		// 	bodyBackground,
		// 	footertext,
		// 	footerBackground,
		// 	resultMenu
		// }
		// )
	}
}
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleOffer = ()=>setofferboolean(true);
	const handleOfferClose = ()=> setofferboolean(false);
	const handleMenus = (obj)=>{
		console.log(obj)
		const rawMenus = [];
		setListMenu("as");
		setMenusArray([{
			menuId:obj.id ,
			text: obj.name,
			backgroundColor:""
		}])

	}
	// console.log(header);
	const backgroundImageHandle = (e)=>{
		const file = e.target.files[0];
		setbackgroundImage(file);
		ressetOffer()
	} 
	const changeText = (indx,value)=>{
		const cloneMenus = [...menusArray];
		console.log("before text",cloneMenus);
		cloneMenus[indx].text = value;
		setMenusArray(cloneMenus);
		console.log(cloneMenus);
	}
	const changeBackground = (indx,value)=>{
		const cloneMenus = [...menusArray];
		console.log("after text",cloneMenus);
		if(cloneMenus[indx].text === ""){
			setErrorFor("menusText");
			setErrorMsg("Please add text Menus");
			cloneMenus[indx].backgroundColor = "";
			setMenusArray(cloneMenus);
		}else
		 if(cloneMenus[indx].text !== ""){
			cloneMenus[indx].backgroundColor = value;
			setMenusArray(cloneMenus);
			console.log("after all completed",cloneMenus);
		 }
		
	}
	// console.log("result menus",resultMenu)
const addButton = (indx,obj)=>{
	console.log("object",obj)
	const cloneMenus = [...menusArray];
	console.log("clone Menus Array Add button",cloneMenus);
	if(cloneMenus[indx].text === ""){
		setErrorFor("menusText");
		setErrorMsg("Please add text Menus");
	}
	else if(cloneMenus[indx].backgroundColor === ""){
		setErrorFor("menusBackground");
		setErrorMsg("Please add Background Color");
	}
	else if(cloneMenus[indx].text !== "" && cloneMenus[indx].backgroundColor !== ""){
		ressetOffer();
		// var arr = [];
		
		// if(cloneMenus && cloneMenus.length > 0){
		// 	cloneMenus.forEach((data)=>{
		// 		arr.push(data);
		// 	})
		// }
		const resultClone = [...resultMenu];
		var alreadAdd = resultClone.findIndex(i=>i.menuId === obj.menuId);
		if(alreadAdd > -1){
			setErrorFor("menusBackground");
		setErrorMsg("Menus Already Add");
		}else {
			setResultMenu([...resultMenu,cloneMenus[indx]])
			setMenusArray([]);
		}

		

	}
}
const handleDelMenus = (indx)=>{
const cloneDelMenus = [...resultMenu];
console.log(cloneDelMenus);
cloneDelMenus.splice(indx,1);
setResultMenu(cloneDelMenus);
// cloneDelMenus.findIndex()
}
// console.log(resultMenu)
	return (
		<>
			<div className="main-header main-header-fixed my-2">
				<div className="container-fluid">
					<div className="main-header-left">
						<a
							href="#"
							data-toggle="sidebar"
							className="nav-link icon toggle pl-0"
						>
							<svg
								className="svg-icon"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<line x1="21" y1="10" x2="3" y2="10"></line>
								<line x1="21" y1="6" x2="3" y2="6"></line>
								<line x1="21" y1="14" x2="3" y2="14"></line>
								<line x1="21" y1="18" x2="3" y2="18"></line>
							</svg>
						</a>
					</div>
					<div className="main-header-center d-flex align-items-center justify-content-between">
						<div className="header-breadcrumb">
							<Text className="" text={props.user} />
						</div>
						<div className="responsive-logo">
							{" "}
							<a href="index.html">
								<img
									src="../assets/img/brand/logo.png"
									className="mobile-logo"
									alt="logo"
								/>
							</a>
						</div>

						<>
							{props.store_mange === "custom manage" ? (
								<div>
									<Link to="/Custom_Management/add_store">
										<div className="header-breadcrumb">
											<button className="btn btn-outline-dark px-4">
												Add Store
											</button>
										</div>
									</Link>
								</div>
							) : props.inventory === "inventory" ? (
								<div>
									<Link to="/inventory/addProduct">
										<div className="header-breadcrumb">
											<button className="btn btn-outline-dark px-4">
												Add Product
											</button>
										</div>
									</Link>
								</div>
							) :
									props.editStore === "editStore" ?
										(
											<div>

												<div className="header-breadcrumb">
													<button className="btn btn-outline-dark px-4" onClick={handleShow}>
														Add Student
											</button>
												</div>

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
																<Form.Control type="text" disabled={btnLoading ? true:false
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
																		rolelist.map((role, indx) => {
																			return <option value={role.id} key={indx}>{role.name}</option>
																		})
																	}
																</select>
																{errorFor === "role" && errorMsg !== "" ? (
																	<div className="alert alert-danger mt-2">{errorMsg}</div>
																) : (
																		""
																	)}
															</Form.Group>
															<Form.Group>
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
															</Form.Group>

															<Form.Group controlId="formBasicCheckbox">
															</Form.Group>
															{
																errorFor === "StoreUser" && errorMsg !== "" ? 
																<div className="alert alert-danger">
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
																/>: "Submit"
																}
																
																</Button>
														</Modal.Footer>
													</Form>
												</Modal>


											</div>
										) : props.offer === "offer"  ?
										<div className="header-breadcrumb">
													<button className="btn btn-outline-dark px-4" onClick={handleOffer}>
														Add	Offers
													</button>
													<Modal
													show={offerboolean}
													size="lg"
													onHide={handleOfferClose}
													backdrop="static"
													keyboard={false}
												>
												<Form onSubmit={offerForm}>
														<Modal.Body className="text-white">

															<Form.Group controlId="headertext">
																<Form.Label>Header Text</Form.Label>
																<Form.Control type="text" placeholder="Header Text"
																disabled={offerbutton ? true:false
																}
																onChange={(e)=>{
																	setheaderText(e.target.value)
																	ressetOffer();
																	setHeader([{text:headertext,backgroundColor:headerBackground}])
																}} />
																{
																errorFor === "headertext" && errorMsg !== "" ?
																<div className="alert alert-danger">
																{
																	errorMsg
																}				
																</div>:""
																}

															</Form.Group>
															<Form.Group controlId="headerbackground">
																<Form.Label>Header Background</Form.Label>
																<Form.Control type="color"
																
																onChange={(e)=>{
																	setheadeBackground(e.target.value)
																	setHeader([{text:headertext,backgroundColor:headerBackground}])
																	ressetOffer();
																	// handleHeader(e.target.value)
																	// setHeader({
																	// 	text,
																	// 	backgroundColor:e.target.value
																	// })
																}}
																disabled={offerbutton ? true:false
																}
																	
																/>
																{
																errorFor === "headerBackground" && errorMsg !== "" ?
																<div className="alert alert-danger">
																{
																	errorMsg
																}				
																</div>:""
																}
																
															</Form.Group>
															<Form.Group controlId="headerbackgroundimage">
																<Form.Label>Background Image</Form.Label>
																{/* <Form.Control type="file" placeholder="Last Name"
																disabled={btnLoading ? true:false
																}
																	
																/> */}
																<input
																	type="file"
																	id="headerbackgroundimage"
																	style={{ display: "none" }}
																	className="form-control"
																	onChange={backgroundImageHandle}
																	disabled={offerbutton ? true:false
																	}
																/>
																<label htmlFor="headerbackgroundimage" style={{ width: "100%", }} >
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
																			{backgroundImage ? backgroundImage.name : ""}
																		</div>
																	</div>
																</label>

																{
																	errorFor === "backgroundImage" && errorMsg !== "" ? 
																	<div className="alert alert-danger">
																		{
																			errorMsg
																		}
																	</div>:""
																}
															</Form.Group>
															<Form.Group controlId="bodytext">
																<Form.Label>Body Text</Form.Label>
																<Form.Control type="text"
																	placeholder="Body Text"
																	onChange={(e)=>{
																		setBodyText(e.target.value);
																		ressetOffer();
																	}
																}
																	disabled={offerbutton ? true:false
																	}
																	
																/>
																{
																errorFor === "bodytext" && errorMsg !== "" ?
																<div className="alert alert-danger">
																{
																	errorMsg
																}				
																</div>:""
																}
															</Form.Group>
															<Form.Group controlId="bodaybackground">
																<Form.Label>Body Background</Form.Label>
																<Form.Control type="color"
																	// placeholder="example@gmail.com"
																	onChange={(e)=>{
																		setBodyBackground(e.target.value)
																		ressetOffer();}}
																	disabled={offerbutton ? true:false
																	}
																	
																/>
																{
																errorFor === "bodybackground" && errorMsg !== "" ?
																<div className="alert alert-danger">
																{
																	errorMsg
																}				
																</div>:""
																}
															</Form.Group>
															<Form.Group controlId="footertext">
																<Form.Label>Footer Text</Form.Label>
																<Form.Control type="text"
																	placeholder="Footer Text"
																	onChange={(e)=>{
																		setfootertext(e.target.value)
																		ressetOffer();
																	}}
																	disabled={offerbutton ? true:false
																	}
																	
																/>
																{
																errorFor === "footertext" && errorMsg !== "" ?
																<div className="alert alert-danger">
																{
																	errorMsg
																}				
																</div>:""
																}
															</Form.Group>
															<Form.Group controlId="footerbackground">
																<Form.Label>Footer Background</Form.Label>
																<Form.Control type="color"
																onChange={(e)=>{
																	setfooterbackground(e.target.value);
																	ressetOffer();
																}}
																	disabled={offerbutton ? true:false
																	}
																	
																/>
																{
																errorFor === "footerBackground" && errorMsg !== "" ?
																<div className="alert alert-danger">
																{
																	errorMsg
																}				
																</div>:""
																}
																
															</Form.Group>
															
															

															<Form.Group controlId="formBasicCheckbox">
																<Form.Group>
																	<Form.Label>Menus List</Form.Label>
																	{
																	getstorewithId && Object.keys(getstorewithId).length > 0
																	&& getstorewithId.data && Object.keys(getstorewithId.data).length > 0
																	&& getstorewithId.data.superMenus.length > 0
																	? 
																	<div style={{height:"174px",overflow:"scroll"}} disabled={offerbutton ? true:false
																	}>{
																	getstorewithId.data.superMenus.map((superMenu,superindx)=>{
																		if(superMenu && superMenu.menus && superMenu.menus.length > 0
																			&& superMenu.menus.find(x=>x.subMenus.length > 0 )
																			){
																			return	superMenu.menus.map((mainMenu,mainIndx)=>{
																					return mainMenu.subMenus.map((subMenu,subindx)=>{
																					return	<div className="form-control my-1"  onClick={()=>{
																					handleMenus(subMenu);
																					ressetOffer()
																					}
																					} key={subindx}>
																							{subMenu.name}
																						</div>
																					})
																				})
																			}
																			else if(superMenu && superMenu.menus && superMenu.menus.length > 0){
																			return	superMenu.menus.map((menu,mindx)=>{
																					return <div className="form-control my-1" onClick={()=>{
																						handleMenus(menu);
																						ressetOffer()
																						}
																						} key={mindx}>
																								{menu.name}
																							</div>
																				})
																			}
																			else {
																				return		<div className="form-control my-1" onClick={()=>{
																						handleMenus(superMenu);
																						ressetOffer()
																						}
																						} key={superindx}>
																								{superMenu.name}
																							</div>
																			}
																	})
																}
																	</div>
																	
																	:""
																	}
																	{
																		errorFor === "menuslist" && errorMsg !== "" ?
																		<div className="alert alert-danger">
																			{errorMsg}
																		</div>:""
																	}
																</Form.Group>
																{
																	menusArray && menusArray.length > 0 ?
																	menusArray.map((rawdata,indx)=>{
																		
																	return	<div key={indx}>
																		<Form.Group controlId="menuText">
															<Form.Label>Menus Text</Form.Label>
															<Form.Control type="text"
															placeholder="Menus Text"
															onChange={(e)=>{
																changeText(indx,e.target.value);
																ressetOffer();
															}}
															defaultValue={rawdata.text}
																disabled={offerbutton ? true:false
																}
																
															/>

															{
																errorFor === "menusText" && errorMsg !== "" ?
																<div className="alert alert-danger">
																	{
																		errorMsg
																	}
																</div>:""
															}
														</Form.Group>
														<Form.Group controlId="menuBackground">
															<Form.Label>Menus Background</Form.Label>
															<InputGroup>
															<Form.Control type="color"
															value={rawdata.backgroundColor ? rawdata.backgroundColor : "#fff" }
																disabled={offerbutton ? true:false
																}
																onChange={(e)=>{
																	changeBackground(indx,e.target.value);
																	ressetOffer()
																}}
																
															/>
															<InputGroup.Append>
															<InputGroup.Text onClick={()=>addButton(indx,rawdata)}>+</InputGroup.Text>
															</InputGroup.Append>
															</InputGroup>
															{
																errorFor === "menusBackground" && errorMsg !== "" ? 
																<div className="alert alert-danger">
																	{
																		errorMsg
																	}
																</div>:""
															}
															{
																errorFor === "tabs" && errorMsg !== "" ?
																<div className="alert alert-danger">
																	{
																		errorMsg
																	}
																</div>:""
															}
															
														</Form.Group>
													
																</div>
															
																	})
																	:""

																}
															</Form.Group>
															<Form.Group>
															{
																resultMenu && resultMenu.length > 0 ?
																resultMenu.map((data,indx)=>{
																	return <span className="badge text-dark p-2 mx-1 fontColor" key={indx} style={{position:"relative",backgroundColor:`${data.backgroundColor}`,fontSize:"25px" ,textShadow: "black 0px 0px 1px, white 0px 0px 1px, black 0px 0px 1px, black 0px 0px 1px, black 0px 0px 1px, black 0px 0px 1px"}}>
																		<label style={{fontSize:"15px"}}>{data.text}</label>
																	<i className="fas fa-times" style={{position:"absolute",top:"-5px",right:"-5px",fontSize:"12px",borderRadius:"20px", height:"20px",width:"20px",background:"black",padding:"4px"}} onClick={()=>handleDelMenus(indx)}></i>
																	</span>
																}):""
															}
															</Form.Group>
															{
																errorFor === "OfferStatus" && errorMsg !== "" ? 
																<div className="alert alert-success">
																	{errorMsg}
																</div>:""
															}

														</Modal.Body>
														<Modal.Footer>
															<Button variant="btn btn-default" onClick={handleOfferClose}>
																Close
          </Button>
															<Button variant="primary" type="submit" 
															
														
															disabled={offerbutton ? true:false } >
																{
																	offerbutton ? <Spinner
																	as="span"
																	animation="grow"
																	size="sm"
																	role="status"
																	aria-hidden="true"
																/>: "Submit"
																}
																
																</Button>
														</Modal.Footer>
													</Form>
												</Modal>



												</div>
										
										:""

							}
						</>
					</div>
				</div>
			</div>
		</>
	);
}
export default TopMenu1;
