import React, { useState, useEffect } from 'react';
import {useDispatch ,useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import {EditMenuService} from '../../../services/superAdminService/editMenusService';
import {editStoreMenusAction} from '../../../action/editStoreMenusAction';
import './editSuperMenu.css';
export default function EditSuperMenus() {

	const individualStore = useSelector(state => state.GetStoreUserId);
	const MenuStatus = useSelector(state=> state.editMenu);

	const dispatch = useDispatch();
	// console.log(individualStore);

	// const [addMenu, setAddMenu] = useState([{ name: "" }]);
	const [rawMainMenu, setRawMainMenu] = useState([]);
	const [dummyResul, setdummyResul] = useState([]);
	const [treeData, setMult] = useState([]);
	// const [addMenuName, setAddMenuName] = useState("");
	const [errorFor, setErrorFor] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [subMenus, setSubMenu] = useState([{ name: "" }]);
	const [ResultSuperMenus, setResultSuperMenus] = useState([]);
	const [superMenus, setSuperMenus] = useState("");
	const [show, setShow] = useState(false);
	// const [updateMenus, setUpdateMenus] = useState([]);

	const [loading, setLoading] = useState(false);
	// useEffect(()=>{
	// 	window.jQuery.fn.treed = null;
	// })
	if (
		individualStore &&
		Object.keys(individualStore).length > 0 &&
		individualStore.data &&
		individualStore.data.superMenus
		&& Object.keys(individualStore.data.superMenus).length > 0
		&& ResultSuperMenus.length === 0
	) {
		setResultSuperMenus(individualStore.data.superMenus);
	}
if(MenuStatus && Object.keys(MenuStatus).length > 0 &&  MenuStatus.isSuccess && loading){
	setLoading(false);
	setShow(true);
	setTimeout(() => {
		setShow(false);
		dispatch(editStoreMenusAction({}))
	}, 3000);
}else
if(MenuStatus && Object.keys(MenuStatus).length > 0 &&  MenuStatus.isSuccess && loading){
	setLoading(false);
	setShow(true);
	setTimeout(() => {
		setShow(false);
		dispatch(editStoreMenusAction({}))
	}, 3000);
}


	const addMainMenu = () => {
		restError();
		if (superMenus === "") {
			setErrorFor("superMenus");
			setErrorMsg("Super Menu is required.");
		} else if (rawMainMenu && rawMainMenu.length > 0) {
			let findIndex = rawMainMenu.findIndex((x) => x.name === "");
			if (findIndex > -1) {
				setErrorFor("superMenus");
				setErrorMsg("field is required.");
			} else {
				setRawMainMenu([
					...rawMainMenu,
					{
						name: "",
						subMenus: [],
					},
				]);
			}
		} else {
			setRawMainMenu([
				...rawMainMenu,
				{
					name: "",
					subMenus: [],
				},
			]);
		}
	};
	console.log(rawMainMenu)


	const restError = () => {
		setErrorMsg("");
		setErrorFor("");
	};

	// console.log(tree.treeData)
	const validation = () => {
		if (superMenus === "") {
			setErrorFor("superMenus");
			setErrorMsg("Super Menu is required.");
			return false;
		} else {
			return true;
		}
	};



	const resetMenu = (menu) => {
		console.log(menu);
	};
	const addSubMenu = (idx) => {
		restError();
		debugger;
		let Subvalues = [...rawMainMenu];
		if (Subvalues[idx].subMenus.length === 0 && Subvalues[idx].name !== "") {
			Subvalues[idx].subMenus.push({ name: "" });
			setSubMenu(Subvalues);
		} else if (
			Subvalues[idx].name == "" &&
			Subvalues[idx].subMenus.length === 0
		) {
			setErrorFor("superMenus");
			setErrorMsg("field is required.");
		} else {
			let findIndex = Subvalues[idx].subMenus.findIndex((x) => x.name === "");
			if (findIndex > -1) {
				setErrorFor("superMenus");
				setErrorMsg("field is required.");
			} else {
				Subvalues[idx].subMenus.push({ name: "" });
				setSubMenu(Subvalues);
			}
		}
	};
	const removeMainMenu = (idx) => {
		let Subvalues = [...rawMainMenu];
		Subvalues.splice(idx, 1);
		setRawMainMenu(Subvalues);
	};
	const removeSubMenu = (pInex, idx) => {
		restError();
		debugger;
		let Subvalues = [...rawMainMenu];

		Subvalues[pInex].subMenus.splice(idx, 1);
		setRawMainMenu(Subvalues);
	};
	const setRawMainMenuValue = (index, value, obj) => {
		let mainMenu = [...rawMainMenu];

		const checkIndex = mainMenu.findIndex(i => i.id === obj.id || i.menuId === obj.menuId);
		if (checkIndex > -1 && obj.id || checkIndex > -1 && obj.menuId) {
			var obj = {
				menuId: obj.id ? obj.id : obj.menuId,
				name: value,
				subMenus: obj.subMenus
			}
			mainMenu[checkIndex] = obj;
		} else {
			mainMenu[index].name = value;
		}

		setRawMainMenu(mainMenu);
	};
	const setRawSubMenuValue = (pIndex, cIdx, value,obj) => {
		console.log("sub menus id",obj)
		restError();
		let mainMenu = [...rawMainMenu];
		let checkindex = mainMenu[pIndex].subMenus.findIndex(i=>i.id === obj.id || i.subMenuId === obj.subMenuId);
		if(checkindex > -1 && obj.id || checkindex > -1 && obj.subMenuId){
			
			var obj = {
				subMenuId:obj.id  ? obj.id:obj.subMenuId,
				name:value
			}
			mainMenu[pIndex].subMenus[checkindex] = obj
			mainMenu[pIndex] = {
				menuId:mainMenu[pIndex].id ? mainMenu[pIndex].id : mainMenu[pIndex].menuId  ,
				name:mainMenu[pIndex].name,
				subMenus:mainMenu[pIndex].subMenus
			}
		}else{
			mainMenu[pIndex].subMenus[cIdx].name = value
		}
		console.log(checkindex)
		setRawMainMenu(mainMenu);
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (treeData) {
			resetMenu();
			dispatch(EditMenuService(ResultSuperMenus));
			setLoading(true);
		}
	};
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const ModalComponent = () => {

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
							MenuStatus.message
						}
					</Modal.Body>
				</Modal>
			</>
		);
	};


	const treeViewInit = () => {
		var $ = window.jQuery;
		$.fn.extend({
			treed: function (o) {
				var openedClass = "si si-minus";
				var closedClass = "si si-plus";

				if (typeof o != "undefined") {
					if (typeof o.openedClass != "undefined") {
						openedClass = o.openedClass;
					}
					if (typeof o.closedClass != "undefined") {
						closedClass = o.closedClass;
					}
				}

				//initialize each of the top levels
				var tree = $(this);
				tree.addClass("tree");
				tree
					.find("li")
					.has("ul")
					.each(function () {
						var branch = $(this); //li with children ul
						// console.log('branch.find("i")', branch.find("i"));
						if (branch.find("i").length === 0) {
							branch.prepend("<i class='si " + closedClass + "'></i>");

						}

						branch.addClass("branch");
						branch.on("click", function (e) {
							if (this == e.target) {
								var icon = $(this).children("i:first");
								icon.toggleClass(openedClass + " " + closedClass);
								$(this).children().children().toggle();
							}
						});
						branch.children().children().toggle();
					});
				//fire event from the dynamically added icon
				tree.find(".branch .indicator").each(function () {
					$(this).on("click", function () {
						$(this).closest("li").click();
					});
				});
				//fire event to open branch if the li contains an anchor instead of text
				tree.find(".branch>a").each(function () {
					$(this).on("click", function (e) {
						$(this).closest("li").click();
						e.preventDefault();
					});
				});
				//fire event to open branch if the li contains a button instead of text
				tree.find(".branch>button").each(function () {
					$(this).on("click", function (e) {
						$(this).closest("li").click();
						e.preventDefault();
					});
				});
			},
		});

		//Initialization of treeviews

		$("#treeview1").treed();

		$("#treeview2").treed();

		$("#treeview3").treed();

		$("#tree1").treed();

		$("#tree2").treed({
			openedClass: "si si-folder-alt",
			closedClass: "si si-folder",
		});

		$("#tree3").treed({
			openedClass: "si si-arrow-right-circle",
			closedClass: "si si-arrow-down-circle",
		});
	};
	React.useEffect(() => {
		console.log("use effect")
		treeViewInit();
	}, [ResultSuperMenus]);
	const updateSuperMenus = (m) => {
		let dummyclone = [...dummyResul];
		dummyclone.push("");
		setdummyResul(dummyclone);
		console.log("menus list data", m)
		const CheckMenu = rawMainMenu.findIndex(i => i.id === m.id);
		if (CheckMenu > -1) {

		} else {

			console.log(m)
			var obj = {
				superMenuId: m.id ? m.id : m.superMenuId,
				storeId: m.storeId,
				name: m.name,
				isAvailable: m.isAvailable,
				menus: m.menus
			}
			setSuperMenus(obj)
			setRawMainMenu(m.menus)
		}


	}
	const superMenusUpdate = (value) => {
		const cloneValue = superMenus;
		cloneValue.name = value;
		setSuperMenus(cloneValue)


		console.log("cloneValue", cloneValue)

	}
	const handleUpdateSuperMenus = () => {
		console.log(superMenus);
		var resp = superMenus;
		console.log("berfore Supermenus", rawMainMenu);
		resp.menus = rawMainMenu
		setSuperMenus(resp);
		console.log("SuperMenus", superMenus);

		console.log(superMenus)
		const resultMenusClone = [...ResultSuperMenus];

		const checkIndex = resultMenusClone.findIndex(i => i.id === superMenus.superMenuId || i.superMenuId === superMenus.superMenuId);
		if (checkIndex > -1) {
			console.log("zain")
			resultMenusClone[checkIndex] = superMenus;
			setdummyResul([])
			setResultSuperMenus(resultMenusClone);
			treeViewInit();
			setRawMainMenu([]);

		}

	}
	const handleClick = ()=>{
		let cloneResultMenus = [...ResultSuperMenus];
		var obj = {
			name:superMenus,
			menus:rawMainMenu
		}
		setResultSuperMenus([...cloneResultMenus,obj]);
		setRawMainMenu([]);
		setSuperMenus("");
	}
	// console.log("updateMenus",updateMenus);
	// console.log("rawMenus",rawMainMenu);
	console.log("dumy", dummyResul)
	console.log("result Menus", ResultSuperMenus)
	console.log("raw Menus", rawMainMenu);
	return (
		<>
			<LoadingOverlay active={loading} spinner text="Loading...">
				<div>
{
	MenuStatus && Object.keys(MenuStatus).length > 0 && MenuStatus.isSuccess ? <ModalComponent />:<ModalComponent />
}

					<div className="container card py-4 mt-4">
						{
							dummyResul.length > 0 ?
								<div className="main-content-body">


									<div class="form-group" >
										<label htmlFor="uname">Super Menu</label>
										<input
											type="text"
											class="form-control"
											id="uname"
											placeholder="Super Menu"
											value={superMenus.name}
											name="uname"
											onChange={(e) => {
												superMenusUpdate(e.target.value)
												restError();
											}}
										/>
									</div>



									{rawMainMenu && rawMainMenu.length > 0 ? (
										<React.Fragment>
											{rawMainMenu.map((rm, idx) => {
												return (
													<React.Fragment key={idx}>
														<div class="form-group pl-2" key={idx}>
															<div class="input-group">
																<input
																	type="text"
																	class="form-control"
																	id="uname"
																	placeholder="Main Menu"
																	value={rm.name}
																	name="uname"
																	onChange={(e) => {
																		setRawMainMenuValue(idx, e.target.value, rm);
																		restError();
																	}}
																/>
																{rawMainMenu.length > 0 &&
																	rawMainMenu.length - 1 == idx ? (
																		<React.Fragment>
																			<div
																				class="input-group-prepend"
																				onClick={() => removeMainMenu(idx)}
																			>
																				<div class="input-group-text">-</div>
																			</div>
																			<div
																				class="input-group-prepend"
																				onClick={() => addMainMenu()}
																			>
																				<div class="input-group-text">+</div>
																			</div>
																		</React.Fragment>
																	) : (
																		<div
																			class="input-group-prepend"
																			onClick={() => removeMainMenu(idx)}
																		>
																			<div class="input-group-text">-</div>
																		</div>
																	)}
															</div>
														</div>
														{rm.subMenus && rm.subMenus.length > 0 ? (
															<div class="form-group">
																{/* <label htmlFor="uname">Sub Menu</label> */}
																{rm.subMenus.map((m, index) => {
																	return (
																		<div class="input-group mb-2 pl-4" key={index}>
																			<input
																				type="text"
																				class="form-control"
																				id={`submenu${index}`}
																				placeholder="Enter sub menu"
																				value={m.name}
																				name={`submenu${index}`}
																				key={index}
																				onChange={(e) =>
																					setRawSubMenuValue(
																						idx,
																						index,
																						e.target.value,
																						m
																					)
																				}
																			/>
																			{index === rm.subMenus.length - 1 ? (
																				<React.Fragment>
																					<div
																						class="input-group-prepend"
																						onClick={() =>
																							removeSubMenu(idx, index)
																						}
																					>
																						<div class="input-group-text">-</div>
																					</div>
																					<div
																						class="input-group-prepend"
																						onClick={() => addSubMenu(idx)}
																					>
																						<div class="input-group-text">+</div>
																					</div>
																				</React.Fragment>
																			) : (
																					<div
																						class="input-group-prepend"
																						onClick={() => removeSubMenu(idx, index)}
																					>
																						<div class="input-group-text">-</div>
																					</div>
																				)}
																		</div>
																	);
																})}
															</div>
														) : (
																""
															)}
														{rm.subMenus && rm.subMenus.length === 0 ? (
															<div
																className="addsub-menu text-right"
																onClick={() => addSubMenu(idx)}
															>
																+ sub menu
															</div>
														) : (
																""
															)}
													</React.Fragment>
												);
											})}
										</React.Fragment>
									) : (
											""
										)}

									{rawMainMenu && rawMainMenu.length === 0 ? (
										<div className="add-sub-menu text-right" onClick={addMainMenu}>
											+ menu
										</div>
									) : (
											""
										)}
									{errorFor === "superMenus" && errorMsg !== "" ? (
										<div className="alert alert-danger">{errorMsg}</div>
									) : (
											""
										)}
									<div className="text-center">
										<button
											class="btn btn-outline-dark mx-1"
											onClick={() => handleUpdateSuperMenus()}
										>
											Add Menu
								</button>
										
									</div>

									{/* </form> */}
									<hr />
								</div>
								: 
								<div className="main-content-body">


								<div class="form-group" >
									<label htmlFor="uname">Super Menu</label>
									<input
										type="text"
										class="form-control"
										id="uname"
										placeholder="Super Menu"
										value={superMenus.name ? "" :superMenus}
										name="uname"
										onChange={(e) => {
											setSuperMenus(e.target.value)
											restError();
										}}
									/>
								</div>



								{rawMainMenu && rawMainMenu.length > 0 ? (
									<React.Fragment>
										{rawMainMenu.map((rm, idx) => {
											return (
												<React.Fragment key={idx}>
													<div class="form-group pl-2" key={idx}>
														<div class="input-group">
															<input
																type="text"
																class="form-control"
																id="uname"
																placeholder="Main Menu"
																value={rm.name}
																name="uname"
																onChange={(e) => {
																	setRawMainMenuValue(idx, e.target.value, rm);
																	restError();
																}}
															/>
															{rawMainMenu.length > 0 &&
																rawMainMenu.length - 1 == idx ? (
																	<React.Fragment>
																		<div
																			class="input-group-prepend"
																			onClick={() => removeMainMenu(idx)}
																		>
																			<div class="input-group-text">-</div>
																		</div>
																		<div
																			class="input-group-prepend"
																			onClick={() => addMainMenu()}
																		>
																			<div class="input-group-text">+</div>
																		</div>
																	</React.Fragment>
																) : (
																	<div
																		class="input-group-prepend"
																		onClick={() => removeMainMenu(idx)}
																	>
																		<div class="input-group-text">-</div>
																	</div>
																)}
														</div>
													</div>
													{rm.subMenus && rm.subMenus.length > 0 ? (
														<div class="form-group">
															{/* <label htmlFor="uname">Sub Menu</label> */}
															{rm.subMenus.map((m, index) => {
																return (
																	<div class="input-group mb-2 pl-4" key={index}>
																		<input
																			type="text"
																			class="form-control"
																			id={`submenu${index}`}
																			placeholder="Enter sub menu"
																			value={m.name}
																			name={`submenu${index}`}
																			key={index}
																			onChange={(e) =>
																				setRawSubMenuValue(
																					idx,
																					index,
																					e.target.value,
																					m
																				)
																			}
																		/>
																		{index === rm.subMenus.length - 1 ? (
																			<React.Fragment>
																				<div
																					class="input-group-prepend"
																					onClick={() =>
																						removeSubMenu(idx, index)
																					}
																				>
																					<div class="input-group-text">-</div>
																				</div>
																				<div
																					class="input-group-prepend"
																					onClick={() => addSubMenu(idx)}
																				>
																					<div class="input-group-text">+</div>
																				</div>
																			</React.Fragment>
																		) : (
																				<div
																					class="input-group-prepend"
																					onClick={() => removeSubMenu(idx, index)}
																				>
																					<div class="input-group-text">-</div>
																				</div>
																			)}
																	</div>
																);
															})}
														</div>
													) : (
															""
														)}
													{rm.subMenus && rm.subMenus.length === 0 ? (
														<div
															className="addsub-menu text-right"
															onClick={() => addSubMenu(idx)}
														>
															+ sub menu
														</div>
													) : (
															""
														)}
												</React.Fragment>
											);
										})}
									</React.Fragment>
								) : (
										""
									)}

								{rawMainMenu && rawMainMenu.length === 0 ? (
									<div className="add-sub-menu text-right" onClick={addMainMenu}>
										+ menu
									</div>
								) : (
										""
									)}
								{errorFor === "superMenus" && errorMsg !== "" ? (
									<div className="alert alert-danger">{errorMsg}</div>
								) : (
										""
									)}
								<div className="text-center">
									<button
										class="btn btn-outline-dark mx-1"
										onClick={() => handleClick()}
									>
										Add Menu
							</button>
									
								</div>

								{/* </form> */}
								<hr />
							</div>
					
						}
					</div>




					<ul id="treeview1">
						{ResultSuperMenus && ResultSuperMenus.length
							? ResultSuperMenus.map((m, idx) => {
								return (
									<li key={idx}>
										<a href="#" className="d-flex justify-content-between">
											{m.name}
											<span class='fas fa-edit mr-2' onClick={() => updateSuperMenus(m)}></span>

										</a>
										{m.menus && m.menus.length > 0
											? m.menus.map((sm, index) => {
												if (sm.name === "") {
													{
														return sm.subMenus && sm.subMenus.length > 0 ? (
															<ul>

																{sm.subMenus.map((smm, i) => {
																	return <li key={i}>{smm.name}</li>;
																})}
															</ul>
														) : (
																""
															);
													}
												} else {
													return (
														<ul key={index}>
															<li>
																{sm.name}


																{sm.subMenus && sm.subMenus.length > 0 ? (
																	<ul>
																		{sm.subMenus.map((smm, i) => {
																			return <li key={i}>
																				{smm.name}


																			</li>;
																		})}
																	</ul>
																) : (
																		""
																	)}
															</li>
														</ul>
													);
												}
											})
											: ""}
									</li>
								);
							})
							: ""}
							<button
											onClick={(e) => {
												restError();
												handleSubmit(e);
											}}
											class="btn btn-outline-dark"
										>
											Update Menus
								</button>
					</ul>
				</div>
			</LoadingOverlay>
		</>
	);
}