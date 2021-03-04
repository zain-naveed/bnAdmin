import React, { useState, useEffect } from "react";
import TopMenu from "../topMenue";
import { getStoreUserId } from "../../services/superAdminService/getStoreUserIdService";
import { getProductbyid } from "../../services/storeAdminService/getStroreProductbyId";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../cookies/cookies";
import { Modal } from "react-bootstrap";
import { Row, Container, Col, Card, Form, InputGroup } from "react-bootstrap";
import { updateProduct } from "../../services/storeAdminService/updateStoreProductService";
import { updateStoreAdminProductAction } from "../../action/storeAdminAction/updateStoreAdminAction";
import LoadingOverlay from "react-loading-overlay";
function EditProduct() {
	const [selectImage, setSelectedImage] = useState("");
	const [menus, setMenus] = useState([]);
	const [result, setResult] = useState([]);
	const [subMenu, setSubMenu] = useState([]);
	const [product, setProduct] = useState({});
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [ammount, setAmmount] = useState("");
	const [stock, setStock] = useState(0);
	const [discount, setDiscount] = useState("");
	const [errorFor, setError] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const getstorewithId = useSelector((state) => state.GetStoreUserId);
	const getSingleProduct = useSelector(
		(state) => state.getSingleProductbyStoreAdmin
	);
	const updateStatus = useSelector((state) => state.updateProductStoreAdmin);
	const param = useParams();

	// let dispatch = useDispatch();
	let { id } = param;
	const getStoreId = getCookie("profile");
	useEffect(() => {
		dispatch(getStoreUserId(getStoreId.storeId));
		dispatch(getProductbyid(id));
	}, []);
	console.log(getstorewithId)
	if (
		getstorewithId &&
		Object.keys(getstorewithId).length > 0 &&
		getstorewithId.data &&
		getstorewithId.data.menus &&
		getstorewithId.data.menus.length > 0 &&
		menus.length === 0
	) {
		setMenus(getstorewithId.data.menus);
	}

	if (
		getSingleProduct &&
		Object.keys(getSingleProduct).length > 0 &&
		Object.keys(product).length === 0
	) {
		setProduct(getSingleProduct.data);
		setName(getSingleProduct.data.name);
		setDescription(getSingleProduct.data.description);
		setStock(getSingleProduct.data.stock);
		setAmmount(getSingleProduct.data.price);
		setDiscount(getSingleProduct.data.discountPrice);
	}

	var imageArray = [
		"data:image/jpeg;base64,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",
		"data:image/jpeg;base64,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",
		"data:image/jpeg;base64,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",
		"data:image/jpeg;base64,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",
	];
	const addProductWidthMenus = (id, e, indx) => {
		// setIndex(indx);
		const clone = [...menus];
		const menuIndex = clone.findIndex((i) => i.id === id);
		var addMenu = clone[menuIndex];

		if (e.target.checked) {
			const resul = {
				productId: id,
				Menu: {
					id: addMenu.id,
					name: addMenu.name,
					storeId: addMenu.storeId,
					subMenu: subMenu,
				},
			};
			setResult([...result, resul]);
		} else {
			var del = result.findIndex((index) => index.productId === id);
			result.splice(del, 1);
		}
	};
	// console.log(result);
	const handleSubMenu = (id, obj, e) => {
		setSubMenu(obj);
		let cloneResult = [...result];
		// let subValue = [...subMenu];
		console.log(cloneResult);
		const checkindex = cloneResult.findIndex((i) => i.Menu.id === id);

		console.log(subMenu);
		if (e.target.checked && checkindex > -1) {
			console.log("submenu");

			cloneResult[checkindex].Menu.subMenu.push(obj);
			// console.log(cloneResult[checkindex].Menu.subMenu);
			setResult(cloneResult);
			// console.log(cloneResult)
			// setResult(cloneResult);
		} else if (checkindex === -1) {
			alert("please select first Menu");
		} else {
			console.log("sub menu");
			const subValue = [...subMenu];
			const subindex = cloneResult[checkindex].Menu.subMenu.findIndex(
				(i) => i.id === obj.id
			);

			setSubMenu(subValue);

			// cloneResult[checkindex].subMenu = subMenu;
			setResult(cloneResult);
		}
	};
	if (
		updateStatus &&
		Object.keys(updateStatus).length > 0 &&
		updateStatus.isSuccess &&
		updateStatus.apiCall === "Get Single Product by Admin" &&
		show &&
		loading
	) {
		setLoading(false);
		setTimeout(() => {
			setShow(false);
			updateStoreAdminProductAction({});
		}, 3000);
	}
	console.log(subMenu);
	// const handleChange = (id) => {
	//     const clone = [...menus];

	//     const checkindx = clone.findIndex(i => i.id === id);
	//     clone[checkindx].checked = false;
	//     setMenus(clone);
	//     console.log(checkindx)
	// }
	// console.log(product.images.length);
	const validation = () => {
		if (name === "") {
			setError("name");
			setErrorMsg("Name is required");
			return false;
		} else if (description === "") {
			setError("description");
			setErrorMsg("Description is required");
			return false;
		} else if (stock === "") {
			setError("stock");
			setErrorMsg("stock is required");
			return false;
		} else if (ammount === "") {
			setError("ammount");
			setErrorMsg("ammount is required");
			return false;
		} else if (discount === "") {
			setError("discount");
			setErrorMsg("Discount is required");
			return false;
		} else {
			return true;
		}
	};
	const resSetError = () => {
		setError("");
		setErrorMsg("");
	};
	const submitForm = (e) => {
		e.preventDefault();
		const valid = validation();
		console.log(valid);
		if (valid) {
			dispatch(
				updateProduct({ id, name, description, ammount, discount, stock })
			);
			setShow(true);
			setLoading(true);
		}
	};
	const renderPhotos = () => {
		return (
			<>
				<Col sm={2} xs={2} lg={2} xl={2} className="text-right">
					{product && product.images && product.images.length > 0
						? product.images.map((images, indx) => {
								return (
									<div key={indx} className="my-2">
										<img
											src={images.thumbnail}
											onClick={() => setSelectedImage(images.thumbnail)}
											style={{
												cursor: "pointer",
												height: "5.8rem",
												width: "6rem",
											}}
										/>
									</div>
								);
						  })
						: ""}
				</Col>
				<Col sm={5} xs={5} lg={5} xl={5}>
					<img
						src={selectImage ? selectImage : imageArray[0]}
						className="img-responsive"
						style={{ width: "50rem", height: "25rem" }}
					/>
				</Col>
				<Col
					sm={3}
					xs={3}
					lg={3}
					xl={3}
					className="d-flex align-items-center justify-content-start"
				>
					<div>
						<label style={{ fontSize: "1.2rem" }}>Colors:</label>
						<div>
							{product && product.colors && product.colors.length > 0
								? product.colors.map((color, indx) => {
										return (
											<div
												className="mx-1"
												style={{
													backgroundColor: `${color}`,
													height: "35px",
													width: "35px",
													borderRadius: "100%",
													display: "inline-block",
												}}
											></div>
										);
								  })
								: ""}
						</div>
						<label style={{ fontSize: "1.2rem" }}>Sizes</label>
						<div>
							{product && product.sizes && product.sizes.length > 0
								? product.sizes.map((size, indx) => {
										return (
											<div
												key={indx}
												class="check pl-1"
												style={{ color: "black" }}
											>
												{size}
											</div>
										);
								  })
								: ""}
						</div>
						{/* <div>
                           <div style={{ backgroundColor: "green", height: "35px", width: "35px", borderRadius: "100%", display: "inline-block" }}></div>
                        </div> */}
					</div>
				</Col>
			</>
		);
	};
	const renderForm = () => {
		return (
			<>
				<Col sm={12}>
					<Form className="card card-body" onSubmit={submitForm}>
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
			</>
		);
	};

	const handleSubmit = () => {
		console.log(result);
	};
	const handleClose = () => setShow(false);
	const ModalComponent = () => {
		// console.log(updateStatus.message);
		return (
			<>
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Body className="text-secondary text-center">
						{updateStatus.message}
					</Modal.Body>
				</Modal>
			</>
		);
	};
	return (
		<>
			<LoadingOverlay active={loading} spinner text="Loading...">
				{updateStatus &&
				Object.keys(updateStatus).length > 0 &&
				updateStatus.isSuccess &&
				show ? (
					<ModalComponent />
				) : updateStatus &&
				  Object.keys(updateStatus).length > 0 &&
				  !updateStatus.isSuccess &&
				  show ? (
					<ModalComponent />
				) : (
					""
				)}
				<div className="main-content singlemenu">
					<TopMenu />
					<Container fluid={true} className="mt-4">
						<Card>
							<Card.Body>
								<Row>
									<Col sm={8}>
										<Row>{renderPhotos()}</Row>
										<Row>
											{renderForm()}
											{/* <button onClick={handleSubmit}>Update</button> */}
										</Row>
									</Col>
									<Col sm={4}>
										<h3 className="text-white">Please Select Menu's</h3>
										<div id="accordion">
											{menus.map((resp, indx) => {
												return (
													<>
														<div
															key={indx}
															data-toggle="collapse"
															id="headingOne"
															data-target={`#Menu${indx}`}
															aria-expanded="false"
															aria-controls="collapseOne"
														>
															<label
																for={resp.id}
																className="form-control d-flex align-items-center mt-3"
																style={{ cursor: "pointer" }}
															>
																<input
																	type="checkbox"
																	id={resp.id}
																	onChange={(e) =>
																		addProductWidthMenus(resp.id, e, indx)
																	}
																	className="check"
																	style={{ marginTop: "0" }}
																/>
																<label for={resp.id} className="ml-2 mt-2">
																	{resp.name}
																</label>
															</label>
														</div>

														{resp.subMenus && resp.subMenus.length > 0
															? resp.subMenus.map((rsp, subindx) => {
																	return (
																		<div
																			id={`Menu${indx}`}
																			class="collapse"
																			aria-labelledby="headingOne"
																			data-parent="#accordion"
																		>
																			<div
																				class="form-control ml-4"
																				style={{ width: "24rem" }}
																			>
																				{/* <input type="radio" name="check" /> */}
																				<input
																					type="checkbox"
																					className="check"
																					onClick={(e) =>
																						handleSubMenu(resp.id, rsp, e)
																					}
																				/>
																				<label className="mt-2 ml-1">
																					{rsp.name}
																				</label>
																			</div>
																		</div>
																	);
															  })
															: ""}
													</>
												);
											})}
										</div>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Container>
				</div>
			</LoadingOverlay>
		</>
	);
}
export default EditProduct;
