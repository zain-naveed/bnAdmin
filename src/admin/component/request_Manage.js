import React,{useEffect,useState} from 'react';
import {listUserService} from '../../services/superAdminService/listUserService';
import {listProductApprovalService} from '../../services/superAdminService/listApprovalService';
import {updateApprovalService} from '../../services/superAdminService/updateApprovalService';
import {updateProductApproval} from '../../action/approvalAction';
import {useDispatch} from 'react-redux';
import TopMenu from '../topMenue';
import ListGrid from './listgrid';
import {useSelector} from 'react-redux';
import {Tabs,Tab,Modal,Form,Spinner} from 'react-bootstrap';
function RequestManage(){
   const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(
		listUserService());
		dispatch(
			listProductApprovalService()
		)
	},[dispatch]);
	const [errorFor,setError]= useState("");
	const [errorMsg,setErrorMsg] = useState("");
	const [approvaldisable,setApprovalDisable] = useState("");
	const [RequestModalBoolean,SetRequestModalBoolean] = useState(false);
	const [status,setstatus] = useState("");
	const [RequestId,setRequestId] = useState("");
	const listApproval = useSelector(state=>state.listApproval);
	const updateStatus = useSelector(state=>state.updateApproval);
	console.log(updateStatus);
	if(updateStatus && Object.keys(updateStatus).length > 0 && updateStatus.isSuccess && approvaldisable){
		setApprovalDisable(false);
		setError("approval");
		setErrorMsg(updateStatus.message);
		setTimeout(() => {
			setErrorMsg("");
			setError("");
			SetRequestModalBoolean(false);
			dispatch(
				updateProductApproval({})
			)
			dispatch(
				listProductApprovalService()
			)

		}, 3000);
	}else if(updateStatus && Object.keys(updateStatus).length > 0 && !updateStatus.isSuccess && approvaldisable){
		setApprovalDisable(false);
		setError("approval");
		setErrorMsg(updateStatus.message);
		setTimeout(() => {
			setErrorMsg("");
			setError("");
			SetRequestModalBoolean(false);
			dispatch(
				updateProductApproval({})
			)
			dispatch(
				listProductApprovalService()
			)
		}, 3000);
	}
	const RequestModalClose = ()=>{ 
		SetRequestModalBoolean(false);
		setRequestId("");
		setstatus("");
	}
	const showModal = (obj)=>{
		SetRequestModalBoolean(true);
		setRequestId(obj.id);
		
	}
	const SubmitRequest = ()=>{
		dispatch(
			updateApprovalService({RequestId,status})
		)
		setApprovalDisable(true)
	}

    return (
        <>
			<div className="main-content singlemenu">
				<TopMenu user="Request Management" />
				
				<div className="container-fluid ">
					<div className="main-content-body mt-4">
						<Tabs defaultActiveKey="List Request" id="uncontrolled-tab-example">
							<Tab eventKey="List Request" title="Store Request">
							<ListGrid />
							</Tab>
							<Tab eventKey="Product Request" title="Product Request">
								{
									listApproval && Object.keys(listApproval).length > 0 &&
									listApproval.isSuccess &&
									listApproval.data && Object.keys(listApproval.data).length > 0 && listApproval.data.requests &&
									listApproval.data.requests.length > 0 ? 


									<div className="row p-4" style={{backgroundColor:"#141823"}}>
										{
											listApproval.data.requests.map((data,indx)=>{
												return <div className="col-12  col-lg-4 col-xl-3   my-2 py-2 zoom" key={indx}>
												<div className="card" >
												{
													data && data.product && Object.keys(data.product).length > 0
												&&	data.product.images && data.product.images.length > 0 ?
													data.product.images.length < 2 ?
													
													<div className="card-img-top">
													<div className="co text-center">
													  <div class="co-overlay"></div>
					
													  <div style={{
														height: "200px", width: "100%", backgroundImage: `url(
					  
														  ${data.product.images[0].thumbnail}
					  )`, backgroundSize: "cover", backgroundPosition: "center"
													  }}></div>
					
					
													  <div class="co-details fadeIn-bottom">
					
					
														
					
														
														  <span className="view"  onClick={()=>showModal(data)}>
															<i class="fas fa-check pt-2"  style={{ fontSize: "20px" }}></i>
														  </span>
													
													  </div>
					
					
													</div>
					
					
					
												  </div>
												
													:	<div className="card-img-top">
													<div className="co text-center">
													  <div class="co-overlay"></div>
					
													  <div style={{
														height: "200px", width: "100%", backgroundImage: `url(
					  
														  ${data.product.images[0].thumbnail}
					  )`, backgroundSize: "cover", backgroundPosition: "center"
													  }}></div>
					
					
													  <div class="co-details fadeIn-bottom">
					
					
					
														
														  <span className="view" onClick={()=>showModal(data)}>
															<i class="fas fa-check pt-2" style={{ fontSize: "20px" }}></i>
														  </span>
													
													  </div>
					
					
													</div>
					
					
					
												  </div>
												
												:""
												}
												  <div class="card-body">
					
													<div className="row ">
					
													  <div className="col-12 text-secondary " >
					
														<h6 className="text-secondary" style={{ fontSize: "15px" }}>
															<span>{
																data.message
															}</span>
															<div>
																{
																	data.allowedActions && data.allowedActions.map((rsp,rspindx)=>{
																			return <span key={rspindx} className={`${rsp === "Rejected" ? 'btn btn-danger btn-sm mx-1 mt-1':'btn btn-success btn-sm mt-1'}`}>{rsp}</span>
																	}) 
																}
																<span></span>
															</div>
														</h6>
														{/* <Switch></Switch> */}
													  </div>
													</div>
												  </div>
												</div>
											  </div>
											})
										}
									</div>
									
									: listApproval && Object.keys(listApproval).length > 0 && listApproval.isSuccess &&
									listApproval.data && Object.keys(listApproval.data).length > 0 && listApproval.data.requests &&
									listApproval.data.requests.length === 0 ? 
									"No Data Found" :
									listApproval && Object.keys(listApproval).length > 0 && !listApproval.isSuccess ? 
									listApproval.message :
									"Product Request Not Found Yet"

								}
							</Tab>
						</Tabs>
						
						
					
					</div>
				
				</div>
			</div>
	
		{/* ---------------------------------------------Product Request Modal------------------------- */}
		<Modal
					show={RequestModalBoolean}
					onHide={RequestModalClose}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Body className="text-secondary">
						
            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Product Status</Form.Label>
                                <select className="form-control" disabled={approvaldisable ? true:false} onChange={(e)=>setstatus(e.target.value)}>
									<option value="">Select</option>
									<option value="Approved">Approved</option>
									<option value="Rejected">Rejected</option>
								</select>
                              </Form.Group>
                              {
                                errorFor === "approval" && errorMsg !== "" ? <div className="alert alert-success">
                                  {
                                    errorMsg
                                  }
                                </div> :""
                              }
<div className="d-flex justify-content-end">
                              <button className="btn btn-default mr-1" onClick={RequestModalClose}  >Close</button>
                              <button className="btn btn-primary" onClick={SubmitRequest}  disabled={approvaldisable ? true:false} >
                                
                              {
																	approvaldisable ? <Spinner
																	as="span"
																	animation="grow"
																	size="sm"
																	role="status"
																	aria-hidden="true"
																/>: "Update Request"
																}
                                </button>
                              </div>
            
					</Modal.Body>
				</Modal>
	{/* -------------------------------------------------Product Request Modal end--------------------- */}
		</>
    )
}
export default RequestManage;