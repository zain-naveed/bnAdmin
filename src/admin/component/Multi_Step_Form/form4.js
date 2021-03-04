import React, { useEffect, useState } from 'react';
import './css/form4.css';
import { useDispatch, useSelector } from 'react-redux';
import { listSuperProductSuperAdmin } from '../../../services/superAdminService/listSuperProductSuperAdminService';
import { addProductToCustomStoreService } from '../../../services/addProductToCustomStoreService';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getCookie } from '../../../cookies/cookies';
import LoadingOverlay from 'react-loading-overlay';
import { setApiCallsStatus } from '../../../action/apiCallsStatus';
import { addProductCustomSToreAction } from '../../../action/addProductToCustomStoreAction';
import {Modal,Table} from 'react-bootstrap';
import _ from 'lodash';

function Form4({handle2,props}) {
    const [rawProducts, setrawProduct] = useState([]);
    const [treeData, SetMult] = useState([]);
    const [aler, setalert] = useState(true);
    const [check,Setcheck] = useState(false);
    const [loading,setLoading] = useState(true);
    const [servericloading,setserviceloading] = useState(false);
    const[products,SetProducts] = useState([]);
    const [singleProDetail,setProDetail] = useState({});
    const [show, setShow] = useState(false);
    const [viewSingleProduct,SetviewSingleProduct] = useState(false);
    const [selectImage, setSelectedImage] = useState("");
    const [dumy,setDumy] = useState("");
    const [assignError,setAssignError] = useState("");
    const [erroInd,setErroInd] = useState("");
    const [alerMsg,setAlertMsg] = useState("");
    const [dummySize,setdummySize] = useState({});
    const [eidtModal,setEditModal] = useState(false);
    const [sizeError,setSizeError]= useState("");
console.log("sizes Error",sizeError)

    const dispatch = useDispatch();
    useEffect(() => {
        // props.props.props.history.push("/")
        dispatch(
            listSuperProductSuperAdmin()
 
        )

    }, [])
    const listSuperProduct = useSelector(state => state.listSuperProduct);
    const apiStatus = useSelector((state) => state.apiCallStatus);
    const AddProductToCustomStoreStatus = useSelector(state=> state.addProductToCustomStore);
// console.log(props.props)
if(
    !apiStatus.isSuccess && Object.keys(apiStatus).length === 0 && loading
){
    // setLoading(false);
}
else if(
    apiStatus &&
    apiStatus.isSuccess &&
    apiStatus.apiCall === "List Super Product Super Admin"
    && loading
    ){
        console.log("list true");
        setLoading(false);
    }
    else if(
        !apiStatus.isSuccess &&
        apiStatus.apiCall === "List Super Product Super Admin" &&
        loading
        ){
            console.log("list false");
            setLoading(false)
        }
        // ---------------------------------------- Product To Custome Store Status
        if(
            AddProductToCustomStoreStatus.isSuccess && AddProductToCustomStoreStatus.apiCall === "Product Custom Store"
            && servericloading && !show
        ){
            console.log("zain")
            setrawProduct([]);
            setdummySize([]);
            setserviceloading(false);
            dispatch(
                listSuperProductSuperAdmin()
     
            )
            // setTimeout(() => {
                  
            // }, 1000);
            setTimeout(() => {
                setShow(true);
                return handle2(4,"Add Product to Store"); 
            }, 1500);
          
           
            setTimeout(() => {
                dispatch(addProductCustomSToreAction({}))
                 
            }, 3000);
            setTimeout(() => {
                props.props.history.push("/Custom_Management")
            }, 3100);
            // setserviceloading(true);
        
            
            
        }else
        if(
            !AddProductToCustomStoreStatus.isSuccess && AddProductToCustomStoreStatus.apiCall === "Product Custom Store"
        
        && servericloading && !show    ){
            // setserviceloading(true);
            // alert(apiStatus.message);
            setserviceloading(false); 
            setShow(true);  
            
            // setTimeout(() => {
               
            // }, 1000);
            // setTimeout(() => {
                
            // }, 2000);
            
            setTimeout(() => {
                setShow(false);  
                dispatch(
                    addProductCustomSToreAction({})
                )  
            }, 3000);
            
            
            // return handle2(4,"Add Product to Store");
        }
   
    if(
        listSuperProduct && listSuperProduct.data &&
         listSuperProduct.data.products && 
         listSuperProduct.data.products.length > 0
          && products.length === 0
           ){
        for (let index = 0; index < listSuperProduct.data.products.length; index++) {

            listSuperProduct.data.products[index].checked = false
            
        }
        SetProducts(listSuperProduct.data.products)
    }
    const handleClick = (data,e,productId,string) => {
        var store = getCookie("store");
        
        var selectProduct = [...treeData];
        let findIndex =   products.findIndex(x=>x.id === productId);
        let rawProduct = [...products];
        const rawClone = [...rawProducts];
        let rawIndx = rawClone.findIndex(i=>i.id === productId);
        if(rawIndx > -1 && string === "view"){
            debugger;
                setProDetail(rawClone[rawIndx]);
                setEditModal(true);
            
           
        }else if(string === "view"){
            setProDetail(data);
            setEditModal(true);
        }else{
            if(string === "add"){
        
                if(findIndex > -1){
                   rawProduct[findIndex].checked = true;
                   SetProducts(rawProduct);
                }
                   var result = {
                       storeId: store.id,
                       superProductId: data.id,
                       sizes:{}
           
                   }
                   SetMult([...treeData, result]);
                   if(string === "add"){
                   data && Object.keys(data.sizes).forEach((size)=>{
                       if(data.sizes[size].length > 0){
                           data.sizes[size].forEach((subdata)=>{
                               subdata.checked = false;
                               subdata.assign = "";
                               
                           })
                           
                       }
                   })
                  
                       setProDetail(data);
                       SetviewSingleProduct(true);
                   }else{
                       // let dummyClone = {...dummySize};
                       // dummyClone = singleProDetail.sizes;
                       // setdummySize(dummyClone);
                       SetviewSingleProduct(true);
                   }
                 
                   
                  
               // console.log(subValue)
               }else if(string === "edit"){
                   
                   console.log("rawclone", rawClone)
                   const rawIndex = rawClone.findIndex(i=>i.id === productId);
                   setProDetail(rawClone[rawIndex]);
                   console.log(rawClone[rawIndex]);
                   debugger;
                   setdummySize(rawClone[rawIndex].dummy)
       
                   SetviewSingleProduct(true);
               }else{
                   setDumy("")
                  var del = selectProduct.findIndex(i=>i.superProductId === productId);
                  if(del > -1){
                   selectProduct.splice(del,1)
                   SetMult(selectProduct);
                  }
                   
                   if(findIndex > -1){
                       rawProduct[findIndex].checked = false;
                       SetProducts(rawProduct);
                    }
                    SetviewSingleProduct(false);
               }
        }
        debugger
        

      
    }
 
    const handleSubmit = (e) => {
        e.preventDefault();
    
        setserviceloading(true);
        dispatch(
            addProductToCustomStoreService(treeData)
        );
        
    }
    
    const handleChange = (e)=>{
        console.log(e.target.checked)
        
    }
    const handleClose = () => setShow(false);
	
	const ModalComponent = () => {
		console.log(apiStatus);
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
                            AddProductToCustomStoreStatus.isSuccess ? "Store is created":AddProductToCustomStoreStatus.message
                        }
					</Modal.Body>
				</Modal>
			</>
		);
	};

   
    const viewModalClose = ()=>{
        SetviewSingleProduct(false)
        setProDetail({});
        setSelectedImage("");
        setDumy("");
    }
    const editModalClose = ()=>{
        setEditModal(false);
        setProDetail({});
        setSelectedImage("");
        setDumy("");
    }
    // const CancelViewModal = ()=>{
    //     setEditModal(false);
    //     setProDetail({});
    // }
console.log("dummy size",dummySize);
    const StockVAl = (sizename,subindx,value,color)=>{
        const clone = {...singleProDetail};
        const dummyClone = {...dummySize};
        console.log(dummyClone[sizename]);
        // console.log("dummyClone",Object.keys(dummyClone).length)
        var checkIndex = Object.keys(dummyClone).findIndex(i=>i === sizename);
        if(checkIndex > -1){
           
            dummyClone[Object.keys(dummyClone)[checkIndex]].forEach((element,indx) => {
                if(element.color === color){
                    element.totalStock = value
                }
            });
            setdummySize(dummyClone);
        }
        // if(Object.keys(dummyClone).length !== undefined && Object.keys(dummyClone).length > 0  && dummyClone[sizename].length > 0 ){
        //     && Object.keys(dummyClone)[Object.keys(dummyClone).length - 1] === sizename
        //     && dummyClone[sizename][subindx]
        //     dummyClone[sizename][subindx].totalStock = Number(value);
        //     setdummySize(dummyClone);
        //     debugger;
            
        // }
        clone.sizes[sizename][subindx].assign = value !== "" ? Number(value):"";
        if(clone.sizes[sizename][subindx].assign > clone.sizes[sizename][subindx].currentStock){
    //    setAssignError("stockExceed");
    //    setErroInd(subindx);
       clone.sizes[sizename][subindx].assign = clone.sizes[sizename][subindx].currentStock;
        }
        if(clone.sizes[sizename][subindx].assign < 0){
            clone.sizes[sizename][subindx].assign = 0 
        }
        clone.sizes[sizename][subindx].remainging = clone.sizes[sizename][subindx].totalStock !== 0 ?  clone.sizes[sizename][subindx].currentStock <  clone.sizes[sizename][subindx].assign ? "out of Stock":
        clone.sizes[sizename][subindx].currentStock -  clone.sizes[sizename][subindx].assign:0;
        
        setProDetail(clone)
        
    }
    const AssignStock = (e,ind,obj,sizename)=>{
        // const rawData = [...dummySize];
        const cloneResult = {...dummySize};
        if(e.target.checked){
            // console.log(obj)
            // console.log("size name",sizename)
            console.log(singleProDetail);
            if(singleProDetail && Object.keys(singleProDetail).length > 0 ){
                
                  
                      if(singleProDetail.sizes[sizename].length > 0){
                        
                        if(singleProDetail.sizes[sizename][ind].assign == 0 || singleProDetail.sizes[sizename][ind].assign == ""){
                        setErroInd(ind);
                        singleProDetail.sizes[sizename][ind].checked = false;
                           setAssignError("Error");
                        }else 
                        if(singleProDetail.sizes[sizename][ind].assign !== 0 || singleProDetail.sizes[sizename][ind].assign !== ""){
                          
                            setAssignError("");
                            if(Object.keys(cloneResult).length > 0 && cloneResult[sizename] ) {
                
                                    var obj = {
                                            color:singleProDetail.sizes[sizename][ind].color,
                                            totalStock: Number(singleProDetail.sizes[sizename][ind].assign)
                                        }
                                        cloneResult[sizename].push(obj);
                                        setdummySize(cloneResult);
                            }else {
                                debugger
                                setdummySize({...cloneResult, [sizename] : [{
                                    color:singleProDetail.sizes[sizename][ind].color,
                                    totalStock: Number(singleProDetail.sizes[sizename][ind].assign)
                                }]
                            })  
                            }
                                
                            
                          
                            // cloneResult[sizes]
                            singleProDetail.sizes[sizename][ind].checked = true;

                            setAlertMsg("Success");
                        setTimeout(() => {
                            setAlertMsg("");
                        }, 1000);
                
                    
                       
                        }
                      }
                
            }
            // singleProDetail && 
       
            console.log("click")
          
        }else{
            const clone = {...singleProDetail}
            // const
            // var del_res = _.omit(cloneResult,sizename) 
            // delete cloneResult[sizename];
            if(cloneResult[sizename].length > 0){
              const indexes =  cloneResult[sizename].findIndex(i=>i.color === obj.color);
                if(indexes > -1){
                    cloneResult[sizename].splice(indexes,1);
                }
            }
            
            
            setdummySize(cloneResult)
            clone.sizes[sizename][ind].checked = false;
            clone.sizes[sizename][ind].assign = "";
            setProDetail(clone);
       
        }
    }
    console.log('raw product',rawProducts)
    const AddSizes = ()=>{
        const clonse = [...treeData];
        console.log(singleProDetail);
        let dummyClone = {...singleProDetail};
        let dummySizeClone = {...dummySize};
        var info = ""
        var breaFroeach = {}
        try{
            
            Object.keys(dummyClone.sizes).forEach((size,indx)=>{
             
                if(dummyClone.sizes[size].length > 0){
                    dummyClone.sizes[size].forEach((inf,subindx)=>{
                        if(inf.checked === true && inf.assign === ""){
                            setAssignError("Error");
                            setErroInd(subindx);
                            
                            dummyClone.sizes[size][subindx].checked = false;
                            dummyClone.sizes[size][subindx].assign = "";
                            throw breaFroeach;
                            
                        }else if(inf.checked === true && inf.assign !== ""){
                            info = "data"
                        }
                    })
                   
                        
                
                }
            })
            if(Object.keys(dummySizeClone).length === 0){
                setSizeError("SizeError")
            }
            setProDetail(dummyClone);
            if(info === "data"){
                const index = clonse.findIndex(i=> i.superProductId === singleProDetail.id);
            if(index > -1){
                clonse[index].sizes = dummySize;
                
                console.log(clonse)
                debugger
                dummyClone.dummy = dummySize;
                let rawIdx = rawProducts.findIndex(i=> i.id === singleProDetail.id);
                if(rawIdx > -1){

                }else{
                    setrawProduct([...rawProducts,dummyClone]);
                }
                
                setProDetail(dummyClone);
                SetMult(clonse);
                SetviewSingleProduct(false);
                // setDumy("");
                setdummySize({});
                
            }
            }
            
        }catch(e){
                if(breaFroeach != e) throw e;
            }
        
    }
    console.log("custom store servier",AddProductToCustomStoreStatus)
    console.log("tree data",treeData);
    return (
    
    
    <div className="main-content-body mt-4">
            {
			AddProductToCustomStoreStatus && AddProductToCustomStoreStatus.isSuccess && AddProductToCustomStoreStatus.apiCall == "Product Custom Store" ? <>
			<ModalComponent /> 
			</>
			:
			apiStatus && !AddProductToCustomStoreStatus.isSuccess && Object.keys(AddProductToCustomStoreStatus).length > 0 && AddProductToCustomStoreStatus.apiCall == "Product Custom Store"  ? <>
			
			<ModalComponent />
			</>
			 : 
			""
		}
{/* {
    console.log(singleProDetail)
} */}
        <LoadingOverlay
        active={loading ? loading : servericloading}
        spinner
        text='Loading...'
        >
            {/* --------------------------------add or edit Modal--------------------------- */}
            {
                        viewSingleProduct ?                
                        <Modal
                       show={viewSingleProduct}
                       size="xl"
                       onHide={viewModalClose}
                       backdrop="static"
                       keyboard={false}
                   >
                       {/* <Modal.Header closeButton></Modal.Header> */}
                       <Modal.Body className="text-secondary text-center">
                       <Row>
                            <Col sm={12}>
                                <Row className="" >

                                <Col sm={2} xs={2} lg={1} xl={2} className="text-left">
                    {
              singleProDetail && Object.keys(singleProDetail).length > 0 && singleProDetail.images &&  singleProDetail.images.length > 0 ?     singleProDetail.images.map((images, indx) => {
                            return <div key={indx} className="pb-1">
                                <img src={images.thumbnail} onClick={() => setSelectedImage(images.orignalImage)} style={{ cursor: "pointer", height:"115px",width:"80%",textAlign:"center" }} />
                            </div>
                        }) :""
                    }
                </Col>
                <Col sm={4} xs={4} lg={4} xl={4} style={{minHeight:"300px"}} >
                    <div style={{
                        backgroundImage:`url(${
                            selectImage ? selectImage : 
                            singleProDetail && Object.keys(singleProDetail).length > 0  && singleProDetail.images.length > 0 ? singleProDetail.images[0].orignalImage :singleProDetail.images[0]
    
                        })`,
                        height:"100%",
                        backgroundSize:"cover",
                        backgroundPosition:"center center",
                        backgroundRepeat:"no-repeat"
                    }}></div>
                </Col>
                <Col sm={5} xs={5} lg={5} xl={5} className="d-flex text-left  justify-content-start p-0">

                    <div>
                        <h3 className="text-dark d-flex justify-content-start" style={{textTransform:"uppercase"}}>
                            
                            {
                                singleProDetail && Object.keys(singleProDetail).length > 0 ? 
                                singleProDetail.name:""
                            }
                        </h3>
                        <div className="text-dark d-flex justify-content-start" id="product">
                        {
                                singleProDetail && Object.keys(singleProDetail).length > 0 ? <>
                            
                          <label style={{fontSize:"29px",lineHeight:"normal"}} className="ml-2"> {'$ '+ singleProDetail.price} </label> 
                               
                               
                               </>
                               :""
                            }
                            </div>
                            <div id="description" className=" text-dark">
                                <label style={{fontSize:"1.2rem",fontWeight:"600"}}>Description:</label>
                                <div className="" style={{fontSize:"1rem",lineHeight:"1",textAlign:"left"}}>
                                   {
                                       singleProDetail.description
                                   }
                                </div>
                            </div>
                        
                       <div id="size" className="d-flex" >
                        <label style={{ fontSize: "1.2rem",fontWeight:"600",textAlign:"left" }} className="text-dark">Sizes:</label>
                        <div className="ml-1 mt-1">
                            {
                        singleProDetail   && Object.keys(singleProDetail.sizes).length > 0  ?    Object.keys(singleProDetail.sizes).map((size,indx)=>{
                                   return singleProDetail.sizes[size].length > 0 ? <div key={indx} onClick={()=>{setDumy(size);
                                    setSizeError("");
                                    setAssignError("");}} className="mx-1 mb-1 text-center" style={{color:"black",display:"inline-block",border:`1px solid ${dumy === size ? "green":"black"} `,paddingTop:"0.2rem",height:"2rem",width:"2rem"}}>
                                       {
                                            size  
                                       }
                                   </div>:""
                                   
                                })
                                :""
                            }
                           
                                  
                            </div>
                       
                        </div>

                        {
                            sizeError === "SizeError" ? <div className="alert alert-danger">
                                Please Select Sizes
                            </div>:""
                        }
                        
                        <div>
                            {
                                alerMsg === "Success" ? <div className="alert alert-success">
                                    Product has been Assign
                                </div>:""
                            }
                            {
                        singleProDetail   && Object.keys(singleProDetail.sizes).length > 0  ?    Object.keys(singleProDetail.sizes).map((size,indx)=>{
                                   return singleProDetail.sizes[size].length > 0 && size === dumy  ? <div key={indx} style={{width:"550px"}} className="mx-1 mb-1 text-center table-responsive"  >
                                      
                                      
                                       <Table striped bordered hover className="table-sm">
                                        <thead>
                <tr>
                  <th>#</th>
                  <th>Click to Assign</th>
                  <th>Color </th>
                  
                  <th>sku Code</th>
                  <th>Total Stock</th>
                  <th>Current Stock</th>
                  <th>Assign Stock</th>
                  <th>Remaining Stock</th>
                </tr>
              </thead>
                                            {
                                               singleProDetail.sizes[size].length > 0 && singleProDetail.sizes[size].map((clr,subindx)=>{
                                                   return <tbody key={subindx}>
                                                       <tr>
                                                           <td>{(subindx+1)}</td>
                                                           <td>          <input type="checkbox" checked={clr.checked}  onChange={(e)=>AssignStock(e,subindx,clr,size)}  />
                                                 </td>
                                                           <td>
                                                           <div style={{height:"25px",width:"25px",display:"inline-block",backgroundColor:`${clr.color}`}}>
                                                   </div>
                                                  
                                                           </td>
                                                           <td>
                                                              {clr.skuCode ? clr.skuCode :"N/A" }
                                                             
                                                           </td>
                                                           <td>
                                                            {
                                                                clr.totalStock ? clr.totalStock : 0 
                                                            }
                                                        
                                                           
                                                           </td>
                                                           <td>
                                                               {
                                                                   clr.currentStock
                                                               }
                                                      
                                                           
                                                           </td>
                                                           <td><input type="number" className="form-control" style={{width:"70px"}} min={0} max={clr.currentStock} value={clr.assign}  onChange={(e)=>{
                                                               setAssignError("");
                                                               StockVAl(size,subindx,e.target.value,clr.color);
                                                           }} />
                                                           {
                                                          assignError === "Error" && subindx === erroInd ? <div className="alert alert-danger">
                                                                   Please assign Stock
                                                               </div>:""
                                                           }
                                                           {/* {
                                                               assignError === "stockExceed" && subindx === erroInd ? <div className="alert alert-danger">
                                                                   Your Assign Stock is Exceeded of Available Stock {clr.currentStock}
                                                               </div>:""
                                                           } */}
                                                           </td>
                                                           <td>{clr.remainging}</td>
                                                           
                                                       </tr>
                                                   </tbody>
                                                   
                                                   
                                                   
                                                    
                                                })
                                            }
                                        </Table>
                                        
                                   </div>:""
                                   
                                })
                                :""
                            }
                      
                            <button className="btn btn-primary" onClick={AddSizes}>Add</button>
                            <button className="btn btn-danger ml-2" onClick={(e)=>handleClick(singleProDetail,e,singleProDetail.id)}>Delete</button>
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
                  {/* -------------------------end add or edit Modal------------------------- */}
                  {/* --------------------------------View Modal--------------------------- */}
            {
                        eidtModal ?                
                        <Modal
                       show={eidtModal}
                       size="xl"
                       onHide={editModalClose}
                       backdrop="static"
                       keyboard={false}
                   >
                       {/* <Modal.Header closeButton></Modal.Header> */}
                       <Modal.Body className="text-secondary text-center">
                       <Row>
                            <Col sm={12}>
                                <Row className="" >

                                <Col sm={2} xs={2} lg={1} xl={2} className="text-left">
                    {
              singleProDetail && Object.keys(singleProDetail).length > 0 && singleProDetail.images &&  singleProDetail.images.length > 0 ?     singleProDetail.images.map((images, indx) => {
                            return <div key={indx} className="pb-1">
                                <img src={images.thumbnail} onClick={() => setSelectedImage(images.orignalImage)} style={{ cursor: "pointer", height:"115px",width:"80%",textAlign:"center" }} />
                            </div>
                        }) :""
                    }
                </Col>
                <Col sm={4} xs={4} lg={4} xl={4} style={{minHeight:"300px"}} >
                    <div style={{
                        backgroundImage:`url(${
                            selectImage ? selectImage : 
                            singleProDetail && Object.keys(singleProDetail).length > 0  && singleProDetail.images.length > 0 ? singleProDetail.images[0].orignalImage :singleProDetail.images[0]
    
                        })`,
                        height:"100%",
                        backgroundSize:"cover",
                        backgroundPosition:"center center",
                        backgroundRepeat:"no-repeat"
                    }}></div>
                </Col>
                <Col sm={5} xs={5} lg={5} xl={5} className="d-flex text-left  justify-content-start p-0">

                    <div>
                        <h3 className="text-dark d-flex justify-content-start" style={{textTransform:"uppercase"}}>
                            
                            {
                                singleProDetail && Object.keys(singleProDetail).length > 0 ? 
                                singleProDetail.name:""
                            }
                        </h3>
                        <div className="text-dark d-flex justify-content-start" id="product">
                        {
                                singleProDetail && Object.keys(singleProDetail).length > 0 ? <>
                            
                          <label style={{fontSize:"29px",lineHeight:"normal"}} className="ml-2"> {'$ '+ singleProDetail.price} </label> 
                               
                               
                               </>
                               :""
                            }
                            </div>
                            <div id="description" className=" text-dark">
                                <label style={{fontSize:"1.2rem",fontWeight:"600"}}>Description:</label>
                                <div className="" style={{fontSize:"1rem",lineHeight:"1",textAlign:"left"}}>
                                   {
                                       singleProDetail.description
                                   }
                                </div>
                            </div>
                        
                       <div id="size" className="d-flex" >
                        <label style={{ fontSize: "1.2rem",fontWeight:"600",textAlign:"left" }} className="text-dark">Sizes:</label>
                        <div className="ml-1 mt-1">
                            {
                        singleProDetail   && Object.keys(singleProDetail.sizes).length > 0  ?    Object.keys(singleProDetail.sizes).map((size,indx)=>{
                                   return singleProDetail.sizes[size].length > 0 ? <div key={indx} onClick={()=>{setDumy(size);
                                    setAssignError("");}} className="mx-1 mb-1 text-center" style={{color:"black",display:"inline-block",border:`1px solid ${dumy === size ? "green":"black"} `,paddingTop:"0.2rem",height:"2rem",width:"2rem"}}>
                                       {
                                            size  
                                       }
                                   </div>:""
                                   
                                })
                                :""
                            }
                           
                                  
                            </div>
                       
                        </div>
                        
                        <div>
                            {
                                alerMsg === "Success" ? <div className="alert alert-success">
                                    Product has been Assign
                                </div>:""
                            }
                            {
                        singleProDetail   && Object.keys(singleProDetail.sizes).length > 0  ?    Object.keys(singleProDetail.sizes).map((size,indx)=>{
                                   return singleProDetail.sizes[size].length > 0 && size === dumy  ? <div key={indx} style={{width:"550px"}} className="mx-1 mb-1 text-center table-responsive"  >
                                      
                                      
                                       <Table striped bordered hover className="table-sm">
                                        <thead>
                <tr>
                  <th>#</th>
                  <th>Click to Assign</th>
                  <th>Color </th>
                  
                  <th>sku Code</th>
                  <th>Total Stock</th>
                  <th>Current Stock</th>
                  <th>Assign Stock</th>
                  <th>Remaining Stock</th>
                </tr>
              </thead>
                                            {
                                               singleProDetail.sizes[size].length > 0 && singleProDetail.sizes[size].map((clr,subindx)=>{
                                                   return <tbody key={subindx}>
                                                       <tr>
                                                           <td>{(subindx+1)}</td>
                                                           <td>          <input type="checkbox" disabled={true} checked={clr.checked}  onChange={(e)=>AssignStock(e,subindx,clr,size)}  />
                                                 </td>
                                                           <td>
                                                           <div style={{height:"25px",width:"25px",display:"inline-block",backgroundColor:`${clr.color}`}}>
                                                   </div>
                                                  
                                                           </td>
                                                           <td>
                                                              {clr.skuCode ? clr.skuCode :"N/A" }
                                                             
                                                           </td>
                                                           <td>
                                                            {
                                                                clr.totalStock ? clr.totalStock : 0 
                                                            }
                                                        
                                                           
                                                           </td>
                                                           <td>
                                                               {
                                                                   clr.currentStock
                                                               }
                                                      
                                                           
                                                           </td>
                                                           <td><input type="number" disabled={true} className="form-control" style={{width:"70px"}} min={0} max={clr.currentStock} value={clr.assign}  onChange={(e)=>{
                                                               setAssignError("");
                                                               StockVAl(size,subindx,e.target.value,clr.color);
                                                           }} />
                                                           {
                                                          assignError === "Error" && subindx === erroInd ? <div className="alert alert-danger">
                                                                   Please assign Stock
                                                               </div>:""
                                                           }
                                                           {/* {
                                                               assignError === "stockExceed" && subindx === erroInd ? <div className="alert alert-danger">
                                                                   Your Assign Stock is Exceeded of Available Stock {clr.currentStock}
                                                               </div>:""
                                                           } */}
                                                           </td>
                                                           <td>{clr.remainging}</td>
                                                           
                                                       </tr>
                                                   </tbody>
                                                   
                                                   
                                                   
                                                    
                                                })
                                            }
                                        </Table>
                                        
                                   </div>:""
                                   
                                })
                                :""
                            }
                      <button className="btn btn-danger" onClick={editModalClose}>Cancel</button>
                       
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
                  {/* -------------------------end view Modal------------------------- */}

        <Container fluid={true}>
            <Row>


                {
                    !apiStatus.isSuccess && Object.keys(apiStatus).length == 0 ?
                        <div
                            className="bg-light py-4 px-2"
                            style={{ display: "inline-block", width: "100vw",height:"100vh" }}
                        >
            </div>
                        :
                        apiStatus.isSuccess && Object.keys(apiStatus).length > 0 && Object.keys(listSuperProduct).length > 0
                            && apiStatus.apiCall == "List Super Product Super Admin" ?<>
                            <ProductListComponent list={products} handleClick={handleClick} handleChange={handleChange}  publish={treeData} submit={handleSubmit} />
                           
                            </>
                            :
                            !apiStatus.isSuccess && Object.keys(apiStatus) && apiStatus.apiCall == "List Super Product Super Admin" ?
                                <>
                                    {
                                        apiStatus.message
                                    }
                                </> : ""
                }

            </Row>
        </Container>
        </LoadingOverlay>
    </div>

    );
    

}
const ProductListComponent = ({ list, handleClick, singleProduct,check,handleChange,publish,submit }) => {
// console.log(publish)
    
    return ( <>
        {
          list && list.length > 0 ?  list.map((data, indx) => {
                return <Col className="col-12 col-lg-4 col-xl-4">
                    <label for={data.id} key={indx} >
                        <div class=" card" >
                            {/* =================================== */}
                        <div className="co text-center">
	<div class="co-overlay"></div>
	
    <div className=" text-center"  style={{border: `${data.checked ? "3px solid green":"" }`,
    borderRadius: "3px"}}>
                                <img class="img-thumbnail" style={{ height: "15rem", width: "500rem" }} loading="lazy" src={
                                  data.images[0] &&  data.images[0].thumbnail ? data.images[0].thumbnail
                                        : data.images[0]
                                } alt="" />
                               
                            </div>


	
	<div class="co-details fadeIn-bottom">
        {
            data.checked ? <span className="edit mr-2" onClick={(e) => handleClick(data, e,data.id,"edit")}>	<i class="fas fa-edit "  style={{fontSize:"20px"}}></i>
            </span>:<span className="edit mr-2" onClick={(e) => handleClick(data, e,data.id,"add")}>	<i class="fas fa-plus "  style={{fontSize:"20px"}}></i>
  </span>
        }
  
  
  
  <span className="view" onClick={(e) => handleClick(data, e,data.id,"view")}>
	  <i class="far fa-eye pt-2" style={{fontSize:"20px"}}></i>
  </span>
  
	</div>
  

</div>

{/* ============================================================ */}

                        </div>
                    </label>
                   
                </Col>

            })
            : ""
           
        } 
        <Col className="col-9">
           
         <button className="btn btn-dark" onClick={submit}>submit</button>
         </Col>

         </> );


}

export default Form4;