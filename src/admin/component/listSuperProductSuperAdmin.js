import React, { useEffect, useState } from 'react';
import TopMenu from '../topMenue';
import { listSuperProductSuperAdmin } from '../../services/superAdminService/listSuperProductSuperAdminService';
import { AddProductSuperAdminService } from '../../services/superAdminService/addProductSuperAdminService';
import { getSingleProductbySuperAdmin } from '../../services/superAdminService/getSingleProductbySuperAdmin';
import { EditProductSuperAdmin } from '../../services/superAdminService/editSuperAdminProduct';
import { addProductSuperAdmin } from '../../action/addProductSuperAdminAction';
import { getProductSingle } from '../../action/getSingleProductbySuperAdmin';
import { editProductSuperAdmin } from '../../action/editProductSuperAdminAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Form, Col, Row } from 'react-bootstrap';
import './listSuperProductAdmin.css';
import LoadingOverlay from 'react-loading-overlay';
import { Table } from 'react-bootstrap';
import _ from 'lodash';




function ListSuperProduct() {
    const [uploadModal, setUploadModal] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [product, setProduct] = useState({});
    const [selectImage, setSelectedImage] = useState("");
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState("");
    const handleClose = () => SetviewSingleProduct(false);
    const [size, setSize] = useState([]);
    const [selectSize, setSelectSize] = useState("");
    const [color, SetColor] = useState("");
    const [pname, setPname] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [description, setDescription] = useState("");
    const [errorfor, setErrorFor] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [modaClose, setModalClose] = useState(false);
    const [controlSwitch, setCotrolSwitch] = useState("");
    const [viewSingleProduct, SetviewSingleProduct] = useState(false);
    const [editSingleProductModal, setEditSingleProductModal] = useState(false);
    const [stock, setStock] = useState("");
    const [removeImages, setRemoveImages] = useState([]);
    const [delselectImage, setdelselectImage] = useState("");
    const [wishSelectImage, setWishselectImage] = useState([]);
    const [selectRaw, setRaw] = useState([]);
    const [rawStock, setRawstock] = useState(" ");
    const [skuCode, setSkuCode] = useState(" ");
    const [dummyIndex,setDummyIndx] = useState("");
    const [dummySize, setdummySize] = useState([]);
    let [viewModaSize, setViewModalSize] = useState("");
    let [rawColor,setRawColor] = useState(" ");

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    // const nonSelcted = ["", "", "", ""];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            listSuperProductSuperAdmin()
        )
    }, []);
    const listSuperProduct = useSelector(state => state.listSuperProduct);
    const { data } = listSuperProduct;
    const apiStatus = useSelector(state => state.apiCallStatus);
    const AddProductStatus = useSelector(state => state.addProductSuperAdmin);
    const singleProductSuperAdmin = useSelector(state => state.getSingleProductSuperAdmin);
    const editProductSuperAdminStatus = useSelector(state => state.editProductSuperAdmin)
    const handleDelete = (img, indx) => {
        const subValue = [...selectedFiles];
        const filesClone = [...files];
        console.log(files);
        const checkIndex = subValue.findIndex(i => i === img);
        const wishClone = [...wishSelectImage];
        console.log("images", img)
        const wishIndex = wishClone.findIndex(i => i.thumbnail === img.thumbnail);
        console.log(wishIndex);
        if (wishIndex > -1) {
            wishClone.splice(wishIndex, 1);
            setWishselectImage(wishClone);
        } else {

            // var image = img.thumbnail ? img.thumbnail : img
            // if(checkIndex < 0){

            // } else{
            //     console.log("hello")
            //     setWishselectImage([...wishSelectImage,image]);
            // }
            console.log(checkIndex);
            console.log("WishSelectImages", wishSelectImage);
            // setRemoveImages([...removeImages,img]);
            filesClone.splice(checkIndex, 1);
            setFiles(filesClone);
            subValue.splice(checkIndex, 1);
            setSelectedFiles(subValue);
        }

    }
    // console.log("WishSelectImages",wishSelectImage);

    // console.log(selectRaw)
    // const HandleKeys = (event) => {
    //     console.log(event.key)
    //     if (event.key === 'Enter') {
    //         console.log('do validate')
    //     }
    // }
    const validation = () => {
        if (pname === "") {
            console.log("pname")
            setErrorFor("pname");
            setErrorMsg("Product Name is required!!");
            return false;
        } else
            if (price === "") {
                debugger
                setErrorFor("price");
                setErrorMsg("Product price is required!!");
                return false;
            }
            else
                if (discount === "") {
                    setErrorFor("discount");
                    setErrorMsg("Product Discount is required!!");
                    return false;
                }
                else
                    if (description === "") {
                        setErrorFor("description");
                        setErrorMsg("Product Description is required!!");
                        return false;
                    } else
                        if (size.length === 0) {
                            setErrorFor("size");
                            setErrorMsg("Please Select a size!!");
                            return false;
                        } else {
                            return true;
                        }
    };
    const resetError = () => {
        setErrorMsg("");
        setErrorFor("");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let validate = validation();
        if (validate) {
            console.log("all validate working");

            // console.log({files,pname,price,discount,description,size,color})

            dispatch(
                AddProductSuperAdminService({ files, pname, price, discount, description, size, color })
            )
            setLoading(true);
            setShow(false);
            setUploadModal(false);
        }
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
            console.log(filesArray);

        }
        setUploadModal(true);
    };
    // console.log("selectimages",selectedFiles);

    const editImageHandle = (e) => {
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


    }



    if (AddProductStatus && Object.keys(AddProductStatus).length > 0 && !AddProductStatus.isSuccess && loading) {
        setLoading(false);
        setModalClose(true);
        setPname("");
        setPrice("");
        setStock("");
        setDescription("");
        setSelectedFiles([]);
        setFiles([]);
        setDiscount("");
        setSize([]);
        SetColor([]);

        setTimeout(() => {
            setModalClose(false);
            dispatch(
                addProductSuperAdmin({}),
                // listSuperProductSuperAdmin()
            )
        }, 3000);
    } else
        if (AddProductStatus &&
            Object.keys(AddProductStatus).length > 0 &&
            AddProductStatus.isSuccess &&
            loading
        ) {
            setLoading(false);
            setModalClose(true);
            setPname("");
            setPrice("");
            setStock("");
            setDescription("");
            setSelectedFiles([]);
            setFiles([]);
            setDiscount("");
            setSize([]);
            SetColor([]);
            setTimeout(() => {
                setModalClose(false);
                dispatch(
                    addProductSuperAdmin({})
                )
                dispatch(listSuperProductSuperAdmin())
            }, 3000);
        } else
            if (
                editProductSuperAdminStatus &&
                Object.keys(editProductSuperAdminStatus).length > 0 &&
                editProductSuperAdminStatus.data &&
                editProductSuperAdminStatus.isSuccess && loading
            ) {
                setEditSingleProductModal(false);
                setLoading(false);
                setModalClose(true);
                setTimeout(() => {
                    setModalClose(false);
                    setFiles([]);
                    setSelectedFiles([]);
                    setPname("");
                    setPrice("");
                    setDescription("");
                    setDiscount("");
                    setStock("");
                    setSize([]);
                    SetColor([]);
                    setWishselectImage([]);
                    dispatch(
                        editProductSuperAdmin({})
                    )
                    dispatch(listSuperProductSuperAdmin())
                }, 3000);
            }
            else
                if (
                    editProductSuperAdminStatus &&
                    Object.keys(editProductSuperAdminStatus).length > 0 &&
                    !editProductSuperAdminStatus.isSuccess && loading
                ) {
                    console.log("zain")
                    setEditSingleProductModal(false);
                    setLoading(false);
                    setModalClose(true);
                    setTimeout(() => {
                        setModalClose(false);
                        setFiles([]);
                        setSelectedFiles([]);
                        setPname("");
                        setPrice("");
                        setStock("");
                        setDescription("");
                        setDiscount("");
                        setSize([]);
                        SetColor([]);
                        dispatch(
                            editProductSuperAdmin({}),
                            //    listSuperProductSuperAdmin()
                        )
                    }, 3000);
                }
    // console.log(editProductSuperAdminStatus);
    if (singleProductSuperAdmin &&
        singleProductSuperAdmin.data &&
        Object.keys(singleProductSuperAdmin).length > 0 &&
        singleProductSuperAdmin.isSuccess && singleProductSuperAdmin.apiCall === "Get Single Product by Super Admin" && loading
    ) {
        setLoading(false);
        if (controlSwitch === "edit") {
            setEditSingleProductModal(true);
        } else
            if (controlSwitch === "view") {
                SetviewSingleProduct(true);
            }

        setSelectedFiles(singleProductSuperAdmin.data.images);
        setWishselectImage(singleProductSuperAdmin.data.images);
        setProduct(singleProductSuperAdmin.data)
        //  setFiles(singleProductSuperAdmin.data.images);
        setPrice(singleProductSuperAdmin.data.price);
        setPname(singleProductSuperAdmin.data.name);
        //    setSize(singleProductSuperAdmin.data.sizes);
        let new_obj = {}
        Object.keys(singleProductSuperAdmin.data.sizes).forEach((siz) => {
            if (singleProductSuperAdmin.data.sizes[siz].length > 0) {
                new_obj[siz] = singleProductSuperAdmin.data.sizes[siz];
                setSelectSize(siz)

            }

            console.log("new Objects", new_obj);

        })
        setSize(new_obj)


        setDescription(singleProductSuperAdmin.data.description);
        setDiscount(singleProductSuperAdmin.data.discountPrice);
        // setStock(singleProductSuperAdmin.data.stock);
        //  SetColor(singleProductSuperAdmin.data.colors);
        setImage("");
        //  singleProductSuperAdmin.data.images.forEach(element => {
        //     setFiles([...files,element]);
        //  });

        setTimeout(() => {
            //  SetviewSingleProduct(false);
            dispatch(
                getProductSingle({})
            )
        }, 3000);
    }

    //  console.log("working",size)
    //  console.log("size length",size);
    const delSize = (data) => {
        const subValue = { ...size };
        // console.log(subValue);


        //  var resp = Object.keys(size)[Object.keys(size).length - 1]

        const value = _.omit(subValue, [data]);
        console.log(Object.keys(value)[Object.keys(value).length - 1])
        setSize(value);

        console.log("remove ing data", Object.keys(size))


        setSelectSize(Object.keys(value)[Object.keys(value).length - 1]);
        debugger;
        console.log(selectSize);



        // console.log("Delete size call")

    }
    console.log('rawstock=>',rawStock)
    const sizeHandle = (data) => {
        let sizeClone  = {...size};
        let rawStockClone = rawStock;
        let rawskuCodeClone = skuCode;
        let rawColorClone = rawColor;
        var BreakException = {}; 
        console.log(data)

        debugger;
try{

    Object.keys(sizeClone).forEach(element => {
        // if( sizeClone[element].length === 0    ){
        //     console.log("zain condition true");
        //     rawColorClone = "raw" 
        //     setRawColor(rawColorClone);
        // }
        sizeClone[element].forEach((inf,indx)=>{
            if(inf.totalStock !== ""){
                rawStockClone = " ";
                
            }else
            if(inf.totalStock === "" || inf.totalStock === 0){
                rawStockClone = "raw";
                setRawstock(rawStockClone);
               
                throw BreakException;
              
               
                
            }
            if(inf.skuCode !== ""){
                rawskuCodeClone = " ";
                
            }else
            if(inf.skuCode === ""){
                rawskuCodeClone = "raw" 
                setSkuCode(rawskuCodeClone);
                throw BreakException;
               
            }
            
        })
        
        
        
    });

}catch(e){
    if(BreakException != e) throw e;
}
        
        setRawstock(rawStockClone)

        console.log("raw error",rawStockClone)
        
        if(rawStockClone === " " && rawskuCodeClone === " " ){
            
            setSize({ ...sizeClone, [data]: [] });
            setSelectSize(data);
            
        }
      
        

    }
    const DelColor = (data, sind) => {
        const cloneSize = { ...size };
        cloneSize[data].splice(sind, 1);
        setRawstock(" ");
        
        setSkuCode(" ");
        setSize(cloneSize);
    }

    const handleColor = (colordata) => {
        // console.logo(colordata)
        // setRawColor(" ");
        const cloneSize = { ...size };
        let rawStockClone = rawStock;
        let rawskuCodeClone = skuCode;
        let dummyException = {}
        try{
            Object.keys(cloneSize).forEach(element => {
            
                cloneSize[element].forEach((inf,indx)=>{
                    console.log("colordata",inf)
                    if(inf.totalStock !== ""){
                        rawStockClone = " "
                    
                    }else
                    if(inf.totalStock === "" || inf.totalStock === 0){
                        
                        rawStockClone = "raw";
                        setRawstock(rawStockClone);
                        throw dummyException;
                        
                        
                    }
    
                    if( inf.skuCode !== ""){
                        rawskuCodeClone = " "
                    }else
                    if(inf.skuCode === ""){
                        rawskuCodeClone = "raw";
                        setSkuCode(rawskuCodeClone);
                        throw dummyException;
                       
                    }
                })
            
                
            });
            
        setSkuCode(rawskuCodeClone);

console.log("sizes",size);
        console.log("raw error",rawStockClone)
        
        if(rawStockClone === " " && rawskuCodeClone === " " && rawColor === " " ){
            // debugger
            var col = {
                color: colordata,
                totalStock: "",
                skuCode: ""
            }
            cloneSize[`${selectSize}`].push(col);  
            setSize(cloneSize)  
           
        }
        
        
      
        }catch(e){
            if(e !== dummyException) throw e;
        }
        
        

       
    }

    const addStock = (mindx, obj) => {
        setRaw([obj])
       
        console.log(" stock click")

    }
    const stockVal = (dat, sindx, value) => {
        const rawData = { ...size };
   
        rawData[dat][sindx].totalStock = value;
      
        setSize(rawData);
        


    }
    const skuCodeVal = (dat, sindx, value) => {
        // console.log("main indx",mindx);
        // console.log("sub index",sindx);
        const rawData = { ...size };
        // setSkuCode(value)
        rawData[dat][sindx].skuCode = value;
        setSize(rawData);
        // rawData[dat].forEach((data) => {
        //     if (data.skucode === "") {
        //         setRawstock("no");

        //     } else {
        //         setRawstock("");
        //         setSkuCode("");
        //     }
        // })
    }
    const ModalComponent = () => {
        // console.log(apiStatus);
        return (
            <>
                <Modal
                    show={modaClose}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body className="text-secondary text-center">
                        {
                            Object.keys(AddProductStatus).length > 0 && AddProductStatus.isSuccess ? AddProductStatus.message :
                                Object.keys(AddProductStatus).length > 0 && !AddProductStatus.isSuccess ? AddProductStatus.message : ""
                        }
                        {
                            Object.keys(editProductSuperAdminStatus).length > 0 && editProductSuperAdminStatus.isSuccess ?
                                editProductSuperAdminStatus.message :
                                Object.keys(editProductSuperAdminStatus).length > 0 && !editProductSuperAdminStatus.isSuccess ?
                                    editProductSuperAdminStatus.message : ""
                        }

                    </Modal.Body>
                </Modal>
            </>
        );
    };
    const EditHandle = (id) => {
        // setShow(true);
        dispatch(
            getSingleProductbySuperAdmin(id)
        )
        setCotrolSwitch("edit");
        setLoading(true);
        // setEditSingleProductModal(true);
    }
    const SingleProduct = (id) => {
        console.log(id);
        dispatch(
            getSingleProductbySuperAdmin(id)
        )
        setCotrolSwitch("view");
        setLoading(true);
        // SetviewSingleProduct(true);
    }
    // console.log(product);
    const renderPhotos = () => {
        return (
            <>
                <Col sm={2} xs={2} lg={1} xl={2} className="text-left">
                    {
                        product && product.images && product.images.length > 0 ? product.images.map((images, indx) => {
                            return <div key={indx} className="pb-1">
                                <img src={images.thumbnail ? images.thumbnail : images} onClick={() => setSelectedImage(images.orignalImage)} style={{ cursor: "pointer", height: "115px", width: "80%", textAlign: "center" }} />
                            </div>
                        }) : ""
                    }
                </Col>
                <Col sm={5} xs={5} lg={5} xl={5} style={{ minHeight: "460px" }} >
                    <div style={{
                        backgroundImage: `url(${selectImage ? selectImage :
                            product && Object.keys(product).length > 0 && product.images.length > 0 ? product.images[0] : ""

                            })`,
                        height: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat"
                    }}></div>
                    {/* <img src={
                        selectImage ? selectImage : 
                        product && Object.keys(product).length > 0  && product.images.length > 0 ? product.images[0] :""

                    } className="img-fluid" style={{ width: "100%", height: "100%" }} /> */}
                </Col>
                <Col sm={5} xs={5} lg={5} xl={5} className="d-flex  justify-content-start p-0">

                    <div>
                        <h3 className="text-dark d-flex justify-content-start" style={{ textTransform: "uppercase" }}>

                            {
                                product && Object.keys(product).length > 0 ?
                                    product.name : ""
                            }
                        </h3>
                        <div className="text-dark d-flex justify-content-start" id="product">
                            {
                                product && Object.keys(product).length > 0 ? <>

                                    <label style={{ fontSize: "1.5rem", fontWeight: "600" }}>Current Price:</label>
                                    <label style={{ fontSize: "29px", lineHeight: "normal" }} className="ml-2"> {'$ ' + product.price} </label>
                                    {/* <label style={{textDecoration:'line-through',paddingLeft:"10px",fontSize:"28px"}} className="text-secondary">
                                   {"$"+ product.discountPrice}
                               </label> */}

                                </>
                                    : ""
                            }
                        </div>
                        <div id="description" className="d-flex justify-content-start text-dark">
                            <label style={{ fontSize: "1.2rem", fontWeight: "600" }}>Description:</label>
                            <div className="ml-1 my-2" style={{ fontSize: "1rem", lineHeight: "1", textAlign: "left" }}>
                                {
                                    product.description
                                }
                            </div>
                        </div>
                        {/* <div id="color" className="d-flex justify-content-start">
                        <label style={{ fontSize: "1.2rem",fontWeight:"600" }} className="text-dark text-left ">Colors:</label>
                    <div className="ml-2">
                        {
                     product && product.colors &&     product.colors.length > 0 ? product.colors.map((color,indx)=>{
                             return   <label className="ml-1" style={{ backgroundColor: `${color}`, height: "2rem", width: "2rem", borderRadius: "100%", display: "inline-block" }}></label>
                            
                                
                            }):""
                        }
                        </div>
                        </div> */}
                        <div id="size" className="d-flex">
                            <label style={{ fontSize: "1.2rem", fontWeight: "600" }} className="text-dark">Sizes:</label>
                            <div className="ml-1 mt-1 text-left">
                                {
                                    product && product.sizes && Object.keys(product.sizes).length > 0 ? Object.keys(product.sizes).map((size, indx) => {
                                        if (product.sizes[size].length > 0) {
                                            return <div key={indx} className="mx-1 mb-1 text-center" style={{ color: "black", display: "inline-block", border: "1px solid black", paddingTop: "0.2rem", height: "2rem", width: "2rem" }} onClick={() => setViewModalSize(size)}>
                                                {
                                                    size
                                                }
                                            </div>
                                        }


                                    })
                                        : ""
                                }
                            </div>
                        </div>
                        <div style={{ width: "inherit" }}>
                            {
                                product && product.sizes && Object.keys(product.sizes).length > 0 ? Object.keys(product.sizes).map((size, indx) => {
                                    if (product.sizes[size].length > 0) {
                                        return size === viewModaSize ?

                                            <Table striped bordered hover className="mt-3">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Available Color for {size}</th>

                                                        <th>Sku Code</th>
                                                        <th>Total Stock</th>
                                                        <th>Current Stock</th>
                                                        {/* <th>Action</th> */}
                                                    </tr>
                                                </thead>
                                                {

                                                    product.sizes[size].map((color, ind) => {

                                                        return <tbody onClick={() => addStock(indx, color)}>
                                                            <tr>
                                                                <td>{(ind + 1)}</td>
                                                                <td><div key={ind} style={{ height: "40px", width: "40px", display: "inline-block", backgroundColor: `${color.color}` }} key={ind} ></div>
                                                                </td>
                                                                <td>
                                                                    {color.skuCode ? color.skuCode : "N/A"}

                                                                </td>
                                                                <td>
                                                                    {color.totalStock}
                                                                </td>
                                                                <td>
                                                                    {color.currentStock}
                                                                </td>

                                                            </tr>
                                                        </tbody>



                                                    })
                                                }

                                            </Table>


                                            : ""
                                    }


                                })
                                    : ""
                            }
                        </div>



                    </div>
                </Col>
            </>

        );
    }
    const EditSuperProductSubmit = (e) => {
        e.preventDefault();
        console.log("edit")
        console.log(product.id);
        var productid = product.id;
        const validate = validation();
        if (validate) {
            dispatch(
                EditProductSuperAdmin({
                    productid,
                    pname,
                    price,
                    discount,
                    description,
                    size,
                    files,
                    wishSelectImage
                })
            )
            setEditSingleProductModal(false);
            setLoading(true);
        }
    }
    const editModalClose = () => {
        setEditSingleProductModal(false);
        setFiles([]);
        setSelectedFiles([]);
        setPname("");
        setPrice("");
        setStock("");
        setDescription("");
        setDiscount("");
        setSize([]);
        SetColor([]);
        setImage("");

    }

    const viewModalClose = () => {
        SetviewSingleProduct(false);
        setViewModalSize("");
        setFiles([]);
        setSelectedImage("");
        setSelectedFiles([]);
        setPname("");
        setPrice("");
        setStock("");
        setDescription("");
        setDiscount("");
        setSize([]);
        SetColor([]);
    }
    const uploadModaClose = () => {
        setUploadModal(false);
        setFiles([]);
        setSelectedFiles([]);
        setPname("");
        setPrice("");
        setStock("");
        setDescription("");
        setDiscount("");
        setSize([]);
        SetColor([]);
        setRawstock(" ");
        setSkuCode(" ");
        setSelectSize("");
    }
    // console.log(Object.keys(size))
    return <>
        <div className="main-content singlemenu">
            <TopMenu user="Inventory" />
            {
                AddProductStatus.isSuccess ? <ModalComponent /> :
                    !AddProductStatus.isSuccess ? <ModalComponent /> : ""
            }
            {
                editProductSuperAdminStatus.isSuccess ? <ModalComponent /> :
                    !editProductSuperAdminStatus.isSuccess ? <ModalComponent /> : ""
            }
            <div className="container-fluid">
                <div className="main-content-body">

                    <LoadingOverlay
                        active={loading}
                        spinner
                        text='Loading...'
                    >
                        <div className="row px-3">
                            <div className="col-lg-4 col-md-3 button zoom d-flex justify-content-center align-items-center uploadButton mt-4" style={{
                                height: "17rem",
                                width: "13rem",
                                // border:"1px solid #E9EBEC",
                                borderRadius: "7px",
                                cursor: "pointer"
                                // backgroundColor:"#144EFC"
                            }}>
                                <div>
                                    <input type="file" style={{ display: "none" }} id="fileUpload" onChange={handleImageChange} />
                                    <label htmlFor="fileUpload" >
                                        <div className="upload-button " >

                                            <span style={{ fontSize: "100px", color: "white", cursor: "pointer" }}>+</span>
                                            <div style={{ marginTop: "-30px", color: "white" }}>Add Products</div>



                                        </div>
                                    </label>
                                </div>
                            </div>
                            {/* --------------------------------------upload Modals --------------------------  */}

                            {
                                uploadModal ?

                                    <Modal
                                        show={uploadModal}
                                        size="lg"
                                        onHide={uploadModaClose}
                                        backdrop="static"
                                        keyboard={false}  >
                                        <Modal.Header closeButton></Modal.Header>
                                        <Modal.Body className="text-secondary text-center">
                                            <input type="file" onChange={handleImageChange} id="file" style={{ display: "none" }} />
                                            <div className="row">
                                                <div className="col-md-2 col-lg-2">

                                                    {
                                                        selectedFiles.map((image, indx) => {
                                                            return <>   <div className="co text-center" style={{ height: "inherit", width: "inherit" }}>
                                                                {/* <div class="co-overlay"></div> */}

                                                                <img src={image} key={indx} className="mb-1" onClick={() => {
                                                                    setImage(image);
                                                                    setdelselectImage(image);
                                                                }} height="100px" width="100px" style={{ height: "" }} />

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
                                                                        handleDelete(image);
                                                                        setdelselectImage("");
                                                                    }} style={{ fontSize: "20px", color: "white" }}></i>
                                                                </span>
                                                                {/* <div class="co-details fadeIn-bottom">
  
                                          <span className="view">
                                          
                                              <i class="fas fa-eye pt-2" style={{ fontSize: "20px" }} onClick={()=>setImage(image)}></i>
                                          </span>
                                          <span className="view">
                                          
                                              <i class="fas fa-trash pt-2" style={{ fontSize: "20px" }} onClick={()=>handleDelete(image)}></i>
                                          </span>
  
                                      </div>
   */}

                                                            </div>
                                                            </>
                                                        })



                                                    }
                                                    {
                                                        selectedFiles && selectedFiles.length > 0 && selectedFiles.length < 4 ?
                                                            <label htmlFor="file" className="plus">+</label>


                                                            : selectedFiles.length === 0 ?
                                                                <label htmlFor="file" className="plus">+</label> : ""
                                                    }


                                                </div>
                                                <div className="col-md-10 col-lg-10">
                                                    <img src={image === delselectImage ? image : selectedFiles[0]} style={{ height: "412px", width: "100%" }} />
                                                </div>

                                            </div>
                                            {
                                                selectedFiles.length > 0 ? <div className="row mt-4">
                                                    <div className="col-12">
                                                        <Form onSubmit={handleSubmit}>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label className="text-left">Product Name</Form.Label>
                                                                        <Form.Control type="text" placeholder="Product Name" onChange={
                                                                            (e) => {
                                                                                setPname(e.target.value);
                                                                                resetError();
                                                                            }
                                                                        } />
                                                                        {
                                                                            errorfor === 'pname' && errorMsg !== "" ? <div className="alert alert-danger">
                                                                                {
                                                                                    errorMsg
                                                                                }
                                                                            </div> : ""
                                                                        }
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label className="text-left">Price</Form.Label>
                                                                        <Form.Control type="Number" placeholder="Product Price" onChange={
                                                                            (e) => {
                                                                                setPrice(e.target.value);
                                                                                resetError();
                                                                            }
                                                                        } />
                                                                        {
                                                                            errorfor === 'price' && errorMsg !== "" ? <div className="alert alert-danger">
                                                                                {
                                                                                    errorMsg
                                                                                }
                                                                            </div> : ""
                                                                        }
                                                                    </Form.Group>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Group controlId="discount">
                                                                <Form.Label className="text-left">Discount Price</Form.Label>
                                                                <Form.Control type="number" placeholder="Discount Price" onChange={
                                                                    (e) => {
                                                                        setDiscount(e.target.value);
                                                                        resetError();
                                                                    }
                                                                } />
                                                                {
                                                                    errorfor === 'discount' && errorMsg !== "" ? <div className="alert alert-danger">
                                                                        {
                                                                            errorMsg
                                                                        }
                                                                    </div> : ""
                                                                }
                                                            </Form.Group>


                                                            <Form.Group controlId="formBasicEmail">
                                                                <Form.Label className="text-left">Description</Form.Label>
                                                                <Form.Control as="textarea" rows={3} style={{ height: "100px" }} onChange={(e) => {
                                                                    setDescription(e.target.value);
                                                                    resetError();
                                                                }} placeholder="Product Description" />
                                                                {
                                                                    errorfor === 'description' && errorMsg !== "" ? <div className="alert alert-danger">
                                                                        {
                                                                            errorMsg
                                                                        }
                                                                    </div> : ""
                                                                }
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Form.Label className="text-left">Choose a Size</Form.Label>

                                                                <div className="d-flex" >
                                                                            {
                                                                                sizes.map((data, index) => {

                                                                                    return sizes.length > 0 ?
                                                                                        <div key={index} style={{
                                                                                            height: "50px", width: "50px", border: `${selectSize === data ? "2px solid orange" : "1px solid black"}`,
                                                                                            textAlign: "center",
                                                                                            fontSize: "20px",
                                                                                            margin: "0 2px",
                                                                                            cursor: "pointer",
                                                                                            position: 'relative',
                                                                                            top: "0"

                                                                                        }}

                                                                                        >
                                                                                            {
                                                                                                Object.keys(size).length > 0 && Object.keys(size).map((res, indx) => {
                                                                                                    return data === res ? <div>
                                                                                                        <span style={{
                                                                                                            height: "20px",
                                                                                                            width: "20px",
                                                                                                            backgroundColor: "black",
                                                                                                            zIndex: "100",
                                                                                                            position: "absolute",
                                                                                                            top: "-5px",
                                                                                                            right: "-5px",
                                                                                                            borderRadius: "20px"
                                                                                                        }}>
                                                                                                            <i className="fas fa-times text-white" onClick={() => delSize(data)} style={{
                                                                                                                fontSize: "12px", position: "absolute",
                                                                                                                right: "6px",
                                                                                                                top: "4px"
                                                                                                            }}></i>
                                                                                                        </span>
                                                                                                        <div className="green" onClick={() => {
                                                                                                            setSelectSize(res)

                                                                                                        }
                                                                                                        } >

                                                                                                            <label className="pt-1">
                                                                                                                {
                                                                                                                    data
                                                                                                                }

                                                                                                            </label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                        : ""
                                                                                                })
                                                                                            }


                                                                                            <label className="pt-1" onClick={(e) => {
                                                                                                sizeHandle(data);

                                                                                                resetError();
                                                                                            }}>
                                                                                                {
                                                                                                    data
                                                                                                }
                                                                                            </label>

                                                                                        </div> : ""



                                                                                })

                                                                            }

                                                                        </div>
                                                                        {
                                                                            errorfor === 'size' && errorMsg !== "" ? <div className="alert alert-danger">
                                                                                {
                                                                                    errorMsg
                                                                                }
                                                                            </div> : ""
                                                                        }
                                                            </Form.Group>



                                                            {
                                                                Object.keys(size).length > 0 ? <Form.Group controlId="formBasicEmail">
                                                                    <Form.Label className="text-left">Choose a Color</Form.Label>

                                                                    <div>
                                                                        {
                                                                            Object.keys(size).length > 0 ?
                                                                                <input type="color" className="form-control" onBlur={(e) => {
                                                                                    handleColor(e.target.value);
                                                                                    
                                                                                    resetError();
                                                                                }}

                                                                                />
                                                                                : ""
                                                                        }
                                                                        {/* {
                                                                            rawColor === "raw" ? <div className="alert alert-danger">
                                                                                Please Select Color
                                                                            </div>:""
                                                                        } */}

                                                                    </div>

                                                                    <div className="text-left" style={{ position: "relative" }}>
                                                                        {
                                                                            Object.keys(size).length > 0 ?

                                                                                Object.keys(size).map((sizeData, indx) => {

                                                                                    return <Table striped bordered hover className="mt-3">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th>#</th>
                                                                                                <th>Available Color for {sizeData}</th>
                                                                                                <th>Stock</th>
                                                                                                <th>Sku Code</th>
                                                                                                <th>Action</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        {

                                                                                            size[sizeData].map((color, ind) => {

                                                                                                return <tbody onClick={() => addStock(indx, color)}>
                                                                                                    <tr>
                                                                                                        <td>{(ind + 1)}</td>
                                                                                                        <td><div key={ind} style={{ height: "40px", width: "40px", display: "inline-block", backgroundColor: `${color.color}` }} key={ind} ></div>
                                                                                                        </td>
                                                                                                        <td>     <input type="number" className="form-control" value={color.totalStock} placeholder="Stock" onChange={(e) => {
                                                                                                            stockVal(sizeData, ind, e.target.value)

                                                                                                        }} />
                                                                                                            {
                                                                                                                rawStock === "raw" && color.totalStock === "" ? <div className="alert alert-danger">Please add stock</div> : ""
                                                                                                            }
                                                                                                        </td>
                                                                                                        <td>

                                                                                                            <input type="code" className="form-control" placeholder="Sku Code" value={color.skuCode} onChange={(e) => skuCodeVal(sizeData, ind, e.target.value)} />
                                                                                                            {
                                                                                                                skuCode === "raw" && color.skuCode === "" ?
                                                                                                                    <div className="alert alert-danger">Please add sku code</div> : ""
                                                                                                            }

                                                                                                        </td>
                                                                                                        <td className="text-center">
                                                                                                            <i className="fas fa-trash" onClick={() => DelColor(sizeData, ind)}></i>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>



                                                                                            })
                                                                                        }

                                                                                    </Table>

                                                                                })

                                                                                : ""
                                                                        }

                                                                    </div>


                                                                </Form.Group>
                                                                    : ""
                                                            }

                                                            <button className="btn btn-primary">Add Product</button>
                                                        </Form>
                                                    </div>
                                                </div> : ""
                                            }


                                        </Modal.Body>
                                    </Modal>


                                    : ""

                            }
                            {/* ---------------------------------------------end upload Modals------------------------- */}

                            {
                                data && apiStatus && Object.keys(apiStatus).length > 0 && apiStatus.isSuccess && apiStatus.apiCall === "List Super Product Super Admin" ?
                                    <>

                                        {

                                            data.products.map((data, index) => {
                                                return <div key={index} className="col-lg-4 col-md-3  zoom py-3 mt-3">

                                                    <div className="card">
                                                        <div className="card-img-top">
                                                            <div className="co text-center">
                                                                <div class="co-overlay"></div>
                                                                <div style={{
                                                                    height: "200px", width: "100%", backgroundImage: `url(
                                                ${data.images.length > 0 && data.images[0].orignalImage ? data.images[0].orignalImage : data.images[0]
                                                                        }
                                                    )`, backgroundSize: "cover", backgroundPosition: "center"
                                                                }}></div>


                                                                <div class="co-details fadeIn-bottom">

                                                                    <span className="edit mr-2" onClick={() => EditHandle(data.id)}>	<i class="far fa-edit " style={{ fontSize: "20px" }}></i>
                                                                    </span>


                                                                    <span className="view" onClick={() => SingleProduct(data.id)}>
                                                                        <i class="far fa-eye pt-2" style={{ fontSize: "20px" }}></i>
                                                                    </span>


                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            {
                                                                data.name
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }





                                        {/* ------------------------------view single Modal-------------------------------- */}
                                        {
                                            viewSingleProduct ?
                                                <Modal
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

                                                                    {
                                                                        renderPhotos()
                                                                    }

                                                                </Row>



                                                            </Col>

                                                        </Row>
                                                    </Modal.Body>
                                                </Modal>
                                                : ""
                                        }
                                        {/* -----------------------------------------------end view single Modal----------------------------- */}

                                        {/* -----------------------------------------------Edit Modal -------------------------------- */}
                                        {
                                            editSingleProductModal ?
                                                <Modal
                                                    show={editSingleProductModal}
                                                    size="xl"
                                                    onHide={editModalClose}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton></Modal.Header>
                                                    <Modal.Body className="text-secondary text-center">
                                                        <input type="file" onChange={editImageHandle} id="file" style={{ display: "none" }} />

                                                        <Row className="" >
                                                            <div className="col-md-2 col-lg-2">

                                                                {
                                                                    selectedFiles.map((image, indx) => {
                                                                        return <>

                                                                            <div className="co text-center" style={{ height: "inherit", width: "inherit" }}>
                                                                                {/* {
                                              console.log("edit images",image)
                                          } */}
                                                                                <img src={
                                                                                    image.thumbnail ? image.thumbnail : image
                                                                                } key={indx} className="mb-1" onClick={() => {
                                                                                    setImage(image.orignalImage ? image.orignalImage : image);
                                                                                    setdelselectImage(image.orignalImage ? image.orignalImage : image);
                                                                                }} height="147rem" width="100%" style={{ height: "" }} />
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
                                                                                        handleDelete(image, indx);
                                                                                        setdelselectImage("");
                                                                                    }} style={{ fontSize: "20px", color: "white" }}></i>
                                                                                </span>



                                                                            </div>
                                                                        </>
                                                                    })



                                                                }
                                                                {
                                                                    selectedFiles && selectedFiles.length > 0 && selectedFiles.length < 4 ?
                                                                        <label htmlFor="file" className="plus">+</label>


                                                                        : selectedFiles.length === 0 ?
                                                                            <label htmlFor="file" className="plus">+</label> : ""
                                                                }


                                                            </div>
                                                            <div className="col-md-5 col-lg-5">
                                                                <div style={{
                                                                    backgroundImage: `url( ${image ?
                                                                        //    console.log(product)
                                                                        image === delselectImage ? image : ""
                                                                        :
                                                                        product && Object.keys(product).length > 0 && product.images.length > 0 ? product.images[0] : ""})`,
                                                                    backgroundSize: "cover",
                                                                    backgroundPosition: "center center",
                                                                    backgroundRepeat: "no-repeat",
                                                                    height: "500px"
                                                                }}
                                                                ></div>

                                                            </div>

                                                            <Col sm={5} xs={5} lg={5} xl={5} className="d-flex  justify-content-start p-0">


                                                                <Form onSubmit={EditSuperProductSubmit} style={{ width: "100%" }}>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label className="text-left">Product Name</Form.Label>
                                                                        <Form.Control type="text" defaultValue={pname} placeholder="Product Name" onChange={
                                                                            (e) => {
                                                                                setPname(e.target.value);
                                                                                resetError();
                                                                            }
                                                                        } />
                                                                        {
                                                                            errorfor === 'pname' && errorMsg !== "" ? <div className="alert alert-danger">
                                                                                {
                                                                                    errorMsg
                                                                                }
                                                                            </div> : ""
                                                                        }
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label className="text-left">Price</Form.Label>
                                                                        <Form.Control type="Number" defaultValue={price} placeholder="Product Price" onChange={
                                                                            (e) => {
                                                                                setPrice(e.target.value);
                                                                                resetError();
                                                                            }
                                                                        } />
                                                                        {
                                                                            errorfor === 'price' && errorMsg !== "" ? <div className="alert alert-danger">
                                                                                {
                                                                                    errorMsg
                                                                                }
                                                                            </div> : ""
                                                                        }
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label className="text-left">Discount Price</Form.Label>
                                                                        <Form.Control defaultValue={discount} placeholder="Discount Price" onChange={
                                                                            (e) => {
                                                                                setDiscount(e.target.value);
                                                                                resetError();
                                                                            }
                                                                        } />
                                                                        {
                                                                            errorfor === 'discount' && errorMsg !== "" ? <div className="alert alert-danger">
                                                                                {
                                                                                    errorMsg
                                                                                }
                                                                            </div> : ""
                                                                        }
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicdescription">
                                                                        <Form.Label className="text-left">Description</Form.Label>
                                                                        <Form.Control as="textarea" defaultValue={description} rows={3} style={{ height: "100px" }} onChange={(e) => {
                                                                            setDescription(e.target.value);
                                                                            resetError();
                                                                        }} placeholder="Product Description" />
                                                                        {
                                                                            errorfor === 'description' && errorMsg !== "" ? <div className="alert alert-danger">
                                                                                {
                                                                                    errorMsg
                                                                                }
                                                                            </div> : ""
                                                                        }
                                                                    </Form.Group>
                                                                    <Form.Group>
                                                                        <Form.Label className="text-left">Choose a Size</Form.Label>

                                                                        <div className="d-flex" >
                                                                            {
                                                                                sizes.map((data, index) => {

                                                                                    return sizes.length > 0 ?
                                                                                        <div key={index} style={{
                                                                                            height: "50px", width: "50px", border: `${selectSize === data ? "2px solid orange" : "1px solid black"}`,
                                                                                            textAlign: "center",
                                                                                            fontSize: "20px",
                                                                                            margin: "0 2px",
                                                                                            cursor: "pointer",
                                                                                            position: 'relative',
                                                                                            top: "0"

                                                                                        }}

                                                                                        >
                                                                                            {
                                                                                                Object.keys(size).length > 0 && Object.keys(size).map((res, indx) => {
                                                                                                    return data === res ? <div>
                                                                                                        <span style={{
                                                                                                            height: "20px",
                                                                                                            width: "20px",
                                                                                                            backgroundColor: "black",
                                                                                                            zIndex: "100",
                                                                                                            position: "absolute",
                                                                                                            top: "-5px",
                                                                                                            right: "-5px",
                                                                                                            borderRadius: "20px"
                                                                                                        }}>
                                                                                                            <i className="fas fa-times text-white" onClick={() => delSize(data)} style={{
                                                                                                                fontSize: "12px", position: "absolute",
                                                                                                                right: "6px",
                                                                                                                top: "4px"
                                                                                                            }}></i>
                                                                                                        </span>
                                                                                                        <div className="green" onClick={() => {
                                                                                                            setSelectSize(res)

                                                                                                        }
                                                                                                        } >

                                                                                                            <label className="pt-1">
                                                                                                                {
                                                                                                                    data
                                                                                                                }

                                                                                                            </label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                        : ""
                                                                                                })
                                                                                            }


                                                                                            <label className="pt-1" onClick={(e) => {
                                                                                                sizeHandle(data);

                                                                                                resetError();
                                                                                            }}>
                                                                                                {
                                                                                                    data
                                                                                                }
                                                                                            </label>

                                                                                        </div> : ""



                                                                                })

                                                                            }

                                                                        </div>
                                                                        {
                                                                            errorfor === 'size' && errorMsg !== "" ? <div className="alert alert-danger">
                                                                                {
                                                                                    errorMsg
                                                                                }
                                                                            </div> : ""
                                                                        }
                                                                    </Form.Group>



                                                                    {
                                                                        Object.keys(size).length > 0 ?
                                                                            <Form.Group controlId="formBasicEmail">
                                                                                <Form.Label className="text-left">Choose a Color</Form.Label>

                                                                                <div>
                                                                                    {
                                                                                        Object.keys(size).length > 0 ?
                                                                                            <input type="color" className="form-control" onBlur={(e) => {
                                                                                                handleColor(e.target.value);
                                                                                                resetError();
                                                                                            }}

                                                                                            />
                                                                                            : ""
                                                                                    }

                                                                                </div>

                                                                                <div className="text-left" style={{ position: "relative" }}>
                                                                                    {
                                                                                        Object.keys(size).length > 0 ?

                                                                                            Object.keys(size).map((sizeData, indx) => {

                                                                                                return size[sizeData].length > 0 ?


                                                                                                    <Table striped bordered hover className="mt-3">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                <th>#</th>
                                                                                                                <th>Available Color for {sizeData}</th>
                                                                                                                <th>Stock</th>
                                                                                                                <th>Sku Code</th>
                                                                                                                <th>Action</th>
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        {

                                                                                                            size[sizeData].map((color, ind) => {

                                                                                                                return <tbody onClick={() => addStock(indx, color)}>
                                                                                                                    <tr>
                                                                                                                        <td>{(ind + 1)}</td>
                                                                                                                        <td><div key={ind} style={{ height: "40px", width: "40px", display: "inline-block", backgroundColor: `${color.color}` }} key={ind} ></div>
                                                                                                                        </td>
                                                                                                                        <td>     <input type="number" className="form-control" value={color.totalStock} placeholder="Stock" onChange={(e) => {
                                                                                                                            stockVal(sizeData, ind, e.target.value)

                                                                                                                        }} />
                                                                                                                            {
                                                                                                                                rawStock === "raw" && color.totalStock === "" ? <div className="alert alert-danger">Please add stock</div> : ""
                                                                                                                            }
                                                                                                                        </td>
                                                                                                                        <td> <input type="code" className="form-control" placeholder="Sku Code" value={color.skuCode} onChange={(e) => skuCodeVal(sizeData, ind, e.target.value)} />
                                                                                                                            {
                                                                                                                                skuCode === "raw" && color.skuCode === "" ?
                                                                                                                                    <div className="alert alert-danger">Please add sku code</div> : ""
                                                                                                                            }

                                                                                                                        </td>
                                                                                                                        <td className="text-center">
                                                                                                                            <i className="fas fa-trash" onClick={() => DelColor(sizeData, ind)}></i>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>



                                                                                                            })
                                                                                                        }

                                                                                                    </Table> : ""

                                                                                            })

                                                                                            : ""
                                                                                    }

                                                                                </div>


                                                                            </Form.Group>
                                                                            : ""
                                                                    }
                                                                    <button className="btn btn-primary">Update Product</button>
                                                                </Form>


                                                            </Col>


                                                        </Row>






                                                    </Modal.Body>
                                                </Modal>
                                                : ""

                                        }

                                        {/* ------------------------------------------end edit Modal--------------------------------- */}
                                    </>
                                    : data && Object.keys(data).length === 0 && Object.keys(apiStatus).length > 0 && apiStatus.isSuccess && apiStatus.apiCall === "List Super Product Super Admin" ?
                                        <>Data Not Found</> :
                                        apiStatus && Object.keys(apiStatus).length > 0 && !apiStatus.isSuccess && apiStatus.apiCall === "List Super Product Super Admin" ?
                                            (
                                                <div className="col-lg-4 col-md-3 pt-4">{apiStatus.message} </div>

                                            ) : "Not Product Found Yet"

                            }
                        </div>
                    </LoadingOverlay>
                </div>

            </div>
        </div>
    </>
}

export default ListSuperProduct;