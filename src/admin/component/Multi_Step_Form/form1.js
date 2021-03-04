import React, { useState } from "react";
import Text from "../text";
import { AddCustomStoreService } from "../../../services/superAdminService/CustomStoreService";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { setApiCallsStatus } from "../../../action/apiCallsStatus";
import LoadingOverlay from "react-loading-overlay";
import { Constants } from "../../../constants";
import "./css/tabs.css";
import InputMask from 'react-input-mask';
// import Product from "../product";
function Form1({ handle }) {
	const [name, setName] = useState("");
	const [mobile, setMobile] = useState("");
	const [email, setEmail] = useState("");
	const [eduType, setEduType] = useState("");
	const [address, setAddress] = useState("");
	const [url, SetUrl] = useState("");
	const [isStatus, SetStatus] = useState(false);
	const [background, Setbackground] = useState("#000");
	const [file, setFile] = useState("");
	const [subUrl, SetsubUrl] = useState("");
	const [headerfile, setHeaderfile] = useState("");
	const [errorFor, setErrorFor] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [check, Setcheck] = useState(true);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [checkbox, setCheckbox] = useState(false);
	const [imgUpload, imgUploadMsg] = useState("");
	const [imgStatus, setImgStatus] = useState(false);
	const [imgfor, setImgMsg] = useState("");
	const [headerimgboolean, setheaderImgBoolean] = useState(false);
	const [logoimgboolean, setLogoimgBoolean] = useState(false);
	
	const state = useSelector((state) => state.CustomStore);
	const apiStatus = useSelector((state) => state.apiCallStatus);

	const dispatch = useDispatch();
	const resetErrorMsg = () => {
		setErrorFor("");
		setErrorFor("");
	};
	const checkEmail = () => {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};
	const ValidateInfo = () => {
		let isValidEmail = checkEmail();
		// /^(ftp|http|https):\/\/[^ "]+$/.test(url)
		debugger;
		if (name === "") {
			setErrorFor("name");
			setErrorMsg("Name is required");
			return false;
		} else if (mobile === "") {
			setErrorFor("mobile");
			setErrorMsg("mobile num is required");
			return false;
		} else if (email === "") {
			setErrorFor("email");
			setErrorMsg("email is required");
			return false;
		} else if (isValidEmail === "") {
			setErrorFor("email");
			setErrorMsg("Please enter valid email");
			return false;
		} else if (eduType === "") {
			setErrorFor("eduType");
			setErrorMsg("Please enter edu type");
			return false;
		} else if (address === "") {
			setErrorFor("address");
			setErrorMsg("Please enter address");
			return false;
		} else if (background === "") {
			setErrorFor("background");
			setErrorMsg("Background is required");
		}
		// if(Object.keys(file)){
		//     console.log("it not working")
		//     setErrorFor("file");
		//     setErrorMsg("file is required")
		//     return false;
		//   }else
		else if (headerfile === "") {
			setErrorFor("header file");
			setErrorMsg("Header Bg Image is empty");
			return false;
		} else if (!headerfile) {
			setErrorFor("header file");
			setErrorMsg("Header Bg Image is empty");
			return false;
		} else if (file === "") {
			setErrorFor("file");
			setErrorMsg("Logo Image is not Added");
			return false;
		} else if (!file) {
			setErrorFor("file");
			setErrorMsg("Logo Image is not Added");
			return false;
		}

		if (subUrl === "") {
			setErrorFor("subUrl");
			setErrorMsg("sub domain Url is required");
			return false;
		}
		// else if (!/^((ftp|http|https):\/\/)?\.([A-z]+)\.([A-z]{2,})/.test(subUrl)) {
		// 	setErrorFor("subUrl");
		// 	setErrorMsg("subUrl is required");
		// 	return false;
		// }
		else {
			return true;
		}
	};
	if (
		apiStatus &&
		Object.keys(apiStatus).length > 0 &&
		check &&
		apiStatus.apiCall == "CustomStore" &&
		loading
	) {
		if (!apiStatus.isSuccess && loading) {
			Setcheck(false);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
			// setLoading(false)
			// setShow(true);

			setErrorMsg(apiStatus.message);
			console.log(show);
			setTimeout(() => {
				setShow(false);
				setErrorFor("serverError");
			}, 1200);
			setTimeout(() => {
				dispatch(setApiCallsStatus({}));
				resetErrorMsg();
			}, 3000);
		} else if (
			apiStatus.isSuccess &&
			check &&
			apiStatus.apiCall == "CustomStore" &&
			loading
		) {
			setShow(true);
			setLoading(false);
			setName("");
			SetUrl("");
			Setbackground("");
			setFile({});
			SetsubUrl("");
			Setcheck(false);
			setTimeout(() => {
				dispatch(setApiCallsStatus({}));
				setShow(false);
			}, 1000);
			setTimeout(() => {
				return handle(2, "Add Store User");
				// console.log(check)
			}, 2000);
		}
	}
	if (apiStatus.isSuccess && isStatus) {
		console.log("Api status");
		SetStatus(false);
	}
	const handleFiles = (e) => {
		//  console.log(e.target.files[0])
		var files = e.target.files[0];
		setFile(files);
		setImgStatus(true);
		setLogoimgBoolean(true);
	};
	const handleHeader = (e) => {
		var file = e.target.files[0];
		console.log(file);
		setHeaderfile(file);
		setImgStatus(true);
		setheaderImgBoolean(true);
	};
	console.log(headerfile);
	if (
		headerfile &&
		headerfile !== "" &&
		imgUpload === "" &&
		imgStatus &&
		headerimgboolean
	) {
		imgUploadMsg("Image is uploaded");
		setImgMsg("header");
		setTimeout(() => {
			setImgStatus(false);
			imgUploadMsg("");
			setheaderImgBoolean(false);
		}, 1000);
	} else if (file && imgUpload === "" && imgStatus && logoimgboolean) {
		imgUploadMsg("Store Logo uploaded");
		setImgMsg("Logo");
		setTimeout(() => {
			setImgStatus(false);
			imgUploadMsg("");
			setLogoimgBoolean(false);
		}, 1000);
	}
	const handleSubmit = (e) => {
		e.preventDefault();

		let value = ValidateInfo();

		if (value) {
			// return handle(2,"Add Store User");
			dispatch(
				AddCustomStoreService({
					name,
					url,
					background,
					headerfile,
					file,
					subUrl,
					checkbox,
					eduType,
					email,
					mobile,
					address,
				})
			);
			if (name && url && background && subUrl) {
				Setcheck(true);
				setLoading(true);
			}
		}
	};
	const handleClose = () => setShow(false);
	const handleCheck = () => {
		checkbox ? setCheckbox(false) : setCheckbox(true);
		console.log(checkbox);
	};
	// const handleShow = () => setShow(true);
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
				</Modal>
			</>
		);
	};
	return (
		<>
			<LoadingOverlay active={loading} spinner text="Loading...">
				{console.log(apiStatus.message)}
				{!apiStatus.isSuccess &&
				show &&
				apiStatus.apiCall === "Custom Store" ? (
					<ModalComponent />
				) : (
					<ModalComponent />
				)}
				<div>
					<div className="container card py-4 mt-4">
						<div className="main-content-body">
							{/* {
                          isSuccess ? <div className="alert alert-success">{message}</div>:<div className="alert alert-danger">{message}</div>
                      } */}

							{/* <div className="text-center">
            <Text text="Add Custom Store" />
          </div> */}
							{/* <form onSubmit={handleSubmit}> */}
							<div class="form-group">
								<label for="uname">Store Name:</label>
								<input
									type="text"
									class="form-control"
									id="uname"
									value={name}
									placeholder="Enter store name"
									name="uname"
									onChange={(e) => {
										setName(e.target.value);
										resetErrorMsg();
									}}
								/>
							</div>
							{errorFor === "name" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<label for="mobile">Education Dep Mobile#:</label>
								<input
									type="text"
									class="form-control"
									id="mobile"
									value={mobile}
									placeholder="Enter mobile name"
									name="mobile"
									onChange={(e) => {
										setMobile(e.target.value);
										resetErrorMsg();
									}}
								/>
							</div>
							{errorFor === "mobile" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<label for="email">Education Email:</label>
								<input
									type="text"
									class="form-control"
									id="email"
									value={email}
									placeholder="Enter email"
									name="email"
									onChange={(e) => {
										setEmail(e.target.value);
										resetErrorMsg();
									}}
								/>
							</div>
							{errorFor === "email" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<label for="type">Education Type:</label>
								<input
									type="text"
									class="form-control"
									id="type"
									value={eduType}
									placeholder="Enter edu type"
									name="type"
									onChange={(e) => {
										setEduType(e.target.value);
										resetErrorMsg();
									}}
								/>
							</div>
							{errorFor === "eduType" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<label for="address">Education Address:</label>
								<input
									type="text"
									class="form-control"
									id="address"
									value={address}
									placeholder="Enter edu type"
									name="address"
									onChange={(e) => {
										setAddress(e.target.value);
										resetErrorMsg();
									}}
								/>
							</div>
							{errorFor === "address" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<label for="url">Website URL:</label>
								<input
									type="text"
									class="form-control"
									id="url"
									placeholder="Enter education department url"
									onChange={(e) => {
										SetUrl(e.target.value);
										resetErrorMsg();
									}}
								/>
							</div>
							{errorFor === "url" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<label for="bg">Header Color:</label>
								<input
									type="color"
									class="form-control"
									id="bg"
									value={background}
									onChange={(e) => {
										Setbackground(e.target.value);
										resetErrorMsg();
									}}
								/>
							</div>
							{errorFor === "background" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<label for="file">Header BG Image:</label>
								<input
									type="file"
									class="form-control"
									required={true}
									id="headerfile"
									onChange={(e) => {
										resetErrorMsg();
										handleHeader(e);
									}}
									style={{ display: "none" }}
								/>

								<label htmlFor="headerfile" style={{ width: "100%" }}>
									<div
										className="upload-button"
										style={{ border: "1px solid #3D4458", padding: "10px 0" }}
									>
										<svg
											data-v-445d13bf=""
											className="icon"
											style={{
												height: "30px",
												cursor: "pointer",
												width: "100%",
											}}
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
										<div className="text-center my-2">
											{headerfile ? headerfile.name : ""}
										</div>
									</div>
								</label>
								{imgfor === "header" && imgUpload != "" && headerfile ? (
									<div className="alert alert-success">{imgUpload}</div>
								) : (
									""
								)}
								{errorFor === "header file" && errorMsg != "" ? (
									<div className="alert alert-danger">{errorMsg}</div>
								) : (
									""
								)}
							</div>
							<div class="form-group">
								<label for="file">Store Logo:</label>
								<input
									type="file"
									class="form-control"
									required={true}
									id="file"
									multiple={false}
									onChange={(e) => {
										handleFiles(e);
										resetErrorMsg();
									}}
									style={{ display: "none" }}
								/>
								<label htmlFor="file" style={{ width: "100%" }}>
									<div
										className="upload-button"
										style={{ border: "1px solid #3D4458", padding: "10px 0" }}
									>
										<svg
											data-v-445d13bf=""
											className="icon"
											style={{
												height: "30px",
												cursor: "pointer",
												width: "100%",
											}}
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
										<div className="text-center my-2">
											{file ? file.name : ""}
										</div>
									</div>
								</label>
								{imgfor === "Logo" && imgUpload != "" ? (
									<div className="alert alert-success">{imgUpload}</div>
								) : (
									""
								)}
								{errorFor === "file" && errorMsg != "" ? (
									<div className="alert alert-danger">{errorMsg}</div>
								) : (
									""
								)}
							</div>
							{/* {errorFor === "file" && errorMsg !== "" ? 
  <div className="alert alert-danger"  >
{errorMsg}
</div>
:""
} */}
							<div class="form-group">
								<label for="suburl">Sub Domain:</label>

								<div className="d-flex align-items-center">
									{Constants.host}
									
									{/* <InputMask  mask="" placeholder="Enter sub domain url" className="form-control input mx-2" onChange={(e) => {
											SetsubUrl(e.target.value);
											resetErrorMsg();
										}} value={subUrl} /> */}
									<input
										type="text"
										placeholder="Enter sub domain url"
										id="suburl"
										
										className="text-dark input mx-2"
										value={subUrl}
										onChange={(e) => {
											SetsubUrl(e.target.value);
											resetErrorMsg();
										}}
									/>
									{Constants.subDomain}
								</div>
							</div>
							{errorFor === "subUrl" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							{errorFor === "serverError" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<input
									type="checkbox"
									className="mr-2"
									id="checkbox"
									checked={checkbox}
									onClick={handleCheck}
								/>
								<label for="suburl">Permission required</label>
							</div>
							<div className="text-center">
								<button
									type="submit"
									class="btn btn-outline-dark"
									onClick={handleSubmit}
								>
									Next
								</button>
							</div>
							{/* </form> */}
						</div>
					</div>
				</div>
			</LoadingOverlay>
		</>
	);
}
export default Form1;
