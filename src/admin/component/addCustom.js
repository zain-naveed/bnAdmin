import React, { useState } from "react";
import Text from "./text";
import { AddCustomStoreService } from "../../services/CustomStoreService";
import { useDispatch, useSelector } from "react-redux";
// import { tuple } from 'antd/lib/_util/type';
function AddCustom() {
	const [name, setName] = useState("");
	const [url, SetUrl] = useState("");
	const [isStatus, SetStatus] = useState(false);
	const [background, Setbackground] = useState("");
	const [file, setFile] = useState({});
	const [subUrl, SetsubUrl] = useState("");
	const [errorFor, setErrorFor] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [check, Setcheck] = useState(true);
	const state = useSelector((state) => state.CustomStore);
	const apiStatus = useSelector((state) => state.apiCallStatus);
	// console.log(state1)

	// const {isSuccess,message}  = apiStatus;
	// console.log(isSuccess)
	const dispatch = useDispatch();
	const ValidateInfo = () => {
		// /^(ftp|http|https):\/\/[^ "]+$/.test(url)
		if (name === "") {
			setErrorFor("name");
			setErrorMsg("Name is required");
			return false;
		} else if (url === "") {
			setErrorFor("url");
			setErrorMsg("Url is required");
			//   console.log(Object.keys(file).length)
			return false;
		} else if (
			!/^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/.test(url)
		) {
			setErrorFor("url");
			setErrorMsg("Please enter valid url");
			return false;
		} else if (background === "") {
			debugger;
			setErrorFor("background");
			setErrorMsg("Background is required");
		}
		// if(Object.keys(file)){
		//     console.log("it not working")
		//     setErrorFor("file");
		//     setErrorMsg("file is required")
		//     return false;
		//   }else
		else if (
			!/^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/.test(subUrl)
		) {
			setErrorFor("subUrl");
			setErrorMsg("subUrl is required");
			return false;
		} else {
			return true;
		}
	};
	// console.log(apiStatus)
	if (apiStatus && Object.keys(apiStatus).length > 0 && check) {
		if (!apiStatus.isSuccess) {
			Setcheck(false);

			setName("");
			SetUrl("");
			Setbackground("");
			setFile({});
			SetsubUrl("");
			setTimeout(() => {
				alert(apiStatus.message);
				console.log(check);
			}, 1000);
		} else if (!check) {
			alert(apiStatus.message);
		}
	}
	if (apiStatus.isSuccess && isStatus) {
		console.log("Api status");
		SetStatus(false);
	}
	const handleFiles = (e) => {
		// console.log(e.target.files[0])
		var files = e.target.files[0];
		setFile(files);
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		let value = ValidateInfo();

		if (value) {
			dispatch(AddCustomStoreService({ name, url, background, file, subUrl }));
			if (name && url && background && subUrl) {
				Setcheck(true);
			}
		}
	};
	return (
		<>
			<div className="main-content singlemenu">
				<div className="container card py-4 mt-4" style={{ width: "25rem" }}>
					<div className="main-content-body">
						{/* {
                            isSuccess ? <div className="alert alert-success">{message}</div>:<div className="alert alert-danger">{message}</div>
                        } */}

						{/* <div className="text-center">
							<Text text="Custom Store" />
						</div> */}
						<form onSubmit={handleSubmit}>
							<div class="form-group">
								<label for="uname">Name:</label>
								<input
									type="text"
									class="form-control"
									id="uname"
									value={name}
									placeholder="Enter username"
									name="uname"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							{errorFor === "name" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<label for="url">URL:</label>
								<input
									type="text"
									class="form-control"
									id="url"
									placeholder="Enter Url"
									onChange={(e) => SetUrl(e.target.value)}
								/>
							</div>
							{errorFor === "url" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<label for="bg">Background:</label>
								<input
									type="color"
									class="form-control"
									id="bg"
									value={background}
									onChange={(e) => {
										Setbackground(e.target.value);
									}}
								/>
							</div>
							{errorFor === "background" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div class="form-group">
								<label for="file">File:</label>
								<input
									type="file"
									class="form-control"
									key={file}
									required={true}
									id="file"
									multiple={false}
									capture
									onChange={handleFiles}
								/>
							</div>
							{/* {errorFor === "file" && errorMsg !== "" ? 
    <div className="alert alert-danger"  >
{errorMsg}
  </div>
  :""
} */}
							<div class="form-group">
								<label for="suburl">Sub Url:</label>
								<input
									type="text"
									class="form-control"
									id="suburl"
									value={subUrl}
									onChange={(e) => SetsubUrl(e.target.value)}
								/>
							</div>
							{errorFor === "subUrl" && errorMsg !== "" ? (
								<div className="alert alert-danger">{errorMsg}</div>
							) : (
								""
							)}
							<div className="text-center">
								<button type="submit" class="btn btn-primary">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
export default AddCustom;
