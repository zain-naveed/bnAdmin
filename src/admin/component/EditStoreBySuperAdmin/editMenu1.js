import React, { useState, useEffect, Component } from "react";
// import SortableTree from "react-sortable-tree";
// import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import Text from "../text";
import { getCookie } from "../../../cookies/cookies";
import {addMenuService} from '../../../services/superAdminService/addMenuService';
import {useDispatch,useSelector} from 'react-redux';
import { setApiCallsStatus } from "../../../action/apiCallsStatus";
import LoadingOverlay from 'react-loading-overlay';
import {Modal} from 'react-bootstrap';

function EditMenu1({handle2}) {
	const [addMenu, setAddMenu] = useState([{name:""}]);
	const [addMenuName,setAddMenuName] = useState("");
	const [treeData, setMult] = useState([]);
	const [errorFor, setErrorFor] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [subMenus, setSubMenu] = useState([{ name: "" }]);
	const [ResultSuperMenus,setResultSuperMenus] = useState([]);
	const [superMenus,setSuperMenus] = useState("");
	const [show, setShow] = useState(false);
	const [loading,setLoading] = useState(false)
	const dispatch = useDispatch();
	const apiStatus = useSelector(state=>state.apiCallStatus);
if(
	apiStatus && Object.keys(apiStatus) && 
	apiStatus.isSuccess && apiStatus.apiCall == "AddMenu" && !show && loading
	){
		setTimeout(() => {
			setLoading(false);	
		}, 500);
		setTimeout(() => {
			setShow(true);
		}, 500);
		
		// setTimeout(() => {
			
		// }, 1000);
		setTimeout(() => {
			
			dispatch(
				setApiCallsStatus({})
			);
			return handle2(4,"Add Product to Store");
			
			
		}, 2000);
	}
	else if(
		apiStatus && Object.keys(apiStatus) && !apiStatus.isSuccess && 
		apiStatus.apiCall === "AddMenu" && !show && loading
	){ 
		// setShow(true)
		setTimeout(() => {
			setLoading(false)
		}, 1000);
		setTimeout(() => {
			setShow(true)
		}, 1000);
		
		// alert(apiStatus.message);
		setTimeout(() => {
			
			dispatch(
				setApiCallsStatus({})
			);
			setShow(false)
			
		}, 3000);
	}

	// useEffect(()=>{
	// setTree({
	//   treeData: [
	//     { title: 'Chicken', children: [{ title: 'Egg' }] },
	//     { title: 'Fish', children: [{ title: 'fingerline' }] },
	//   ],
	// })

	// },[])

	const restError = () => {
		setErrorMsg("");
		setErrorFor("");
	};

	// console.log(tree.treeData)
	const validation = () => {
		if(superMenus === ""){
			setErrorFor("superMenus");
			setErrorMsg("Super Menu is required!!");
			return false;
		}else
		if (addMenuName === "") {
			setErrorFor("menu");
			setErrorMsg("Menu is required!!");
			return false;
		} else {
			return true;
		}
	};

	const handleMenu = () => {
		
		var value = validation();
		if (value) {
			var store = getCookie("store");
			var id = store.id;
			var subValue = [...subMenus];
			var arr =[];
			subValue.forEach((data)=>{
				if(data.name != ""){
					arr.push(data)
				}
			})
			var obj = {
				name: addMenuName,
				// storeId: id,
				subMenus: subMenus,
			};
			setMult([...treeData, obj]);
			
			// setSuperMenus([...superMenus,obj1]);
			setAddMenu([{name:""}]);
			setSubMenu([{ name: "" }]);
			setAddMenuName("");
			restError();
		}
	};
	const addSuperMenusFunc =()=>{
		console.log("click")
		var store = getCookie("store");
			var id = store.id;
		var obj1 = {
			name: superMenus,
			storeId:id,
			menus:treeData
		}
		console.log(addMenu)
		setResultSuperMenus([...ResultSuperMenus,obj1]);
		setSuperMenus("");
	}
	console.log(treeData);
	console.log(ResultSuperMenus)
	const resetMenu = (menu) => {
		console.log(menu);
	};
	const creatSubMenu = (value, index) => {
		let Subvalues = [...subMenus];
		Subvalues[index] = { name: value };
		setSubMenu(Subvalues);	
	};
	const addSubMenu = () => {
		let Subvalues = [...subMenus];
		Subvalues.push("");
		setSubMenu(Subvalues);
	};
	const removeSubMenu = (idx) => {
		let Subvalues = [...subMenus];
		Subvalues.splice(idx, 1);
		setSubMenu(Subvalues);
	};
	// console.log(tree)
	const handleSubmit = (e)=>{
		e.preventDefault();
		
		if(treeData){
			resetMenu();
		dispatch(
		addMenuService(ResultSuperMenus)
		)
		setLoading(true)
		}
	}
	const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);
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
						{apiStatus.message}
					</Modal.Body>
				</Modal>
			</>
		);
	};
	console.log(Object.keys(apiStatus).length);
	const addMenuFields = ()=>{
		let Subvalues = [...addMenu];
		Subvalues.push("");
		setAddMenu(Subvalues);
	}
	const delMenuFields = (idx)=>{
		let Subvalues = [...addMenu];
		Subvalues.splice(idx, 1);
		setAddMenu(Subvalues);
	}
	const createMenus = (value,indx)=>{
		let MenusClone = [...addMenu];
		MenusClone[indx] = {name:value}
		setAddMenu(MenusClone);
	}
	return (	
		<>
		<LoadingOverlay
  active={loading}
  spinner
  text='Loading...'
  >
			<div>
			{
			apiStatus && apiStatus.isSuccess && apiStatus.apiCall == "AddMenu" ? <>
			<ModalComponent /> 
			</>
			:
			apiStatus && !apiStatus.isSuccess && Object.keys(apiStatus).length > 0 && apiStatus.apiCall == "AddMenu"  ? <>
			
			<ModalComponent />
			</>
			 : 
			""
		}
				{/* {treeData} */}
				{/* <SortableTree treeData={tree.treeData} onChange={treeData=>setTree({treeData})} /> */}
				<div className="container card py-4 mt-4">
					<div className="main-content-body">
						{/* <div className="text-center">
            <Text text="Add Custom Store Menu" />
          </div> */}
						{/* <form onSubmit={handleSubmit}> */}
						<div class="form-group">
							<label htmlFor="uname">Super Menu</label>
							<input
								type="text"
								class="form-control"
								id="uname"
								placeholder="Main Menu"
								value={superMenus}
								name="uname"
								onChange={(e) => {
									setSuperMenus(e.target.value);
									restError();
								}}
							/>
						</div>
						{errorFor === "superMenus" && errorMsg !== ""  ? (
							<div className="alert alert-danger">{errorMsg}</div>
						) : (
							""
						)}
						<div class="form-group">
			{
				console.log(addMenu)
			}
							<label htmlFor="uname">Main Menu</label>
							<input
										type="text"
										class="form-control"
										id="uname"
										placeholder="Main Menu"
										value={addMenuName}
										name="uname"
										onChange={(e) => {
											setAddMenuName(e.target.value);
											restError();
										}}
									/>
							{/* {
			
								addMenu && addMenu.length > 0 ?
								addMenu.map((menu,indx)=>{
									return <div class="input-group mb-2">
											
									
									{
										indx === 0 && addMenu.length === 1 || indx === addMenu.length -1 ? <div class="input-group-prepend" onClick={addMenuFields}>
										<div class="input-group-text">+</div>
									</div>:<div class="input-group-prepend" onClick={delMenuFields}>
																<div class="input-group-text">-</div>
															</div>
									}
									
									</div>
								})			
						
								:""
							} */}
							
						</div>
						{errorFor === "menu" ? (
							<div className="alert alert-danger">{errorMsg}</div>
						) : (
							""
						)}
						<div class="form-group">
							<label htmlFor="uname">Sub Menu</label>
							{/* <div class="input-group mb-2">
								<input
									type="text"
									class="form-control"
									id="submenu"
									placeholder="Enter sub menu"
									name="submenu"
									onChange={(e) => creatSubMenu(e.target.value, "")}
								/>
							</div> */}

							{subMenus && subMenus.length > 0
								? subMenus.map((m, idx) => {
										return (
											<div class="input-group mb-2">
												<input
													type="text"
													class="form-control"
													id={`submenu${idx}`}
													placeholder="Enter sub menu"
													value={m.name}
													name={`submenu${idx}`}
													key={idx}
													onChange={(e) => creatSubMenu(e.target.value, idx)}
												/>
												{(idx === 0 && subMenus.length === 1) ||
												idx === subMenus.length - 1 ? (
													<div class="input-group-prepend" onClick={addSubMenu}>
														<div class="input-group-text">+</div>
													</div>
												) : subMenus.length > 1 && idx < subMenus.length - 1 ? (
													<div
														class="input-group-prepend"
														onClick={() => removeSubMenu(idx)}
													>
														<div class="input-group-text">-</div>
													</div>
												) : (
													""
												)}
											</div>
										);
								  })
								: ""}
						</div>
						<div className="text-center">
							<button class="btn btn-outline-dark mx-1" onClick={()=>{
								handleMenu();
								resetMenu();
							}}>
								Add Menu
							</button>
							<button class="btn btn-outline-dark mx-1" onClick={addSuperMenusFunc}>Add Super Menus</button>
							<button onClick={(e)=>{
								restError();
								handleSubmit(e);
								
							}} class="btn btn-outline-dark">
								Next
							</button>
						</div>

						
						{/* </form> */}
						<hr />
						{/* <SortableTree
							treeData={treeData}
							onChange={(treeData) => resetMenu(treeData)}
						/> */}
						{treeData && treeData.length > 0 ? (
							<div class="accordion" id="navMenutree">
								<div className="text-center">
									{treeData.map((data, index) => {
										return (
											<div class="card" key={index}>
												<div class="card-header" id={`menuHeading${index}`}>
													<h2 class="mb-0">
														<button
															class="btn btn-link btn-block text-left"
															type="button"
															data-toggle="collapse"
															data-target={`#menu${index}`}
															aria-expanded="false"
															aria-controls={`menu${index}`}
														>
															{data.name}
														</button>
													</h2>
												</div>

												<div
													id={`menu${index}`}
													class="collapse"
													aria-labelledby={`menuHeading${index}`}
													data-parent="#navMenutree"
												>
													{data.subMenus && data.subMenus.length > 0
														? data.subMenus.map((s, idx) => {
																return (
																	<div class="card-body" key={idx}>
																		<ul class="list-group">
																			<li class="list-group-item">{s.name}</li>
																		</ul>
																	</div>
																);
														  })
														: ""}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			
			
			</div>
			</LoadingOverlay>
		</>
	);
}

export default EditMenu1;
