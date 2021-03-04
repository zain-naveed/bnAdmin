import React,{useState,useEffect} from 'react';
import { Row, Col,Modal,Table } from 'react-bootstrap';
import {getStoreProductId} from '../../../services/superAdminService/getStoreProductbyidService';
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
export default function EditProductStore() {
    const [rawProducts, setrawProduct] = useState([]);
    const [eidtModal,setEditModal] = useState(false);
    const [treeData, SetMult] = useState([]);
    const[products,SetProducts] = useState([]);
    const [rawData,setRaw] = useState([]);
    const [selectImage, setSelectedImage] = useState("");
    const [dumy,setDumy] = useState("");
    const [assignError,setAssignError] = useState("");
    const [erroInd,setErroInd] = useState("");
    const [viewSingleProduct,SetviewSingleProduct] = useState(false);
   
    const [singleProDetail,setProDetail] = useState({});
    const [alerMsg,setAlertMsg] = useState("");
    const [dummySize,setdummySize] = useState("");
    const [sizeError,setSizeError]= useState("");
    
    const dispatch = useDispatch();
    const getStoreProduct = useSelector(state=>state.getProductbyId);
    console.log("single pro detail",singleProDetail);
    const handleCheck = (data,e,productId,string) => {
        var store = ""; 
        // getCookie("store");
        
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
    // const handleCheck = (e,obj)=>{
    //     var val = {
    //         name: "zain"
    //     }
    //     if(e.target.checked){
    //         setRaw([...rawData,val]);
    //         SetviewSingleProduct(true);
    //         setProDetail(obj);
            
    //     }else{
    //         rawData.splice(0,1);
    //     }
    // }
const {id} = useParams();
// console.log("getStoreProduct",getStoreProduct);
    useEffect(()=>{
            dispatch(
                getStoreProductId(id)
            )
    },[])
    const viewModalClose = ()=>{
        SetviewSingleProduct(false)
        setProDetail({});
        setSelectedImage("");
        setDumy("");
    }
    const StockVAl = (indx,subindx,value)=>{
        const rawData = [...dummySize];
        rawData[indx].color[subindx].assign = value;
        rawData[indx].color[subindx].remainging = value != 0 && value ?
        
        rawData[indx].color[subindx].stock - value > 0 || rawData[indx].color[subindx].stock - value === 0  ? rawData[indx].color[subindx].stock - value : "out of stock"
        
        
        : 0; 
        setdummySize(rawData);
        
    }
    const AssignStock = (e,ind,obj)=>{
        const rawData = [...dummySize];
        if(e.target.checked){
            // console.log(e.target.checked);
            // console.log(dummySize);
            
            console.log("click")
            rawData.forEach((data,indx)=>{
                
                if(data && data.color.length > 0 ){
                   data.color.forEach((info,subindx)=>{
                    
                       if(subindx === ind && info.assign === "" && info.skucode === obj.skucode || subindx === ind && info.assign == 0 && info.skucode === obj.skucode){
                        
                           console.log(subindx);
                           console.log(info.assign)
                           setErroInd(subindx);
                           setAssignError("Error");
                        //    info.checked = false;
                           rawData[indx].color[subindx].checked = false;
                           setdummySize(rawData);

                        // alert("Ple")
                       }else if(subindx === ind && info.skucode === obj.skucode){
                          
                        // info.checked = true;
                        
                // if(rawData[indx].color[subindx].checked ){
                //     console.log("zain")
                //     rawData[indx].color[subindx].checked = false;
                //     setdummySize(rawData); 
                // }else{
                    // debugger;
                    rawData[indx].color[subindx].checked = true;
                        setdummySize(rawData); 
                        setAlertMsg("Success");
                        setTimeout(() => {
                            setAlertMsg("");
                        }, 1000);
                
                    
                       }
                   })
                }
            })
        }else{
            setAssignError("");
            rawData.forEach((data,indx)=>{
                
                if(data && data.color.length > 0 ){
                   data.color.forEach((info,subindx)=>{
                    if(rawData[indx].color[subindx].checked && subindx === ind && info.skucode === obj.skucode){
                    rawData[indx].color[subindx].checked = false;
                        setdummySize(rawData); 
                    }
                    
                       
                   
                })
            }
        })
            
        
            
        }
    }
    const AddSizes = ()=>{
        const clonse = [...treeData];
        console.log(singleProDetail);
        const index = clonse.findIndex(i=> i.superProductId === singleProDetail.id);
        if(index > -1){
            clonse[index].sizes = dummySize;
            SetMult(clonse);
            SetviewSingleProduct(false);
            setdummySize({});
            
        }
    }
    // console.log(rawData)
    return (
        <>
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
                            
                          <label style={{fontSize:"29px",lineHeight:"normal"}} className="ml-2"> 
                          {
                              singleProDetail.price ? <> {'$ ' + singleProDetail.price} </> : "N/A"
                          }  </label> 
                               
                               
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
                                                            //    setAssignError("");
                                                            //    StockVAl(size,subindx,e.target.value,clr.color);
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
                            <button className="btn btn-danger ml-2" onClick={(e)=>handleCheck(singleProDetail,e,singleProDetail.id)}>Delete</button>
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

        <Row className="mt-3">
            {
            getStoreProduct && Object.keys(getStoreProduct).length > 0 && getStoreProduct.isSuccess 
            && getStoreProduct.data
            && Object.keys(getStoreProduct.data).length > 0
            && getStoreProduct.data.products 
            && getStoreProduct.data.products.length > 0  ?
                <>
                {
                    getStoreProduct.data.products.map((resp,indx)=>{
                        if(resp && Object.keys(resp).length > 0 && resp.images && resp.images.length > 0){
                            return <Col className="col-12 col-lg-4 col-xl-4">
                            <label for={resp.id} key={indx} >
                                <div class=" card" >
                                    {/* =================================== */}
                                <div className="co text-center">
            <div class="co-overlay"></div>
            
            <div className=" text-center"  style={{border: `${resp.checked ? "3px solid green":"" }`,
            borderRadius: "3px"}}>
                                        <img class="img-thumbnail" style={{ height: "15rem", width: "500rem" }} loading="lazy" src={
                                         resp.images[0].thumbnail ? resp.images[0].thumbnail :
                                         resp.images[0].thumbnail 
                                    } alt="" />
                                       
                                    </div>
        
        
            
            <div class="co-details fadeIn-bottom">
                {
                    resp.checked ? <span className="edit mr-2" onClick={(e) => handleCheck(resp, e,resp.id,"edit")}>	<i class="fas fa-edit "  style={{fontSize:"20px"}}></i>
                    </span>:<span className="edit mr-2" onClick={(e) => handleCheck(resp, e,resp.id,"add")}>	<i class="fas fa-plus "  style={{fontSize:"20px"}}></i>
          </span>
                }
          
          
          
          <span className="view" onClick={(e) => handleCheck(handleCheck, e,resp.id,"view")}>
              <i class="far fa-eye pt-2" style={{fontSize:"20px"}}></i>
          </span>
          
            </div>
          
        
        </div>
        
        {/* ============================================================ */}
        
                                </div>
                            </label>
                           
                        </Col>
        
                            
                        //     return <Col className="col-12 col-lg-4 col-xl-4">
                        //     <label htmlFor={indx} >
                        //         <div class=" card" >
           
                        //            <div className="hovereffect text-center">
                        //                <img class="img-thumbnail" style={{ height: "15rem", width: "500rem" }} loading="lazy" src={
                        //                  resp.images[0].thumbnail ? resp.images[0].thumbnail :
                        //                  resp.images[0].thumbnail 
                        //             } alt="" />
                        //                <div class="overlay">
                        //                    <input type="checkbox" id={indx} onChange={(e)=>handleCheck(resp,e,resp.id)}  className="check"/>
           
                        //                </div>
                        //            </div>
           
                        //        </div>
                        //    </label>
           
                        // </Col>
                          

                          

                        }
                    
                    })
                }
                </>
                :
                getStoreProduct && Object.keys(getStoreProduct).length > 0 && !getStoreProduct.isSuccess 
             ? 
            
                <>
                {
                    // console.log("asd;flj")
                }
                <p className="ml-4">
                {
                    getStoreProduct.message
                }
                </p>
                </>
                :
                getStoreProduct && Object.keys(getStoreProduct).length > 0 && !getStoreProduct.isSuccess 
            && getStoreProduct.data
            && Object.keys(getStoreProduct.data).length === 0 
? "No Data found":""
            }
            
           
        </Row>
        </>
    );
}