import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { getStoreUserId } from "../../services/superAdminService/getStoreUserIdService";
import { getProductbyid } from "../../services/storeAdminService/getStroreProductbyId";
import {getProductSingle} from '../../action/storeAdminAction/getProductbyidStoreAdmin';
import {setApiCallsStatus} from '../../action/apiCallsStatus';
import { getCookie } from "../../cookies/cookies";
export default function Other() {
  const [selectImage, setSelectedImage] = useState("");
  const [menus, setMenus] = useState([]);
  const [result, setResult] = useState([]);
  const [subMenu, setSubMenu] = useState([]);
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ammount, setAmmount] = useState("");
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState("");
  const [errorFor, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editModalClose, setEditModalClose] = useState(false);
  const dispatch = useDispatch();
  const getstorewithId = useSelector((state) => state.GetStoreUserId);
  const getSingleProduct = useSelector(
    (state) => state.getSingleProductbyStoreAdmin
  );
  const updateStatus = useSelector((state) => state.updateProductStoreAdmin);

  const [listloading, setlistLoading] = useState(false);
  const listProductAdmin = useSelector(state => state.listStoreAdminProduct);
  const apiStatus = useSelector(state => state.apiCallStatus);
  useEffect(()=>{
    const getStoreId = getCookie("profile");
    dispatch(
      getStoreUserId(getStoreId.storeId)
   );
  },[])
  if (apiStatus && Object.keys(apiStatus).length > 0 && apiStatus.isSuccess && apiStatus.apiCall == "List Store Admin Product" && loading) {
    setLoading(false)
    setTimeout(() => {
      dispatch(
        setApiCallsStatus({})
      )
    }, 3000);
  }
  else
    if (
      apiStatus && Object.keys(apiStatus).length > 0 &&
      !apiStatus.isSuccess && apiStatus.apiCall == "List Store Admin Product" &&
      loading
    ) {
      setLoading(false);
      setTimeout(() => {
        setApiCallsStatus({})
      }, 3000);

    }

  const resSetError = () => {
    setErrorMsg("");
    setError("");
  }

console.log(loading)

  if (
    getSingleProduct &&
    Object.keys(getSingleProduct).length > 0 && getSingleProduct.isSuccess && loading
  ) {
    console.log("zain")
    setLoading(false);
    setEditModalClose(true);
    setProduct(getSingleProduct.data);
    setName(getSingleProduct.data.name);
    setDescription(getSingleProduct.data.description);
    setStock(getSingleProduct.data.stock);
    setAmmount(getSingleProduct.data.price);
    setDiscount(getSingleProduct.data.discountPrice);
    
    setTimeout(() => {
      dispatch(getProductSingle({}))
    }, 3000);
  }
  
  const handleEditModal = (id) => {
  
    setLoading(true);
    dispatch(
      getProductbyid(id)
);
   

  }
  console.log(product);
  const handelEditModalClose = () => {
    setEditModalClose(false)
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
 
  return (
    <LoadingOverlay
      active={loading}
      spinner
      text='Loading...'
    >
      <div className="container-fluid">
        <Row>
          {

            !apiStatus.isSuccess && Object.keys(apiStatus).length === 0 ?
              <div style={{ display: "inline-block", width: "100vw", height: "100vh" }} >

              </div>

              :
              apiStatus.isSuccess && apiStatus.apiCall == "List Store Admin Product" && listProductAdmin
                && Object.keys(listProductAdmin).length > 0 ? <>
                  {

                 editModalClose ?   <Modal
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

                                          <img src={image.orignalImage} key={indx} className="mb-1" onClick={() => {
                                            setSelectedImage(image.orignalImage)
                                            // setImage(image.orignalImage);
                                            // setSelectedfi(image.orignalImage);
                                          }} height="90rem" width="100%" style={{ height: "" }} />
                                          <span style={{
                                            height: "25px", width: "25px",
                                            backgroundColor: "black",
                                            zIndex: 200,
                                            position: "absolute",
                                            top: "5px",
                                            right: "5px",
                                            border: "2px solid black",
                                            borderRadius: "200px",
                                            display: "flex",
                                            justifyContent: "center"
                                          }}>
                                            <i class="fas fa-times" onClick={() => {
                                              // handleDelete(image);
                                              // setdelselectImage("");
                                            }} style={{ fontSize: "20px", color: "white" }}></i>
                                          </span>



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
                                  <div style={{
                                    backgroundImage: `url( ${selectImage ? selectImage : ""})`,
                                    backgroundSize: "contain",
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    height: "300px"
                                  }}
                                  ></div>

                                </div>

                                  
                            </Row>
                            <Form>
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

                          <Col sm={4} xs={4} lg={4} xl={4} className="d-flex  justify-content-start p-0">


                         
                          </Col>


                        </Row>






                      </Modal.Body>
                    </Modal>
:
""

                  }



























                  {
                    listProductAdmin && <>
                      {
                        listProductAdmin.data.products.map((resul, indx) => {
                          return <div className="col-12  col-lg-4 col-xl-3   my-2 py-2 zoom" key={indx}>
                            <div className="card" >
                              <div className="card-img-top">


                                <div className="co text-center">
                                  <div class="co-overlay"></div>

                                  <div style={{
                                    height: "200px", width: "100%", backgroundImage: `url(
  ${resul.images[0] ? resul.images[0].thumbnail : "https://dummyimage.com/300x200/000/fff"
                                      }
  )`, backgroundSize: "cover", backgroundPosition: "center"
                                  }}></div>


                                  <div class="co-details fadeIn-bottom">


                                    <span className="edit mr-2" onClick={() => handleEditModal(resul.id)}>	<i class="far fa-edit " style={{ fontSize: "20px" }}></i>
                                    </span>

                                    <Link to={`/Store_Management/`}>
                                      <span className="view">
                                        <i class="far fa-eye pt-2" style={{ fontSize: "20px" }}></i>
                                      </span>
                                    </Link>
                                  </div>


                                </div>



                              </div>
                              <div class="card-body">

                                <div className="row ">

                                  <div className="col-12 text-secondary " >

                                    <h6 className="text-secondary" style={{ fontSize: "15px" }}>{resul.name}</h6>

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
                    </>
                  }

                </> :
                !apiStatus.isSuccess && Object.keys(apiStatus).length > 0 && apiStatus.apiCall == "List Store Admin Product" ? (
                  apiStatus.message
                ) : apiStatus.isSuccess && Object.keys(apiStatus).length > 0 && listProductAdmin && Object.keys(listProductAdmin) == 0 ? (
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
  )
}
