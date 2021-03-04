import React,{useState} from 'react';
import TopMenu from '../topMenue'
import {listOfferService} from '../../services/storeAdminService/listOfferService';
import {OfferbyIdService} from '../../services/storeAdminService/getOfferIdService';
import {getStoreUserId} from '../../services/superAdminService/getStoreUserIdService';
import {GetOfferbyId,UpdateOffer} from '../../action/storeAdminAction/OfferAction';
import {updateOfferService} from '../../services/storeAdminService/updateOfferService';
import {useDispatch,useSelector} from 'react-redux';
import {Switch} from 'antd';
import {Form,InputGroup,Spinner,Button,Modal} from 'react-bootstrap';
// import LodaingOverlay from 'react-loading-overlay';
import LoadingOverlay from 'react-loading-overlay';
import { getCookie } from '../../cookies/cookies';
import './offerlist.css';

export default function OfferList(){
    const [loading,setloading] = React.useState(false);
    const [offerboolean,setOfferBoolean] = React.useState(false);
    const [text, settext] = useState("");
	const [background, setbackground] = useState("");
	
	const [errorFor, setErrorFor] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
    // const [btnLoading, setbtnLoading] = useState(false);
    const [Status,setStatus] = useState(false);
	const [menusArray,setMenusArray] = useState([]);
	const [headertext,setheaderText] = useState("");
	const [headerBackground,setheadeBackground] = useState("");
	const [backgroundImage,setbackgroundImage] = useState("");
	const [cover,setcover] = useState("");
	const [bodyText,setBodyText] = useState("");
	const [bodyBackground,setBodyBackground] = useState("");
	const [footertext,setfootertext] = useState("");
	const [footerBackground,setfooterbackground] = useState("");
	const [resultMenu,setResultMenu] = useState([]);
	const [listMenu,setListMenu] = useState("");
    const [offerbutton,setofferButton] = useState(false);
	const [offerid,setOfferid] = useState("");
	const [controlView,setControlView] = useState("");
	const [viewBoolean,setViewBoolean] = useState(false);
	
    const dispatch = useDispatch();
    const listStore = useSelector(state => state.listOffer);
    const singleOffer = useSelector(state => state.getOfferId);
    const getstorewithId = useSelector((state) => state.GetStoreUserId);
    const updateStatus = useSelector((state)=>state.updateOffer);
    console.log(updateStatus)
    React.useEffect(()=>{
        const profile = getCookie("profile");
        console.log(profile)
        dispatch(
        listOfferService()
        )
        dispatch(
            getStoreUserId(profile.storeId)
        )
    },[dispatch])
    // console.log(singleOffer.);
    if(singleOffer && Object.keys(singleOffer).length > 0 && singleOffer.isSuccess &&
        singleOffer.data && Object.keys(singleOffer.data).length > 0 && 
        singleOffer.data.offer && Object.keys(singleOffer.data.offer) &&
        loading
    ){
        // console.log("single offer",singleOffer.data.offer.footer.text)
		setloading(false);
		if(controlView === "edit"){
			setOfferBoolean(true);
		}else
		if(controlView === "view"){
			setViewBoolean(true);
			setofferButton(true)
		}
        
        setbackgroundImage(singleOffer.data.offer.backgroundImage);
        setheaderText(singleOffer.data.offer.header.text);
        setheadeBackground(singleOffer.data.offer.header.backgroundColor);
        setBodyText(singleOffer.data.offer.body.text);
        setBodyBackground(singleOffer.data.offer.body.backgroundColor);
        setfootertext(singleOffer.data.offer.footer.text);
        setfooterbackground(singleOffer.data.offer.footer.backgroundColor);
        setResultMenu(singleOffer.data.offer.menus);
		setOfferid(singleOffer.data.offer.id);
		setStatus(singleOffer.data.offer.isActive)
        setTimeout(() => {
            dispatch(
                GetOfferbyId({})
			)
        }, 3000);
        
    }
    if(updateStatus && Object.keys(updateStatus).length > 0 && updateStatus.isSuccess && offerbutton){
		
		setofferButton(false)
		setErrorFor("Update");
		setErrorMsg(updateStatus.message);
		dispatch(
			listOfferService()
		)
		setTimeout(() => {
			setErrorMsg("");
			setErrorFor("");
			dispatch(
				UpdateOffer({})
			)
			setOfferBoolean(false);
		}, 3000);
	}else if(updateStatus && Object.keys(updateStatus).length > 0 && !updateStatus.isSuccess && offerbutton){
		
		setofferButton(false)
		setErrorFor("Update");
		setErrorMsg(updateStatus.message);
		dispatch(
			listOfferService()
		)
		setTimeout(() => {
			setErrorMsg("");
			setErrorFor("");
			dispatch(
				UpdateOffer({})
			)
			setOfferBoolean(false);
		}, 3000);
	}
    const handleEdit = (offerid)=>{
        // console.log(offerid)
		setloading(true);
		setControlView("edit");
        dispatch(
            OfferbyIdService(offerid)
        )
	}
	const handleView = (offerid)=>{
		setloading(true);
		setControlView("view")
        dispatch(
            OfferbyIdService(offerid)
        )
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
    const addButton = (indx,obj)=>{
	
        const cloneMenus = [...resultMenu];
        console.log(cloneMenus);
		console.log(obj);
		var objid = obj._id ? obj._id : obj.id
        const checkindex = cloneMenus.findIndex(i=>i._id === objid );
        console.log(checkindex)
        if(cloneMenus[indx].text === ""){
            setErrorFor("menusText");
            setErrorMsg("Please add text Menus");
        }
        else if(cloneMenus[indx].backgroundColor === ""){
            setErrorFor("menusBackground");
            setErrorMsg("Please add Background Color");
        }
        else if(cloneMenus[indx].text !== "" && cloneMenus[indx].backgroundColor !== "" && checkindex > -1){
            ressetOffer();
            // var arr = [];
            
            // if(cloneMenus && cloneMenus.length > 0){
            // 	cloneMenus.forEach((data)=>{
            // 		arr.push(data);
            // 	})
            // }
            // console.log("zain")
            cloneMenus[checkindex].text = text;
            cloneMenus[checkindex].backgroundColor = background
            setResultMenu(cloneMenus)
            // setResultMenu([...resultMenu,cloneMenus[indx]])
            setMenusArray([]);
    
        }else if(cloneMenus[indx].text !== "" && cloneMenus[indx].backgroundColor !== ""){
			var data= {_id:obj.id,menuId:obj.id,text:text,backgroundColor:background}
			setResultMenu([...resultMenu,data])
        }
    }
    
    const updateForm = (e)=>{
        e.preventDefault();
        console.log("form");
        dispatch(
            updateOfferService({headertext,headerBackground,bodyText,bodyBackground,footertext,footerBackground,resultMenu,offerid,Status,cover})
        )
        setofferButton(true)
        
        // console.log({headertext,headerBackground,bodyText,bodyBackground,footertext,footerBackground,resultMenu})
    }
    const updateButton = (obj)=>{
        console.log(obj)
        settext(obj.text ? obj.text : obj.name );
        setbackground(obj.backgroundColor ? obj.backgroundColor:"#fff" );
        setMenusArray([obj])
    }
	
	const handleOfferClose = ()=> setOfferBoolean(false);
	const handleViewClose = ()=>{ setViewBoolean(false);
		setofferButton(false)
	}
	const backgroundImageHandle = (e)=>{
		const file = e.target.files[0];
		setcover(file);
		ressetOffer()
	}
    return (
        <>
        <LoadingOverlay
        active={loading}
        spinner
        text='Loading...'
        >
         <div className="main-content singlemenu">
         <TopMenu user="Products" />
         {
             listStore && Object.keys(listStore).length > 0 && listStore.isSuccess
             && listStore.data && Object.keys(listStore.data).length > 0
             && listStore.data.offers && listStore.data.offers.length > 0 ?
             <div className="container">
                 <div className="row">
                 {
                     listStore.data.offers.map((resp,key)=>{
                         return <div className="col-12  col-lg-4 col-xl-3   my-2 py-2 zoom" key={key}>
                         <div className="card" >
                           <div className="card-img-top">


                             <div className="co text-center">
                               <div class="co-overlay"></div>

                               <div style={{
                                 height: "200px", width: "100%", backgroundImage: `url(
${
    resp.backgroundImage ? resp.backgroundImage:""
}
                                   
)`, backgroundSize: "cover", backgroundPosition: "center"
                               }}></div>


                               <div class="co-details fadeIn-bottom">


                                 <span className="edit mr-2" onClick={()=>handleEdit(resp.id)} >	<i class="far fa-edit " style={{ fontSize: "20px" }}></i>
                                 </span>

                                 
                                   <span className="view" onClick={()=>handleView(resp.id)} >
                                     <i class="far fa-eye pt-2" style={{ fontSize: "20px" }}></i>
                                   </span>
                             
                               </div>


                             </div>



                           </div>
                           <div class="card-body">

                             <div className="row ">

                               <div className="col-12 text-secondary " >

                                 {/* <h6 className="text-secondary" style={{ fontSize: "15px" }}>asdf</h6> */}
								 {/* {console.log(resp)} */}
                                 <Switch checked={resp.isActive} />

                               </div>



                             </div>
                             <div className="row d-flex justify-content-between">
                               <div className="col-12">

                               </div>

                             </div>

                           </div>
                         </div>
                       </div>

                     })
                 }
                 </div>
               

             </div>
             :
             listStore && Object.keys(listStore).length > 0 && listStore.isSuccess
             && listStore.data && Object.keys(listStore.data).length > 0
             && listStore.data.offers && listStore.data.offers.length === 0 ? "Data Not Found"
             :
             listStore && Object.keys(listStore).length > 0 && !listStore.isSuccess
             ? listStore.message :
             "Offers list not found yet"
         }
         </div>
         </LoadingOverlay>
         {/* -----------------------------------edit Modal start----------------- */}
         <Modal
													show={offerboolean}
													onHide={handleOfferClose}
                                                    backdrop="static"
                                                    size="lg"
													keyboard={false}
												>
												<Form onSubmit={updateForm}>
														<Modal.Body className="text-white">

															<Form.Group controlId="headertext">
																<Form.Label>Header Text</Form.Label>
																<Form.Control type="text" placeholder="Header Text"
																disabled={offerbutton ? true:false
                                                                }
                                                                value={headertext}
																onChange={(e)=>{
																	setheaderText(e.target.value)
																	ressetOffer();
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
																value={headerBackground}
																onChange={(e)=>{
																	setheadeBackground(e.target.value)																
																	ressetOffer();
																	
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
																			{cover ? cover.name : ""}
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
                                                                    value={bodyText}
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
                                                                    value={bodyBackground}
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
                                                                    value={footertext}
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
                                                                value={footerBackground}
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
																					return	<div className="form-control my-1" onClick={()=>updateButton(subMenu)}
																					 key={subindx}>
																							{subMenu.name}
																							
																						</div>
																					})
																				})
																			}else 
																			if(superMenu && superMenu.menus && superMenu.menus.length > 0){
																				return superMenu.menus.map((mainMenu,mainIndx)=>{
																					
																					return	<div className="form-control my-1" onClick={()=>updateButton(mainMenu)}
																					 key={mainIndx}>
																							{mainMenu.name}
																							
																						</div>
																					
																				})
																			}
																			else{
																				return	<div className="form-control my-1" onClick={()=>updateButton(superMenu)}
																					 key={superindx}>
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
                                                                // changeText(indx,e.target.value);
                                                                settext(e.target.value)
																ressetOffer();
															}}
															value={text}
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
															value={background }
																disabled={offerbutton ? true:false
																}
																onChange={(e)=>{
                                                                    setbackground(e.target.value)
																	// changeBackground(indx,e.target.value);
																	ressetOffer()
																}}
																
															/>
															<InputGroup.Append>
															<InputGroup.Text onClick={()=>addButton(indx,rawdata)}>
                                                            <i class="fas fa-edit" ></i>
                                                            </InputGroup.Text>
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
																	return <span className="badge text-dark mx-1 p-2 fontColor" onClick={()=>updateButton(data)} key={indx} style={{backgroundColor:`${data.backgroundColor}`,fontSize:"12px",textShadow:"black 0px 0px 1px,black 0px 0px 1px,black 0px 0px 1px,black 0px 0px 1px,black 0px 0px 1px "}}>{data.text ? data.text: data.name }</span>
																}):""
															}
															</Form.Group>
															{
																errorFor === "OfferStatus" && errorMsg !== "" ? 
																<div className="alert alert-success">
																	{errorMsg}
																</div>:""
															}
                                                            <Form.Group>
                                                                <Form.Label>Offer Status</Form.Label>
                                                                <Form.Group>
                                                                    <Switch checked={Status} onChange={()=> !Status ? setStatus(true):setStatus(false) }></Switch>
                                                                </Form.Group>
                                                                
                                                            </Form.Group>
															{
																updateStatus.isSuccess && Object.keys(updateStatus).length > 0 && errorFor === "Update" && errorMsg !== "" ? <div className="alert alert-success">
																	{errorMsg}
																</div>:
																!updateStatus.isSuccess && Object.keys(updateStatus).length > 0 && errorFor === "Update" && errorMsg !== "" ? <div className="alert alert-danger">
																	{
																		errorMsg
																	}
																</div>:""
																// errorFor === "Update" && errorMsg !== "" ? <div className="alert alert-success">
																// 	{errorMsg}
																// </div>:""
															}

														</Modal.Body>
														<Modal.Footer>
															<Button variant="btn btn-default" onClick={handleOfferClose} >
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
																/>: "Update"
																}
																
																</Button>
														</Modal.Footer>
													</Form>
												</Modal>


         {/* ---------------------------------end edit Modal--------------------- */}

		  {/* -----------------------------------View Modal start----------------- */}
		  <Modal
													show={viewBoolean}
													onHide={handleViewClose}
                                                    backdrop="static"
                                                    size="lg"
													keyboard={false}
												>
												<Form onSubmit={updateForm}>
														<Modal.Body className="text-white">

															<Form.Group controlId="headertext">
																<Form.Label>Header Text</Form.Label>
																<Form.Control type="text" placeholder="Header Text"
																disabled={offerbutton ? true:false
                                                                }
                                                                value={headertext}
																onChange={(e)=>{
																	setheaderText(e.target.value)
																	ressetOffer();
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
																value={headerBackground}
																onChange={(e)=>{
																	setheadeBackground(e.target.value)																
																	ressetOffer();
																	
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
																
															<img src={backgroundImage} style={{width:"100vw",height:"50vh"}} />
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
                                                                    value={bodyText}
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
                                                                    value={bodyBackground}
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
                                                                    value={footertext}
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
                                                                value={footerBackground}
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
{/* 															
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
																					return	<div className="form-control my-1" onClick={()=>{
																					// handleMenus(subMenu);
																					ressetOffer()
																					}
																					} key={subindx}>
																							{subMenu.name}
																						</div>
																					})
																				})
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
                                                                // changeText(indx,e.target.value);
                                                                settext(e.target.value)
																ressetOffer();
															}}
															value={text}
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
															value={background }
																disabled={offerbutton ? true:false
																}
																onChange={(e)=>{
                                                                    setbackground(e.target.value)
																	// changeBackground(indx,e.target.value);
																	ressetOffer()
																}}
																
															/>
															<InputGroup.Append>
															<InputGroup.Text onClick={()=>addButton(indx,rawdata)}>
                                                            <i class="fas fa-edit" ></i>
                                                            </InputGroup.Text>
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
														 */}

															
                                                            <Form.Group>
                                                                
															{
																resultMenu && resultMenu.length > 0 ?
																resultMenu.map((data,indx)=>{
																	return <span className="badge text-dark mx-1 p-2"   key={indx} style={{backgroundColor:`${data.backgroundColor}`,fontSize:"12px"}}>{data.text}</span>
																}):""
															}
															</Form.Group>
															{
																errorFor === "OfferStatus" && errorMsg !== "" ? 
																<div className="alert alert-success">
																	{errorMsg}
																</div>:""
															}
                                                            <Form.Group>
                                                                <Form.Label>Offer Status</Form.Label>
                                                                <Form.Group>
                                                                    <Switch checked={Status} disabled={offerbutton ? true:false
																	} onChange={()=> !Status ? setStatus(true):setStatus(false) }></Switch>
                                                                </Form.Group>
                                                                
                                                            </Form.Group>
															{
																errorFor === "Update" && errorMsg !== "" ? <div className="alert alert-success">
																	{errorMsg}
																</div>:""
															}

														</Modal.Body>
														<Modal.Footer>
															<Button variant="btn btn-default" onClick={handleViewClose} >
																Close
          </Button>
															{/* <Button variant="primary" type="submit" 
															
														
															disabled={offerbutton ? true:false } >
																{
																	offerbutton ? <Spinner
																	as="span"
																	animation="grow"
																	size="sm"
																	role="status"
																	aria-hidden="true"
																/>: "Update"
																}
																
																</Button> */}
														</Modal.Footer>
													</Form>
												</Modal>


         {/* ---------------------------------end view Modal--------------------- */}
        </>
    )
}