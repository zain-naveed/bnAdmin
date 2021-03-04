import React, { useState, useEffect, Component } from "react";
// import SortableTree from "react-sortable-tree";
// import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import Text from "../text";
import { getCookie } from "../../../cookies/cookies";
import { addMenuService } from "../../../services/superAdminService/addMenuService";
import { useDispatch, useSelector } from "react-redux";
import { setApiCallsStatus } from "../../../action/apiCallsStatus";
import LoadingOverlay from "react-loading-overlay";
import { Modal } from "react-bootstrap";

function Form3({ handle2 }) {
	const [addMenu, setAddMenu] = useState([{ name: "" }]);
	const [rawMainMenu, setRawMainMenu] = useState([]);
	const [rawSubMenu, setRawSubMenu] = useState([]);
	const [treeData, setMult] = useState([]);
	const [addMenuName, setAddMenuName] = useState("");
	const [errorFor, setErrorFor] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [subMenus, setSubMenu] = useState([{ name: "" }]);
	const [ResultSuperMenus, setResultSuperMenus] = useState([]);
	const [superMenus, setSuperMenus] = useState("");
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const apiStatus = useSelector((state) => state.apiCallStatus);
	if (
		apiStatus &&
		Object.keys(apiStatus) &&
		apiStatus.isSuccess &&
		apiStatus.apiCall == "AddMenu" &&
		!show &&
		loading
	) {
		setTimeout(() => {
			setLoading(false);
		}, 500);
		setTimeout(() => {
			setShow(true);
		}, 500);

		// setTimeout(() => {

		// }, 1000);
		setTimeout(() => {
			dispatch(setApiCallsStatus({}));
			return handle2(4, "Add Product to Store");
		}, 2000);
	} else if (
		apiStatus &&
		Object.keys(apiStatus) &&
		!apiStatus.isSuccess &&
		apiStatus.apiCall === "AddMenu" &&
		!show &&
		loading
	) {
		// setShow(true)
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		setTimeout(() => {
			setShow(true);
		}, 1000);

		// alert(apiStatus.message);
		setTimeout(() => {
			dispatch(setApiCallsStatus({}));
			setShow(false);
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
		if (superMenus === "") {
			setErrorFor("superMenus");
			setErrorMsg("Super Menu is required.");
			return false;
		} else {
			return true;
		}
	};

	const handleMenu = () => {
		var value = validation();
		debugger;
		if (value) {
			window.jQuery.fn.treed = null;
			var store = getCookie("store");
			var id = store.id;
			var obj = {
				name: superMenus,
				storeId: id,
				menus: rawMainMenu,
			};
			let rsMenu = [...ResultSuperMenus];
			rsMenu.push(obj);
			setResultSuperMenus(rsMenu);
			setSuperMenus("");
			setRawMainMenu([]);
			setTimeout(() => {
				treeViewInit();
			}, 300);
			restError();
		}
	};
	const addSuperMenusFunc = () => {
		console.log("click");
		var store = getCookie("store");
		var id = store.id;
		var obj1 = {
			name: superMenus,
			storeId: id,
			menus: treeData,
		};
		console.log(addMenu);
		setResultSuperMenus([...ResultSuperMenus, obj1]);
		setSuperMenus("");
	};
	console.log(treeData);
	console.log(ResultSuperMenus);
	const resetMenu = (menu) => {
		console.log(menu);
	};
	const creatSubMenu = (value, index) => {
		let Subvalues = [...subMenus];
		Subvalues[index] = { name: value };
		setSubMenu(Subvalues);
	};
	const addRawMainMenu = () => {
		let Subvalues = [...rawMainMenu];
		Subvalues.push({ name: "" });
		setRawMainMenu(Subvalues);
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
	const setRawMainMenuValue = (index, value) => {
		let mainMenu = [...rawMainMenu];
		mainMenu[index].name = value;
		setRawMainMenu(mainMenu);
	};
	const setRawSubMenuValue = (pIndex, cIdx, value) => {
		debugger;
		restError();
		let mainMenu = [...rawMainMenu];
		mainMenu[pIndex].subMenus[cIdx].name = value;
		setRawMainMenu(mainMenu);
	};
	// console.log(tree)
	const handleSubmit = (e) => {
		e.preventDefault();

		if (treeData) {
			resetMenu();
			dispatch(addMenuService(ResultSuperMenus));
			setLoading(true);
		}
	};
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
	const addMenuFields = () => {
		let Subvalues = [...addMenu];
		Subvalues.push("");
		setAddMenu(Subvalues);
	};
	const delMenuFields = (idx) => {
		let Subvalues = [...addMenu];
		Subvalues.splice(idx, 1);
		setAddMenu(Subvalues);
	};
	const createMenus = (value, indx) => {
		let MenusClone = [...addMenu];
		MenusClone[indx] = { name: value };
		setAddMenu(MenusClone);
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
						console.log('branch.find("i")', branch.find("i"));
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
		// treeViewInit();
	}, []);
	return (
		<>
			<LoadingOverlay active={loading} spinner text="Loading...">
				<div>
					{apiStatus &&
					apiStatus.isSuccess &&
					apiStatus.apiCall == "AddMenu" ? (
						<>
							<ModalComponent />
						</>
					) : apiStatus &&
					  !apiStatus.isSuccess &&
					  Object.keys(apiStatus).length > 0 &&
					  apiStatus.apiCall == "AddMenu" ? (
						<>
							<ModalComponent />
						</>
					) : (
						""
					)}

					<div className="container card py-4 mt-4">
						<div className="main-content-body">
							<div class="form-group">
								<label htmlFor="uname">Super Menu</label>
								<input
									type="text"
									class="form-control"
									id="uname"
									placeholder="Super Menu"
									value={superMenus}
									name="uname"
									onChange={(e) => {
										setSuperMenus(e.target.value);
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
																setRawMainMenuValue(idx, e.target.value);
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
																				e.target.value
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
									onClick={() => handleMenu()}
								>
									Add Menu
								</button>
								<button
									onClick={(e) => {
										restError();
										handleSubmit(e);
									}}
									class="btn btn-outline-dark"
								>
									Next
								</button>
							</div>

							{/* </form> */}
							<hr />
						</div>
					</div>
					<ul id="treeview1">
						{ResultSuperMenus && ResultSuperMenus.length
							? ResultSuperMenus.map((m, idx) => {
									return (
										<li key={idx}>
											<a href="#">{m.name}</a>
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
																					return <li key={i}>{smm.name}</li>;
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
					</ul>
				</div>
			</LoadingOverlay>
		</>
	);
}

export default Form3;
