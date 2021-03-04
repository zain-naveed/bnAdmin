import React,{useEffect,useState} from 'react';
import TopMenu from '../topMenue';
// import {Link} from 'react-router-dom';
import {Tabs,Tab,ListGroup, Col,Row,Container,Spinner} from 'react-bootstrap';
// import '../component/Multi_Step_Form/css/tabs.css';
import {useDispatch} from 'react-redux';
import {StoreAdminProductListService} from '../../services/storeAdminService/storelistSotreAdmin';
import {   Form, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { getStoreUserId } from "../../services/superAdminService/getStoreUserIdService";
import { getProductbyid } from "../../services/storeAdminService/getStroreProductbyId";
import {getProductSingle} from '../../action/storeAdminAction/getProductbyidStoreAdmin';
import { updateProduct } from "../../services/storeAdminService/updateStoreProductService";
import { getCookie,setCookie } from "../../cookies/cookies";
import { updateStoreAdminProductAction } from "../../action/storeAdminAction/updateStoreAdminAction";
import {listStoreMenusService} from '../../services/storeAdminService/listMenusService';
import {addMenuService} from '../../services/storeAdminService/addStoreProductInSubmenu';
import { addProdcutinSubMenusService } from '../../services/storeAdminService/addStoreProductInSubmenu';
import {addProducttoSbumenu} from '../../action/storeAdminAction/addProductinSubmenuAction';
import {addApprovalService} from '../../services/storeAdminService/addApprovalService';
import {FeatureProduct} from '../../services/storeAdminService/featureProductService';
import {addProductApproval} from '../../action/approvalAction';
import {Switch} from 'antd';
import icon from '../../request.png';
// import Header from './header';
// import MenusHeader from './menusHeader';
// import _ from 'lodash';

function Product(){
  const dispatch = useDispatch();

  const roles = getCookie("listRoles");
  const [selectImage, setSelectedImage] = useState("");
  const [show,setShow] = useState(false);
  const [viewSingleProduct,SetviewSingleProduct] = useState(false);
  const [menus, setMenus] = useState([]);
  const [result, setResult] = useState([]);
  const [subMenu, setSubMenu] = useState({});
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ammount, setAmmount] = useState("");
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState("");
  const [errorFor, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectResult,setSelectResult] = useState("");
  const [id,setId] = useState("");
  const [controlSwitch,setCotrolSwitch] = useState("");
  const [selectRoles,setSelectRoles] = useState([]);
  const [editModalClose, setEditModalClose] = useState(false);
  const getstorewithId = useSelector((state) => state.GetStoreUserId);
  const [featureModalBoolean,setFeautreModalBoolean] = useState(false);
  const [featureProductid,setFeatureProductId] = useState("");
  const [featureMessage,setFeatureMessage] = useState("");
  const [approvaldisable,setApprovalDisable]= useState(false);
  const [succesFeatureBoolean,setSuccessFeatureBoolean] = useState(false);
  const [options,setOption] = useState("");
  const [statusOption,setStatusOption] = useState("");
  const [rolesAllowed,setRolesAllowed] = useState([]);
  
  
  const getSingleProduct = useSelector(
    (state) => state.getSingleProductbyStoreAdmin
  );
  const updateStatus = useSelector((state) => state.updateProductStoreAdmin);
  const listProductAdmin = useSelector(state => state.listStoreAdminProduct);
  const listStoreAdmin = useSelector(state => state.GetStoreUserId);
  const listMenus = useSelector(state=>state.listStoreMenus);
  const featureProduct = useSelector(state=>state.FeatureProduct);
  const approvalStatus = useSelector(state => state.addApproval);
  const addProductSubMenus = useSelector(state => state.addProductSubMenus);
 var productStatus = ["","ApprovalRequired","Approved","Active","Deactive"];
  useEffect(()=>{
    const getStoreId = getCookie("profile");
    dispatch(
      getStoreUserId(getStoreId.storeId)
   );
   dispatch(
    StoreAdminProductListService()
  )
  dispatch(
    listStoreMenusService()
  )
  dispatch(
    FeatureProduct()
  )
  },[])
  
// console.log(listMenus);
  const resSetError = () => {
    setErrorMsg("");
    setError("");
  }

// console.log(loading)

  if (
    getSingleProduct &&
    Object.keys(getSingleProduct).length > 0 && getSingleProduct.isSuccess && loading
  ) {
    setLoading(false);
    if(controlSwitch === "edit"){
      setEditModalClose(true);
    }else
    if(controlSwitch === "view"){
      SetviewSingleProduct(true)
    }
    
    setProduct(getSingleProduct.data);
    setName(getSingleProduct.data.name);
    setDescription(getSingleProduct.data.description);
    setStock(getSingleProduct.data.stock);
    setAmmount(getSingleProduct.data.price);
    setDiscount(getSingleProduct.data.discountPrice);
    setStatusOption(getSingleProduct.data.status);
    // setRolesAllowed(getSingleProduct.data.allowedRules);
    setSelectRoles(getSingleProduct.data.allowedRules)
    
    setTimeout(() => {
      dispatch(getProductSingle({}))
    }, 3000);
  }
  if (
		updateStatus &&
		Object.keys(updateStatus).length > 0 &&
		updateStatus.isSuccess &&
		updateStatus.apiCall === "Get Single Product by Admin" && show && editModalClose
	) {
    setEditModalClose(false)
    setLoading(false);
    
		setTimeout(() => {
      setShow(false);
      setSelectRoles([]);
      setSubMenu({});
      setSelectedImage("");
      dispatch(
      updateStoreAdminProductAction({})
    )
    dispatch(
      addProducttoSbumenu({})
    )
    
    dispatch(
      StoreAdminProductListService()
    )
		}, 3000);
  }
  else if(updateStatus &&
		Object.keys(updateStatus).length > 0 &&
		!updateStatus.isSuccess &&
		updateStatus.apiCall === "Get Single Product by Admin" && show && editModalClose){
      setEditModalClose(false)
    setLoading(false);
    
		setTimeout(() => {
      setShow(false);
      setSelectRoles([]);
      setSubMenu({});
      setSelectedImage("");
      dispatch(
      updateStoreAdminProductAction({})
    )
    dispatch(
      addProducttoSbumenu({})
    )
    // dispatch(
    //   StoreAdminProductListService()
    // )
		}, 3000);
    }
    // console.log("approval status",approvalStatus)
    if(approvalStatus && Object.keys(approvalStatus).length > 0 && approvalStatus.isSuccess && approvaldisable){
            setApprovalDisable(false);
            setError("approval");
            setErrorMsg(approvalStatus.message);
            setFeatureProductId("");
            setFeatureMessage("")
            setTimeout(() => {
              setErrorMsg("");
              setError("");
              setFeautreModalBoolean(false);
              dispatch(
                addProductApproval({})
              )

            }, 3000);
    }else
    if(approvalStatus && Object.keys(approvalStatus).length > 0 && !approvalStatus.isSuccess && approvaldisable){
      setApprovalDisable(false);
      setError("approval");
      setErrorMsg(approvalStatus.message);
      setFeatureProductId("");
      setFeatureMessage("")
      setTimeout(() => {
        setErrorMsg("");
        setError("");
        setFeautreModalBoolean(false);
        dispatch(
          addProductApproval({})
        )

      }, 3000);
    }
  const handleClose = ()=>{
    setShow(false);
  }
  
  
  const handleEditModal = (id) => {
  
    setLoading(true);
    setId(id);
    dispatch(
      getProductbyid(id)
);
setCotrolSwitch("edit")
   

  }
  // console.log(product);
  const handelEditModalClose = () => {
    setEditModalClose(false);
    setSelectedImage("");
    setSubMenu({});
  }
  // if (
  //   getstorewithId &&
  //   Object.keys(getstorewithId).length > 0 &&
  //   getstorewithId.data &&
  //   getstorewithId.data.menus &&
  //   getstorewithId.data.menus.length > 0 &&
  //   menus.length === 0
  // ) {
  //   setMenus(getstorewithId.data.menus);
  //   console.log("Menus")
  // }

  // console.log(getSingleProduct)
  const validation = () => {
		if (name === "") {
			setError("name");
			setErrorMsg("Name is required");
			return false;
		} else if (description === "") {
			setError("description");
			setErrorMsg("Description is required");
			return false;
		} else if (stock === "") {
			setError("stock");
			setErrorMsg("stock is required");
			return false;
		} else if (ammount === "") {
			setError("ammount");
			setErrorMsg("ammount is required");
			return false;
		} else if (discount === "") {
			setError("discount");
			setErrorMsg("Discount is required");
			return false;
    }else
    if(Object.keys(subMenu).length === 0){
      setError("subMenus");
			setErrorMsg("Menus is required!!");
			return false;
    }else
    if(selectRoles.length === 0){
      setError("selectRoles");
			setErrorMsg("Please Select Allowed Roles is required");
			return false;
    }else if(options === ""){
      setError("option");
      setErrorMsg("Please Select Product Status");
    }
     else {
			return true;
		}
	};
  const submitForm = (e) => {
    e.preventDefault();
    console.log(Object.keys(subMenu).length === 0)
		const valid = validation();
    console.log(valid);
    var products = [id];
    var subValue = subMenu.id;
    console.log("options",options)
		if (valid) {
      dispatch(
        addProdcutinSubMenusService({products,subValue})
      )
			dispatch(
				updateProduct({ id, name, description, ammount, discount, stock,selectRoles,options })
			);
			setShow(true);
      setLoading(true);
		}
  };
  const selectMenu = (obj)=>{
    setSubMenu(obj);
  }
  const handleSelectRoles = (id)=>{
    const cloneSelectRoles = [...selectRoles];
    const checkRole = cloneSelectRoles.findIndex(i=>i === id);
    if(checkRole > -1){
      cloneSelectRoles.splice(checkRole,1);
      setSelectRoles(cloneSelectRoles);

    }else{
      // const add = [...cloneSelectRoles,obj]
      setSelectRoles([...selectRoles,id])
    }
  }
  
  const SingleProduct  = (id)=>{
    console.log(id);
    dispatch(
      getProductbyid(id)
);
    
    setCotrolSwitch("view");
    setLoading(true);
    // SetviewSingleProduct(true);
}
  const viewModalClose = ()=>{
    SetviewSingleProduct(false);
    setSelectedImage("")
//     setFiles([]);
// setSelectedFiles([]);
// setPname("");
// setPrice("");
// setStock("");
// setDescription("");
// setDiscount("");
// setSize([]);
// SetColor([]);
}
const FeatureProductModal = (obj)=>{
 
  setFeatureProductId(obj.id);
setFeautreModalBoolean(true)
}
const FeatureModalClose = ()=> {
  setFeautreModalBoolean(false);
  setFeatureProductId("");
  setFeatureMessage("");
}
  const ModalComponent = () => {
		// console.log(updateStatus.message);
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
              addProductSubMenus.isSuccess && updateStatus.isSuccess ? <>
              	{updateStatus.message + " and " }
                
            {
              addProductSubMenus.message
            }
              </>:
              !addProductSubMenus.isSuccess && !updateStatus.isSuccess ? <>
           {
                updateStatus.message === "Server Error" && addProductSubMenus.message === "Server Error" ? "Server Error" : <>
                {updateStatus.message + " and " }
              
              {
                addProductSubMenus.message
              }
                </>
              }
            </>
              
              
              
              :
              
              !addProductSubMenus.isSuccess ?     <>
              {
                updateStatus.message === "Server Error" && addProductSubMenus.message === "Server Error" ? "Server Error" : <>
                {updateStatus.message + " and " }
              
              {
                addProductSubMenus.message
              }
                </>
              }
                 
            {/* {
              addProductSubMenus.message
            } */}
              </>:
              !updateStatus.isSuccess ? <>
                 {
                updateStatus.message === "Server Error" && addProductSubMenus.message === "Server Error" ? "Server Error" : <>
                {updateStatus.message + " and " }
              
              {
                addProductSubMenus.message
              }
                </>
              }
               {/* {
                 updateStatus.message
               } */}
              </>:""
            }
					
					</Modal.Body>
				</Modal>
			</>
		);
  };
  const SubmitFreatureProduct = (e)=>{
    e.preventDefault();
    dispatch(
      addApprovalService({featureMessage,featureProductid})
    )
    setApprovalDisable(true)
    
  }
  console.log("Feature object",featureProductid)
    return <>
   <div className="main-content singlemenu">
				<TopMenu  />
      
        {/* <Header /> */}
      
        
                <div className="container-fluid mt-4">
                
                <Tabs defaultActiveKey="Product" id="uncontrolled-tab-example" >
            
  <Tab eventKey="Product" title="Products"  >

            <>
            <LoadingOverlay
      active={loading}
      spinner
      text='Loading...'
    >
      {
       updateStatus && updateStatus.isSuccess && Object.keys(updateStatus).length > 0 && addProductSubMenus 
       && addProductSubMenus.isSuccess && Object.keys(addProductSubMenus).length > 0 && show ? 
       <ModalComponent /> :
       updateStatus && !updateStatus.isSuccess && Object.keys(updateStatus).length > 0 && addProductSubMenus 
       && !addProductSubMenus.isSuccess && Object.keys(addProductSubMenus).length > 0 && show ? 
       <ModalComponent />
       
       :
       updateStatus && !updateStatus.isSuccess && Object.keys(updateStatus).length > 0 && show ?  <ModalComponent />:
       addProductSubMenus && Object.keys(addProductSubMenus).length > 0 && !addProductSubMenus.isSuccess && show ?
       <ModalComponent />:""

      }
      <div className="container-fluid">
        <Row>
          {

            !listProductAdmin.isSuccess && Object.keys(listProductAdmin).length === 0 ?
              <div style={{ display: "inline-block", width: "100vw", height: "100vh" }} >
                  Product Not found Yet
              </div>

              :
              listProductAdmin.isSuccess && listProductAdmin.apiCall == "List Store Admin Product" && listProductAdmin
                && Object.keys(listProductAdmin).length > 0 ? <>
                  {

                 editModalClose ?   
                 <Modal
                      show={editModalClose}
                      size="xl"
                      onHide={handelEditModalClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body className="text-secondary text-center">
                        <input type="file" id="file" style={{ display: "none" }} />

                        <Row className="text-left" >
                          <Col>
                            <Row>
                              
                                <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2">

                                  {
                                    product && product.images && product.images.length > 0 ? product.images.map((image, indx) => {
                                      return <>

                                        <div className="co text-center" style={{ height: "inherit", width: "inherit" }}>

                                          <img src={image.thumbnail ? image.thumbnail : image} key={indx} className="mb-1" onClick={() => {
                                            setSelectedImage(image.thumbnail ? image.thumbnail : image)
                                            // setImage(image.orignalImage);
                                            // setSelectedfi(image.orignalImage);
                                          }} height="90rem" width="100%" style={{ height: "" }} />
                                      



                                        </div>
                                      </>
                                    }) : ""



                                  }
                                  {/* {
selectedFiles && selectedFiles.length > 0 && selectedFiles.length < 4 ?
<label htmlFor="file" className="plus">+</label> 

 
: selectedFiles.length === 0 ? 
<label htmlFor="file" className="plus">+</label> :""
} */}


                                </div>
                                <div className="col-md-5 col-sm-2 col-xs-2 col-lg-5">
                                  {
                                    console.log(product.images)
                                  }
                                  <div style={{
                                    backgroundImage: `url( ${selectImage ? selectImage :
                                      
                                      product && product.images && product.images.length > 0 ?
                                     
                                      product.images[0] && product.images[0].thumbnail   ? product.images[0].thumbnail: product.images[0]:product.images[0] 
                                    
                                    })`,
                                    backgroundSize: "contain",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    height: "300px"
                                  }}
                                  ></div>

                                </div>

                                  
                            </Row>
                            <Form onSubmit={submitForm}>
                              <Form.Group controlId="formGroupEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Product Name"
                                  defaultValue={name}
                                  onChange={(e) => {
                                    setName(e.target.value);
                                    resSetError();
                                  }}
                                />
                              </Form.Group>
                              {errorFor === "name" && errorMsg !== "" ? (
                                <div className="alert alert-danger">{errorMsg}</div>
                              ) : (
                                  ""
                                )}
                              <Form.Group controlId="formGroupPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  style={{ height: "100px" }}
                                  defaultValue={description}
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                    resSetError();
                                  }}
                                  placeholder="Product Description Here..."
                                />
                              </Form.Group>
                              {errorFor === "description" && errorMsg !== "" ? (
                                <div className="alert alert-danger">{errorMsg}</div>
                              ) : (
                                  ""
                                )}
                              <Form.Row>
                                <Form.Group as={Col}>
                                  <Form.Label> Stock </Form.Label>
                                  <InputGroup className="mb-2 mr-sm-2">
                                    <InputGroup.Prepend>
                                      <InputGroup.Text>Num</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                      id="inlineFormInputGroupUsername2"
                                      type="number"
                                      value={stock}
                                      placeholder="Stock"
                                      onChange={(e) => {
                                        setStock(e.target.value);
                                        resSetError();
                                      }}
                                    />
                                  </InputGroup>
                                  {errorFor === "stock" && errorMsg !== "" ? (
                                    <div className="alert alert-danger">{errorMsg}</div>
                                  ) : (
                                      ""
                                    )}
                                  {/* <Form.Control type="text" placeholder="Amount" /> */}
                                </Form.Group>
                              </Form.Row>

                              <Form.Row>
                                <Form.Group as={Col}>
                                  <Form.Label> Amount </Form.Label>
                                  <InputGroup className="mb-2 mr-sm-2">
                                    <InputGroup.Prepend>
                                      <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                      id="inlineFormInputGroupUsername2"
                                      placeholder="Amount"
                                      defaultValue={ammount}
                                      onChange={(e) => {
                                        setAmmount(e.target.value);
                                        resSetError();
                                      }}
                                    />
                                  </InputGroup>
                                  {errorFor === "ammount" && errorMsg !== "" ? (
                                    <div className="alert alert-danger">{errorMsg}</div>
                                  ) : (
                                      ""
                                    )}
                                  {/* <Form.Control type="text" placeholder="Amount" /> */}
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label> Discount Amount </Form.Label>
                                  <InputGroup className="mb-2 mr-sm-2">
                                    <Form.Control
                                      id="inlineFormInputGroupUsername2"
                                      placeholder="Discount Amount"
                                      defaultValue={discount}
                                      onChange={(e) => {
                                        setDiscount(e.target.value);
                                        resSetError();
                                      }}
                                    />
                                    <InputGroup.Prepend>
                                      <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                  </InputGroup>
                                  {errorFor === "discount" && errorMsg !== "" ? (
                                    <div className="alert alert-danger">{errorMsg}</div>
                                  ) : (
                                      ""
                                    )}
                                </Form.Group>
                              </Form.Row>
                              <div>
                                <button type="submit" className="btn btn-primary">
                                  Update Product
</button>
                              </div>
                            </Form>


                          </Col>

                          <Col sm={4} xs={4} lg={4} xl={4} className="p-0">

                          <h3 className="text-dark">Please Select {selectResult}</h3>
										<div id="accordion" style={{height:"360px",overflow:"scroll"}}>
                      {
                        console.log(listStoreAdmin)
                      }
                      {
                    listStoreAdmin && listStoreAdmin.data && Object.keys(listStoreAdmin.data).length > 0  && listStoreAdmin.data.superMenus &&  listStoreAdmin.data.superMenus.length > 0 ?  
                    
                    
                    listStoreAdmin.data.superMenus.map((resp, indx) => {
                      
                      if(resp && resp.menus && resp.menus.length > 0 && resp.menus.find(x=>x.subMenus.length > 0 )){
                        console.log("submens")
                        if(selectResult === ""){
                          setSelectResult("Sub Menus")
                        }
                    return  resp.menus.map((menu,mindx)=>{
                        console.log("menus",menu)
                    return   menu.subMenus.map((submenu,subindx)=>{
                            // console.log(submenu.name)
                           
                          return (
                            <span onClick={()=>{
                              selectMenu(submenu);
                              resSetError();
                            }}>
                    {
                      submenu.id === subMenu.id ? <div className="form-control" style={{color:"white",background:"green"}}>
                      
                      <label htmlFor={submenu.id}  >
                      <input type="radio" name="data" checked={ submenu.id ? true:false } id={submenu.id} className="mr-2" />
                      
                        {
                           submenu.name 
                        }
                      
                     
                      </label>
                      </div>
                      :
                    
                  
                    <h1 className="form-control"  >
                       <input type="radio" name="zain"  className="mr-2" />
                       {
                           submenu.name 
                       }
                   
                  
                   </h1>
                    } 
                      
                              
                           
                            </span>
                          );
                        })
                      })
                      
              
                      //  resp.menus.find("subMenus")
                     
                      }else
                  if(resp && resp.menus && resp.menus.length > 0){
                    if(selectResult === ""){
                      setSelectResult("Menus")
                    }
                return    resp.menus.map((menu,mindx)=>{
                      return (
                        <div key={mindx}>
                          <div
                            class="my-1"
                            onClick={()=>{
                              selectMenu(menu);
                              resSetError();
                            }}
                          >
                        {
                      menu.id === subMenu.id ? <label className="form-control" htmlFor={menu.id}  style={{color:"white",background:"green"}}>
                        <input type="radio" name="zain" checked={menu.id ? true:false} id={menu.id} className="mr-2" />
                     
                      {
                        menu.name
                      }
                    
                   
                    </label>:<h1 className="form-control"  >
                       <input type="radio" name="zain" className="mr-2" />
                         
                       {
                         menu.name
                       }
                   
                  
                   </h1>
                    }
                          </div>
                        </div>
                      );
                    })
                  }else{
                    return (
                      <div key={indx}>
                          <div
                            class="my-1"
                            onClick={()=>{
                              selectMenu(resp);
                              resSetError();
                            }}
                          >
                        {
                      resp.id === subMenu.id ? <label className="form-control" htmlFor={resp.id}  style={{color:"white",background:"green"}}>
                        <input type="radio" name="zain" checked={resp.id ? true:false} id={resp.id} className="mr-2" />
                     
                      {
                        resp.name
                      }
                    
                   
                    </label>:<h1 className="form-control"  >
                       <input type="radio" name="zain" className="mr-2" />
                         
                       {
                         resp.name
                       }
                   
                  
                   </h1>
                    }
                          </div>
                        </div>
                      );
                  }

                    
                    })
                    :""
                    }
                   
										</div>
                    {
                      errorFor === "subMenus" && errorMsg !== "" ? <div className="alert alert-danger">
                        {
                          errorMsg
                        }
                      </div>:""
                    }
                         
                          
                          {/* allow roles who buys products */}
                          <h3 className="text-dark">Allow Roles</h3>
                          {
                            roles && Object.keys(roles).length > 0 && roles.roles && roles.roles.length > 0 ? <>
                            {
                              roles.roles.map((role,indx)=>{
                                return <div onClick={()=>{
                                  handleSelectRoles(role.id);
                                  resSetError();
                                  }} key={indx}>
                                  {
                                    selectRoles.map((subRole,subindx)=>{
                                    return  subRole === role.id ? <div className="form-control" style={{position:'absolute',color:"white",backgroundColor:"green"}} key={subindx}>
                                        {
                                           role.name
                                        }
                                    </div>:""
                                    })
                                  }
                                  {/* {
                                    rolesAllowed.map((rolid,rolindx)=>{
                                      return  rolid === role.id ? <div className="form-control" style={{position:'absolute',color:"white",backgroundColor:"green"}} key={rolindx}>
                                      {
                                         role.name
                                      }
                                  </div>:""
                                    })
                                  } */}
                                  <div className="form-control my-1">
                                  {
                                    role.name
                                  }
                                  </div>
                              

                                </div>
                              })
                            }
                            </>:""
                          }
                          {
                            errorFor === "selectRoles" && errorMsg !== "" ? <div className="alert alert-danger">
                              {
                                errorMsg
                              }
                            </div>:""
                          }
                          <h3 className="text-dark">Product Status</h3>
                          <select className="form-control" onChange={(e)=> {
                            setOption(e.target.value);
                            resSetError();
                          }}>
                            {
                              productStatus.map((opt,indx)=>{
                                return statusOption === opt ? <option value={opt} key={indx} selected > { opt === "" ? "select":opt} </option> :
                                <option value={opt} key={indx}> { opt === "" ? "select":opt} </option>
                              })
                            }
                            {/* <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="DeActive">DeActive</option> */}
                          </select>
                          {
                            errorFor === "option" && errorMsg !== "" ? <div className="alert alert-danger">
                              {
                                errorMsg
                              }
                            </div>:""
                          }
                          </Col>
                         


                        </Row>






                      </Modal.Body>
                    </Modal>
:
""

                  }

{/* ---------------------------------------View Modals--------------------------------- */}
{
  viewSingleProduct ? <Modal
  show={viewSingleProduct}
  size="xl"
  onHide={viewModalClose}
  backdrop="static"
  keyboard={false}
>
  <Modal.Header closeButton></Modal.Header>
  <Modal.Body className="text-secondary text-center">
  <Row>
       <Col sm={12}>
           <Row className="" >

           <Col sm={2} xs={2} lg={1} xl={2} className="text-left">
{
product && product.images &&  product.images.length > 0 ?     product.images.map((images, indx) => {
       return <div key={indx} className="pb-1">
           <img src={images.thumbnail ? images.thumbnail:images} onClick={() => setSelectedImage(images.thumbnail ? images.thumbnail:images)} style={{ cursor: "pointer", height:"115px",width:"80%",textAlign:"center" }} />
       </div>
   }) :""
}
</Col>
<Col sm={5} xs={5} lg={5} xl={5} style={{minHeight:"460px"}} >
<div style={{
   backgroundImage:`url(${
       selectImage ? selectImage : 
       product && Object.keys(product).length > 0  && product.images.length > 0 ? product.images[0].thumbnail :product.images[0]

   })`,
   height:"100%",
   backgroundSize:"cover",
   backgroundPosition:"center center",
   backgroundRepeat:"no-repeat"
}}></div>
{/* <img src={
   selectImage ? selectImage : 
   product && Object.keys(product).length > 0  && product.images.length > 0 ? product.images[0] :""

} className="img-fluid" style={{ width: "100%", height: "100%" }} /> */}
</Col>
<Col sm={3} xs={3} lg={3} xl={3} className="d-flex  justify-content-start p-0">

<div>
   <h3 className="text-dark d-flex justify-content-start" style={{textTransform:"uppercase"}}>
       
       {
           product && Object.keys(product).length > 0 ? 
           product.name:""
       }
   </h3>
   <div className="text-dark d-flex justify-content-start" id="product">
   {
           product && Object.keys(product).length > 0 ? <>
           
           <label style={{fontSize:"1.5rem",fontWeight:"600",textAlign:"left"}}>Current Price:</label>
     <label style={{fontSize:"29px",lineHeight:"normal"}} className="ml-2"> { product.price ? '$ '+ product.price : "Price Not Disclosed" } </label> 
          {/* <label style={{textDecoration:'line-through',paddingLeft:"10px",fontSize:"28px"}} className="text-secondary">
              {"$"+ product.discountPrice}
          </label> */}
          
          </>
          :""
       }
       </div>
       <div id="description" className="d-flex justify-content-start text-dark">
           <label style={{fontSize:"1.2rem",fontWeight:"600"}}>Description:</label>
           <div className="ml-1 my-2" style={{fontSize:"1rem",lineHeight:"1",textAlign:"left"}}>
              {
                  product.description
              }
           </div>
       </div>
   <div id="color" className="d-flex justify-content-start">
   <label style={{ fontSize: "1.2rem",fontWeight:"600" }} className="text-dark text-left ">Colors:</label>
<div className="ml-2">
   {
product && product.colors &&     product.colors.length > 0 ? product.colors.map((color,indx)=>{
        return   <label className="ml-1" style={{ backgroundColor: `${color}`, height: "2rem", width: "2rem", borderRadius: "100%", display: "inline-block" }}></label>
       
           
       }):""
   }
   </div>
   </div>
  <div id="size" className="d-flex">
   <label style={{ fontSize: "1.2rem",fontWeight:"600" }} className="text-dark">Sizes:</label>
   <div className="ml-1 mt-1">
       {
   product && product.sizes  && product.sizes.length > 0  ?    product.sizes.map((size,indx)=>{
              return <div key={indx} className="mx-1 mb-1" style={{color:"black",display:"inline-block",border:"1px solid black",paddingTop:"0.2rem",height:"2rem",width:"2rem"}}>
                  {
                      size
                  }
              </div>
              
           })
           :""
       }
       </div>
   </div>
   <div id="product_Status" className="d-flex justify-content-start">
  <label style={{ fontSize: "1.2rem",fontWeight:"600",textAlign:"left" }} className="text-dark">Product Status:</label>
  <div>
  <select className="form-control">
    <option>{statusOption}</option>
  </select>
  </div>
  </div>
  
   
</div>

</Col>


           </Row>



       </Col>
      
   </Row> 
  </Modal.Body>
</Modal>
:""
}
           


{/* ---------------------------------------End View Modal------------------------------ */}


                  {
                    listProductAdmin && <>
                      {
                        listProductAdmin.data.products.map((resul, indx) => {
                          return    <div className="col-12  col-lg-4 col-xl-3   my-2 py-2 zoom" key={indx}>
                            <div className="card" >
                              <div className="card-img-top">
                                <div className="co text-center">
                                  <div class="co-overlay"></div>

                                  <div style={{
                                    height: "200px", width: "100%", backgroundImage: `url(
  ${resul.images[0].thumbnail ? resul.images[0].thumbnail : resul.images[0]
                                      }
  )`, backgroundSize: "cover", backgroundPosition: "center"
                                  }}></div>


                                  <div class="co-details fadeIn-bottom">


                                    <span className="edit mr-2" onClick={() => handleEditModal(resul.id)}>	<i class="far fa-edit " style={{ fontSize: "20px" }}></i>
                                    </span>

                                    
                                      <span className="view" onClick={() =>SingleProduct(resul.id)}>
                                        <i class="far fa-eye pt-2" style={{ fontSize: "20px" }}></i>
                                      </span>
                                
                                  </div>


                                </div>



                              </div>
                              <div class="card-body">

                                <div className="row ">

                                  <div className="col-12 text-secondary " >

                                    <h6 className="text-secondary" style={{ fontSize: "15px" }}>{resul.name} </h6>
                                    <span className={`${resul.status === "Active" ? "btn btn-success btn-sm":"btn btn-danger btn-sm"}`}>{resul.status}</span>
                                    
                              
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        })


                      }
                    </>
                  }

                </> :
                !listProductAdmin.isSuccess && Object.keys(listProductAdmin).length > 0 && listProductAdmin.apiCall == "List Store Admin Product" ? (
                  listProductAdmin.message
                ) : listProductAdmin.isSuccess && Object.keys(listProductAdmin).length > 0 && listProductAdmin && Object.keys(listProductAdmin) == 0 ? (
                  "No Data Found"
                ) : (
                      <div
                        // className="bg-light py-4 px-2"
                        style={{ display: "inline-block", width: "100vw", height: "100vh" }}
                      >
                        {/* Loading .... */}
                      </div>
                    )
          }



        </Row>

      </div>
    </LoadingOverlay>

            
            </>
  </Tab>
  {
    // console.log(featureProduct)
  }
  {/* -----------------------------------------Feature Product Tab Start-------------------------------------------- */}
  <Tab eventKey="Feature Product" title="Feature Product">
    {
      featureProduct && Object.keys(featureProduct).length > 0 &&
      featureProduct.isSuccess && featureProduct.data &&
      featureProduct.data.length > 0 ? 
    <div className="row">
      {
        featureProduct.data.map((obj,indx)=>{
          if(obj && obj.images && obj.images.length > 0){
           return obj.images.map((image,imgindx)=>{
           
           return   <div className="col-12  col-lg-4 col-xl-3   my-2 py-2 zoom" key={imgindx}>

<div className="card" >
  <div className="card-img-top">
  {
//  console.log(obj.name)
  } 

    <div className="co text-center">
      <div class="co-overlay"></div>

      <div style={{
        height: "200px", width: "100%", backgroundImage: `url( ${ image.thumbnail ? image.thumbnail : image  }
          
)`, backgroundSize: "cover", backgroundPosition: "center"
      }}></div>


      <div class="co-details fadeIn-bottom">


    
          <span className="view" style={{backgroundColor:"white"}} onClick={()=>FeatureProductModal(obj)}>
            <img src={icon} style={{height:"30px",width:"30px"}} />
            {/* <i class="far fa-eye pt-2" style={{ fontSize: "20px" }}></i> */}
          </span>
        
      </div>


    </div>



  </div>
  <div class="card-body">

    <div className="row ">

      <div className="col-12 text-secondary " >

        <h6 className="text-secondary" style={{ fontSize: "15px" }}>{obj.name}</h6>

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
      })
      }
    </div>
      
    
:
featureProduct && Object.keys(featureProduct).length > 0 &&
      featureProduct.isSuccess && featureProduct.data &&
      featureProduct.data.length === 0 ?
      "No data Found"
      :
      featureProduct && Object.keys(featureProduct).length > 0 &&
      !featureProduct.isSuccess ?
      <div>{featureProduct.message}</div>
      :""
    }

 	
  </Tab>
  
</Tabs>



				

  </div>
				
            </div>
            {/* ----------------------------------------Feature Product Request Modal ---------------------- */}
            <Modal
					show={featureModalBoolean}
					onHide={FeatureModalClose}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Body className="text-secondary">
						{/* <Form> */}
            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  style={{ height: "100px" }}
                                  value={featureMessage}
                                  disabled={approvaldisable ? true:false}
                                  onChange={(e) => {
                                   setFeatureMessage(e.target.value)
                                    resSetError();
                                  }}
                                  
                                  placeholder="Your Message..."
                                />
                              </Form.Group>
                              {
                                errorFor === "approval" && errorMsg !== "" ? <div className="alert alert-success">
                                  {
                                    errorMsg
                                  }
                                </div> :""
                              }
<div className="d-flex justify-content-end">
                              <button className="btn btn-default mr-1" onClick={FeatureModalClose} >Close</button>
                              <button className="btn btn-primary" onClick={SubmitFreatureProduct} disabled={approvaldisable ? true:false} >
                                
                              {
																	approvaldisable ? <Spinner
																	as="span"
																	animation="grow"
																	size="sm"
																	role="status"
																	aria-hidden="true"
																/>: "Send Request"
																}
                                </button>
                              </div>
            {/* </Form> */}
					</Modal.Body>
				</Modal>

    </>
}
export default Product;
