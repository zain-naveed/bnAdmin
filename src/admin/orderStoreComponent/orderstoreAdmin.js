import React, { useEffect } from "react";
import TopMenu from "../topMenue";
import $ from "jquery";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { OrderDetailStoreService } from "../../services/storeAdminService/orderDetailStoreAdminId";
import { useDispatch, useSelector } from "react-redux";
$.DataTable = DataTable;
export default function OrderStoreAdmin() {
	const [isApiCall, setIsApiCall] = React.useState(false);
	const orders = useSelector((store) => store.orderDetailStoreAdminId);
	const dispatch = useDispatch();
	useEffect(() => {
		$(document).ready(function () {
			$("#example").DataTable({
				retrieve: true,
				paging: true,
			});
		});

		if (!isApiCall) {
			setIsApiCall(true);

			dispatch(OrderDetailStoreService());
		}
	}, [isApiCall]);
	return (
		<div className="main-content singlemenu">
			<TopMenu user="Order" />

			<div class="main-content horizontal-content">
				<div class="container">
					<div class="main-content-body">
						<div class="row row-sm">
							<div class="col-xl-12">
								<div class="card mg-b-20">
									<div class="card-body">
										<div class="table-responsive">
											{orders &&
											orders.isSuccess &&
											orders.data &&
											orders.data.length > 0 ? (
												<table
													id="example"
													class="table key-buttons text-md-nowrap"
												>
													<thead>
														<tr>
															<th class="border-bottom-0">Name</th>
															<th class="border-bottom-0">Email</th>
															<th class="border-bottom-0">Products Name</th>
															<th class="border-bottom-0">Size</th>
															<th class="border-bottom-0">Color</th>
															<th class="border-bottom-0">Per Item</th>
															<th class="border-bottom-0">Quantity</th>
															<th class="border-bottom-0">Price</th>
															<th class="border-bottom-0">Address</th>
															<th class="border-bottom-0">Country</th>
															<th class="border-bottom-0">Status</th>
														</tr>
													</thead>
													<tbody>
														{orders.data.map((o, idx) => {
															return (
																<tr key={idx}>
																	<td>
																		{o.orderPlacer &&
																		Object.keys(o.orderPlacer).length > 0
																			? o.orderPlacer.firstName +
																			  " " +
																			  o.orderPlacer.lastName
																			: ""}
																	</td>
																	<td>
																		{o.orderPlacer &&
																		Object.keys(o.orderPlacer).length > 0
																			? o.orderPlacer.email
																			: ""}
																	</td>
																	<td>
																		{o.lineItems && o.lineItems.length > 0
																			? o.lineItems.map((i, index) => {
																					return i.name;
																			  })
																			: ""}
																	</td>
																	<td>
																		{o.lineItems && o.lineItems.length > 0
																			? o.lineItems.map((i, index) => {
																					return i.size;
																			  })
																			: ""}
																	</td>
																	<td>
																		{o.lineItems && o.lineItems.length > 0
																			? o.lineItems.map((i, index) => {
																					return (
																						<p
																							style={{
																								backgroundColor: i.color,
																								width: 25,
																								height: 25,
																								borderRadius: "50%",
																								// padding: "2px 12px",
																								// content: " ",
																							}}
																						></p>
																					);
																			  })
																			: ""}
																	</td>
																	<td>
																		{o.lineItems && o.lineItems.length > 0
																			? o.lineItems.map((i, index) => {
																					return i.price;
																			  })
																			: ""}
																	</td>
																	<td>
																		{o.lineItems && o.lineItems.length > 0
																			? o.lineItems.map((i, index) => {
																					return i.quantity;
																			  })
																			: ""}
																	</td>

																	<td>{o.totalAmount}</td>
																	<td>
																		{o.delivaryDetail &&
																		Object.keys(o.delivaryDetail).length > 0
																			? o.delivaryDetail.address
																			: ""}
																	</td>
																	<td>
																		{o.delivaryDetail &&
																		Object.keys(o.delivaryDetail).length > 0
																			? o.delivaryDetail.country
																			: ""}
																	</td>
																	<td>{o.status}</td>
																</tr>
															);
														})}
													</tbody>
												</table>
											) : (
												"No order received yet."
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
