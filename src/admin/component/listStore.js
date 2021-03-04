import { formatCountdown } from "antd/lib/statistic/utils";
import React,{useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import {Switch} from 'antd';
import 'antd/dist/antd.css';

function ListStore() {
	const apiStatus = useSelector((state) => state.apiCallStatus);
	const storeList = useSelector((state) => state.listStore);
	const [showCheck,setShowCheck] = useState(true);
	const { isSuccess } = apiStatus;
	const { data } = storeList;
	console.log(data);
	console.log(isSuccess);
	if(apiStatus.isSuccess && storeList && Object.keys((storeList)).length > 0 && showCheck){
		setShowCheck(false)
	}
	else if(apiStatus && Object.keys(apiStatus) && !apiStatus.isSuccess && apiStatus.apiCall === "List Store" && showCheck){
		console.log("zain")
		setShowCheck(false)
	}else if(!isSuccess && Object.keys(apiStatus).length > 0 && showCheck) {
		setShowCheck(false)
	}
	return (
		<> 
		<LoadingOverlay
		active={showCheck}
		spinner
		text='Loading...'
		>
			<div className="col-12   py-1 px-4 mt-3">
				<div className="row">
					{!isSuccess && Object.keys(apiStatus).length === 0 ? (
						<div
							// className="bg-light py-4 px-2"
							style={{ display: "inline-block", width: "100vw",height:"100vh" }}
						>
							{/* Loading .... */}
						</div>
					

					) : isSuccess && data && data.stores && data.stores.length > 0 ? (
						<>
							<NewComponent list={data} />
						</>
					) : !apiStatus.isSuccess && Object.keys(apiStatus).length > 0  ?  (
						apiStatus.message
					) : isSuccess && data && data.stores && data.stores.length === 0 ? (
						"No record found"
					) : (
						<div
							// className="bg-light py-4 px-2"
							style={{ display: "inline-block", width: "100vw",height:"100vh" }}
						>
							{/* Loading .... */}
						</div>
					)}
				</div>
			</div>
	</LoadingOverlay>	
		</>
	);
}
const NewComponent = ({ list }) => {
	// console.log(list.stores)
	return (
		<>
			{list ? (
				list.stores.map((data, index) => {
					// console.log(data.logo)
					return (
						<div className="col-12  col-lg-4 col-xl-3   my-2 py-2 zoom" key={index}>
										<div className="card" >
				<div className="card-img-top">
			
					
<div className="co text-center">
	<div class="co-overlay"></div>
	<div style={{height:"200px",width:"100%",backgroundImage:`url(
		${
			data.logo ? data.cover: "https://dummyimage.com/300x200/000/fff" 
		}
	)`,backgroundSize:"cover",backgroundPosition:"center"}}></div>

	
	<div class="co-details fadeIn-bottom">
  <Link to={`/Store/editStore/${data.id}`} >
  <span className="edit mr-2">	<i class="far fa-edit " style={{fontSize:"20px"}}></i>
  </span>
  </Link>
  <Link to={`/Store_Management/${data.id}`}>
  <span className="view">
	  <i class="far fa-eye pt-2" style={{fontSize:"20px"}}></i>
  </span>
  </Link>
	</div>
  

</div>



				</div>
				<div class="card-body">
    
	<div className="row ">
                  
                  <div className="col-12 text-secondary " >
                    
				  <h6 className="text-secondary" style={{fontSize:"15px"}}>{data.name}</h6>
					<h6 className="mb-0  text-secondary">{
						data.subURL
				}</h6>
				<div className="mt-2">
					<Switch checked={data.isActive}></Switch>
					</div>
					
					
                    </div>

					
				
				 
                </div>
				 <div className="row d-flex justify-content-between">
                  <div className="col-12">
				
                  </div>
                  {/* <div className=" col-7 text-secondary ">
				  <Link to={`/Store_Management/${data.id}`}>  <i class="fas fa-link"></i>
				  </Link>
                    
                    </div> */}
                </div> 

  </div>
			</div>


							
						</div>
					);
				})
			) : (
				<div
					className="bg-light py-4 px-2"
					style={{ display: "inline-block", width: "100vw" }}
				>
					Loading....
				</div>
			)}
		</>
	);
};
export default ListStore;
