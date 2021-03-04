import React, { useState, useEffect } from 'react';
import LoadingOverlay from "react-loading-overlay";
import { Constants } from "../../../constants";
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { EditCustomStoreService } from '../../../services/superAdminService/editCustomStoreService';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import { editCustomStore } from '../../../action/editCustomStoreAction';
import EditHeaderBackground from './editHeaderBackground';
export default function EditCustomStore({storeLogoImage,storecoverimage}) {
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
    const [image, setImage] = useState("");
    const [logo, SetLogo] = useState("");
    const [headerimgboolean, setheaderImgBoolean] = useState(false);
    const [logoimgboolean, setLogoimgBoolean] = useState(false);
    const [customStoreStatus, setCustomStoreStatus] = useState(false);
    const individualStore = useSelector(state => state.GetStoreUserId);
    const resetErrorMsg = () => {
        setErrorFor("");
        setErrorFor("");
    };
    // console.log(individualStore);
    const dispatch = useDispatch();
// console.log(storeLogoImage)
    useEffect(() => {
        console.log("User Effect")
        setName(individualStore.data.name);
        SetUrl(individualStore.data.URL);
        SetsubUrl(individualStore.data.subURL);
        Setbackground(individualStore.data.background);
        setCustomStoreStatus(individualStore.data.isActive);
        // setImage(individualStore.data.cover);
        setCheckbox(individualStore.data.isApprovalRequired);
        // SetLogo(individualStore.data.logo);
        setEduType(individualStore.data.edu_type);
        setAddress(individualStore.data.address);
        setMobile(individualStore.data.mobile);
        setEmail(individualStore.data.email);
        // setCustomStoreStatus()
       
        // setMobile(individualStore.data.)
        if(storeLogoImage === ""){
            setFile(individualStore.data.logo);
            console.log("first if")
        }else if(storeLogoImage){
            setFile(storeLogoImage);
            console.log("second if")
        }
        
        setHeaderfile(storecoverimage);
    }, [storeLogoImage,storecoverimage])
    // console.log(storecoverimage)
    const apiStatus = useSelector(state => state.editCustom);
    if (
        apiStatus &&
        Object.keys(apiStatus).length > 0 &&
        apiStatus.isSuccess &&
        loading
    ) {

        setLoading(false);
        setShow(true);
        setTimeout(() => {
            setShow(false);
            dispatch(
                editCustomStore({})
            )
        }, 3000);
    }
    else
        if (
            apiStatus &&
            Object.keys(apiStatus).length > 0 &&
            !apiStatus.isSuccess &&
            loading
        ) {
            setLoading(false);
            setShow(true);
            setTimeout(() => {
                setShow(false);
                dispatch(
                    editCustomStore({})
                )
            }, 3000);
        }
    const checkEmail = () => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    const ValidateInfo = () => {
        let isValidEmail = checkEmail();
        // /^(ftp|http|https):\/\/[^ "]+$/.test(url)
        
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
        
        else 
        // if (headerfile === "") {
        //     setErrorFor("header file");
        //     setErrorMsg("Header Bg Image is empty");
        //     return false;
        // } else if (!headerfile) {
        //     setErrorFor("header file");
        //     setErrorMsg("Header Bg Image is empty");
        //     return false;
        // } else
         if (file === "") {
             debugger;
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
        else {
            return true;
        }
    };
    const handleFiles = (e) => {
        console.log("files")
        var files = e.target.files[0];
        setFile(files);
        if(files){
            
            SetLogo(URL.createObjectURL(files));
          
            
        }else{
            console.log("else part")
        }
        setImgStatus(true);
        setLogoimgBoolean(true);
    };
    const handleHeader = (e) => {
        var file = e.target.files[0];
        console.log(file);
        setHeaderfile(file);
        // var imageUrl = URL.createObjectURL(file);
            if(file){
                setImage(URL.createObjectURL(file))
            }else{
                console.log("else part")
            }
        // URL.createObjectURL(file) ? 
        // setImage(URL.createObjectURL(file)) : ""
        // console.log(image)
        console.log("image Upload Header Function")
        setImgStatus(true);
        setheaderImgBoolean(true);
        // console.log(imageUrl);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("zain")
        let value = ValidateInfo();
        if (value) {
            var id = individualStore.data.id;
            console.log("hello")
            setLoading(true);
            dispatch(
                EditCustomStoreService({
                    name,
                    mobile,
                    eduType,
                    address,
                    url,
                    background,
                    headerfile,
                    file,
                    subUrl,
                    checkbox,
                    customStoreStatus,
                    email,
                    id
                })
            )

        }


    };
    const handleClose = () => setShow(false);
    const handleCheck = () => {
        checkbox ? setCheckbox(false) : setCheckbox(true);
        console.log(checkbox);
    };


    const ModalComponent = () => {
        // console.log(apiStatus.message);
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

                {
                    apiStatus && Object.keys(apiStatus).length > 0
                        && apiStatus.isSuccess && show
                        ? (
                            <ModalComponent />
                        ) :
                        apiStatus && Object.keys(apiStatus).length > 0
                            && !apiStatus.isSuccess && show ?
                            (
                                <ModalComponent />
                            ) : ""}
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
                                    defaultValue={name}
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
                                    defaultValue={url}
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
                            {/* <div class="form-group" >
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


                                <div className="co text-center">
                                    <div class="co-overlay"></div>
                                    <div style={{
                                        height: "20rem", width: "100%", backgroundImage: `url(
                                                            ${image ? image : "https://dummyimage.com/300x200/000/fff"})`,
                                                            backgroundSize: "contain", backgroundPosition: "center",
                                                            backgroundRepeat:"no-repeat"
                                    }}>
                                    </div>
                                    <div class="co-details fadeIn-bottom">
                                        <div>
                                            <label htmlFor="headerfile">
                                                <i className="fas fa-upload" style={{fontSize:"40px"}}></i>
                                            </label>
                                        </div>
                                    </div>


                                </div>
                             
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
                                    id="logo"
                                    multiple={false}
                                    onChange={(e) => {
                                        handleFiles(e);
                                        resetErrorMsg();
                                    }}
                                    style={{ display: "none" }}
                                />
                                   <div className="co text-center">
                                    <div class="co-overlay" style={{width:"50%"}}></div>
                                    <div style={{
                                        height: "20rem", width: "50%", backgroundImage: `url(
                                                            ${logo ? logo : "https://dummyimage.com/300x200/000/fff"})`,
                                        backgroundSize: "contain", backgroundPosition: "center",
                                        backgroundRepeat:"no-repeat"
                                    }}>
                                        
                                    </div>
                                    <div class="co-details fadeIn-bottom">
                                        <div style={{width:"50%"}}>
                                            <label htmlFor="logo">
                                                <i className="fas fa-upload" style={{fontSize:"40px"}}></i>
                                            </label>
                                        </div>
                                    </div>


                                </div>
                             
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
                           */}
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
                                    name="permission"
                                    checked={checkbox}
                                    // defaultValue={checkbox}
                                    // defaultChecked={checkbox}
                                    onChange={handleCheck}
                                />
                                <label for="checkbox">Permission required</label>

                            </div>
                            <div className="form-group">
                                <Switch id="Status" checked={customStoreStatus} onChange={
                                    () => {
                                        !customStoreStatus ? setCustomStoreStatus(true) : setCustomStoreStatus(false);
                                    }
                                } ></Switch>
                                <label htmlfor="Status" className="ml-2">Custom Store Active</label>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    class="btn btn-outline-dark"
                                    onClick={handleSubmit}
                                >
                                    submit
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