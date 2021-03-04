import React, { useState } from 'react';
import TopMenu from '../topMenue';
import { AddProductSuperAdminService } from '../../services/superAdminService/addProductSuperAdminService';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setApiCallsStatus } from '../../action/apiCallsStatus';
import './Multi_Step_Form/css/inventory.css';
import { Container, Row, Col,Form,Button } from 'react-bootstrap';
import './inventory.css';
function Inventory() {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();
    const [imag, setImage] = useState("");
    const size = ["XS", "S", "M", "L", "XL"];
    const [aler, checkAlert] = useState(true);
    const [color, setColor] = useState([]);
    const [result, setResult] = useState(true);
    const [stat, setStat] = useState(false);
    const [inp, setinp] = useState("");
    const [errorfor, SetError] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [focusImage,setfocusImages] = useState([]);
    // const [selectSize,setSize] = useState([]);

    const apiStatus = useSelector(state => state.apiCallStatus);
    // console.log(apiStatus.isSuccess)
    console.log(result)
    console.log(Object.keys(apiStatus));
    
    if (apiStatus.isSuccess && result && apiStatus.apiCall === "AddProductSuperAdmin") {
        setResult(false);
        setApiCallsStatus({});
        setTimeout(() => {
            alert(apiStatus.message);
        }, 2000);

    }
    else if (apiStatus && !apiStatus.isSuccess && !stat && apiStatus.apiCall === "AddProductSuperAdmin") {
        setStat(true)
        setTimeout(() => {
            alert(apiStatus.message);
        }, 3000);
    }


    const handleImageChange = (e) => {
        console.log(e.target.files[0])
        if (e.target.files) {
            setFiles([...files, e.target.files[0]]);
            console.log(files)
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );

            setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };
console.log(files)
    // const renderPhotos = (source) => {
    //     return source.map((photo) => {
    //         return <div className="my-2"> <img src={photo} onClick={() => setImage(photo)} height="100px" width="1000px" alt="" key={photo} />
    //         </div>
    //     });
    // };
    const validate = () => {

        if (inp === "") {
            SetError("inp");
            setErrorMsg("Product Name is required");
            return false
        } else {
            return true
        }
    }
    const showbox = ["","","","","","","","","","",""];
    const resetError = () => {
        SetError("");
        setErrorMsg("");
    }

    const handleSubmit = (e) => {
        console.log("handle click")
        e.preventDefault();
        console.log(errorfor)
        console.log({ inp, files })
        let value = validate();
        console.log(value)
        if (value) {
            dispatch(
                AddProductSuperAdminService({ inp, files })
            )
            setResult(true);
            setStat(false);
            resetError();
        }
    }
    const handleDelete = (img)=>{
        const subValue = [...selectedFiles];
        const filesClone = [...files];
        console.log(files);
        const checkIndex = subValue.findIndex(i=>i === img);
        console.log(checkIndex);
        filesClone.splice(checkIndex,1);
        setFiles(filesClone);
        subValue.splice(checkIndex,1);
        setSelectedFiles(subValue);
        
    }
    const sizeHandle = (data)=>{
        console.log("size")
        const subSize = [...color];
        console.log(data)
        setColor([color,data])
    }

    return <>
        <div className="main-content singlemenu">
            <TopMenu user="INVENTORY" />
            <Container className="mt-4">
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={3} xs={3}>
                                <input type="file" id="image" style={{display:"none"}} onChange={handleImageChange} />
                                <label for="image">
                                <div className="uploadbox">
                                    <div className="pl-2">
                                        <span style={{ fontSize: "40px" }}>
                                            +
                                         </span>
                                        <div>Please upload Design</div>
                                    </div>
                                </div>
                                </label>
                            </Col>
                            {
                                showbox.map((resp,indx)=>{
                                  return  <Col key={indx} sm={3} xs={3} className="my-2">
                                      <div className="box">
                                        {
                                            selectedFiles.map((image,subindex)=>{
    


                                             return   indx === subindex ? 
                                                 <div className="co text-center" style={{height:"inherit",width:"inherit"}}>
                                                     <div class="co-overlay"></div>

                                                     <img src={image} style={{ height: "inherit", width: "inherit" }} />

                                                     <div class="co-details fadeIn-bottom">

                                                         <span className="view">
                                                             <i class="fas fa-trash pt-2" style={{ fontSize: "20px" }} onClick={()=>handleDelete(image)}></i>
                                                         </span>

                                                     </div>


                                                 </div>
                                                 :""
                                            })
                                        }
                                </div>
                                  </Col>
                                })
                            }

                        </Row>


                    </Col>
                    <Col sm={3}>
                        {
                            selectedFiles && selectedFiles.length > 0 ?  <Form>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Product Name</Form.Label>
                              <Form.Control type="text" placeholder="Product Name" />
                              
                            </Form.Group>
                          
                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Product Price</Form.Label>
                              <Form.Control type="number" placeholder="$" />
                            </Form.Group>
                            <div className="form-group">
                                <label htmlFor="size">
                                    Choose a Size
                            </label>
                                <div className="d-flex" >
                                    {
                                        console.log(color)
                                    }
                                    {
                                        size.map((data, index) => {
                                            return <div key={index} style={{
                                                height: "50px", width: "50px", border: "1px solid white", textAlign: "center", fontSize: "20px",
                                                margin: "0 2px", padding: "5px",
                                                cursor: "pointer",

                                                backgroundColor: `${data === color ? "green" : ""}`
                                            }}

                                                onClick={(e) => sizeHandle(data)}>
                                                {data}
                                            </div>

                                        })
                                    }
                                </div>
                            </div>
                            
                          </Form>:""
                        }
                    

                    </Col>
                </Row>
            </Container>

        </div>
    </>
}
export default Inventory;