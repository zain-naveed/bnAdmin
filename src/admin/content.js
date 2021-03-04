import React from "react";
import TopMenu from "./topMenue";
import {useDispatch,useSelector} from 'react-redux';
import {DashboardService} from '../services/dashboardService';
function Content() {
	const dispatch = useDispatch();
	React.useEffect(()=>{
		dispatch(
			DashboardService()	
		)
	},[]);
	let dashbardStatus = useSelector(state => state.dashboard);
	console.log(dashbardStatus)
	return (
		<>
			<div className="main-content singlemenu">
				<TopMenu user="Dashboard" />
				{/* <!-- Mobile-header closed --> */}

				{/* <!-- Container-fluid --> */}
				<div className="container-fluid">
					{/* <!-- Main-content-body --> */}
					<div className="main-content-body">
						{/* <!-- header-title --> */}
						<div className="header-title">
							<div className="mb-0 mb-lg-0 mb-xl-0">
								<h4 className="mb-2 text-white">Dashboard</h4>
							</div>
						</div>
						{/* <!-- header-title --> */}

						{/* <!-- row opened --> */}
						<div className="row row-sm">
							{
				dashbardStatus		&& dashbardStatus.isSuccess &&	dashbardStatus.data &&	Object.keys(dashbardStatus.data).length > 0 ?
				Object.keys(dashbardStatus.data).map((dasData,indx)=>{
					return 			<div className="col-md-6 col-lg-6 col-xl-3">
					<div className="ecommerce-card">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between">
									<h4 className="card-title mg-b-15">{
								
									dasData
									}</h4>
								</div>
								<div className="row mb-3">
									{/* <div className="col-md-4 col col-sm-4 col-xs-4">
										<div className="ht-50 wd-50 bg-primary-transparent brround text-center">
										</div>
									</div> */}
									<div className="col-md-12 col col-sm-12 col-xs-12 my-auto">
										<div className="float-center text-center tx-50 font-weight-bold my-auto">
											
											{
												dasData === "totalEarning" ? <>
												 <span className="tx-50">$</span>{dashbardStatus.data[dasData]}
												 </>:
												 <>
												{dashbardStatus.data[dasData]}
												</>
											}
											
											<i className=""></i>
										</div>
									</div>
								</div>
								{/* <div className="d-flex month">
									<h5 className="float-left font-weight-normal text-muted tx-13">
										This Month
									</h5>
									<span className="dash-line"></span>
									<h5 className="tx-13 float-right ml-auto">240</h5>
								</div>
								<div className="clearfix"></div>
								<div className="d-flex lastmonth">
									<h5 className="mb-0 float-left font-weight-normal text-muted tx-13">
										Last Month
									</h5>
									<span className="dash-line"></span>
									<h5 className=" mb-0 tx-13 float-right ml-auto">3%</h5>
								</div>
							 */}
							</div>
						</div>
					</div>
				</div>
		
				})
								
						: dashbardStatus && Object.keys(dashbardStatus).length > 0 &&  !dashbardStatus.isSuccess ? dashbardStatus.message:
						"Loading"	

							}
							{/* <div className="col-md-6 col-lg-6 col-xl-3">
								<div className=" ecommerce-card">
									<div className="card">
										<div className="card-body">
											<div className="card-heading">
												<div className="d-flex justify-content-between">
													<h4 className="card-title mg-b-15">Total Profit</h4>
												</div>
											</div>
											<div className="row mb-3">
												<div className="col-md-4 col col-sm-4 col-xs-4">
													<div className="ht-50 wd-50 bg-pink-transparent brround text-center">
													</div>
												</div>
												<div className="col-md-8 col col-sm-8 col-xs-8 my-auto">
													<div className="float-right text-right tx-20 font-weight-bold">
														<span className="tx-20 ">$</span>7,560
														<i className=""></i>
													</div>
												</div>
											</div>
											<div className="d-flex month">
												<h5 className="float-left font-weight-normal text-muted tx-13">
													This Month
												</h5>
												<span className="dash-line"></span>
												<h5 className="tx-13 float-right ml-auto">320</h5>
											</div>
											<div className="clearfix"></div>
											<div className="d-flex lastmonth">
												<h5 className="mb-0 float-left font-weight-normal text-muted tx-13">
													Last Month
												</h5>
												<span className="dash-line"></span>
												<h5 className=" mb-0 tx-13 float-right ml-auto">7%</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6 col-lg-6 col-xl-3">
								<div className=" ecommerce-card">
									<div className="card">
										<div className="card-body">
											<div className="d-flex justify-content-between">
												<h4 className="card-title mg-b-15">Total Sales</h4>
											</div>
											<div className="row mb-3">
												<div className="col-md-4 col col-sm-4 col-xs-4">
													<div className="ht-50 wd-50 bg-success-transparent brround text-center">
												</div>
												</div>
												<div className="col-md-8 col col-sm-8 col-xs-8 my-auto">
													<div className="float-right text-right tx-20 font-weight-bold my-auto">
														<span className="tx-20">$</span>53,186
														<i className=""></i>
													</div>
												</div>
											</div>
											<div className="d-flex month">
												<h5 className="float-left font-weight-normal text-muted tx-13">
													This Month
												</h5>
												<span className="dash-line"></span>
												<h5 className="tx-13 float-right ml-auto">240</h5>
											</div>
											<div className="clearfix"></div>
											<div className="d-flex lastmonth">
												<h5 className="mb-0 float-left font-weight-normal text-muted tx-13">
													Last Month
												</h5>
												<span className="dash-line"></span>
												<h5 className=" mb-0 tx-13 float-right ml-auto">3%</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
								<div className="col-md-6 col-lg-6 col-xl-3"> 
								<div className=" ecommerce-card">
									<div className="card">
										<div className="card-body">
											<div className="card-heading">
												<div className="d-flex justify-content-between">
													<h4 className="card-title mg-b-15">Total Revenue</h4>
												</div>
											</div>
											<div className="row mb-3">
												<div className="col-md-4 col col-sm-4 col-xs-4">
													<div className="ht-50 wd-50 bg-warning-transparent brround text-center">
													</div>
												</div>
												<div className="col-md-8 col col-sm-8 col-xs-8 my-auto">
													<div className="float-right text-right tx-20 font-weight-bold">
														<span className="tx-20 ">$</span>7,560
														<i className=""></i>
													</div>
												</div>
											</div>
											<div className="d-flex month">
												<h5 className="float-left font-weight-normal text-muted tx-13">
													This Month
												</h5>
												<span className="dash-line"></span>
												<h5 className="tx-13 float-right ml-auto">320</h5>
											</div>
											<div className="clearfix"></div>
											<div className="d-flex lastmonth">
												<h5 className="mb-0 float-left font-weight-normal text-muted tx-13">
													Last Month
												</h5>
												<span className="dash-line"></span>
												<h5 className=" mb-0 tx-13 float-right ml-auto">7%</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
					
							
							
							*/}
						







						</div>
						{/* <!-- row closed --> */}

						{/* <!-- row opened --> */}
						{/* <div className="row row-sm">
							<div className="col-xl-4 col-lg-12">
								<div className="card">
									<div className="card-body pt-3">
										<div className=" align-items-center">
											<div className="text-center">
												<div className="description">
													<div className="title mb-1 pb-0 text-center">
														<span className="tx-22 font-weight-semibold text-primary">
															Congratulations!
														</span>
													</div>
													<span className="tx-14 mb-3 ">
														For your achievement of this month
													</span>
													<div className="my-auto text-center">
													</div>
													<div className="text-center mt-3">
														<span className="text-muted">
															Your hardwork has paid off! We appreciate your
															efforts and wish to see you achieving more
															milestones!
														</span>
													</div>
												</div>
												<div className="">
													<a href="#" className="btn btn-outline-primary  mt-3">
														View more
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-12 col-lg-12 col-xl-8">
								<div className="card">
									<div className="card-body">
										<div className="d-flex justify-content-between">
											<h4 className="card-title mg-b-10">Client Retention</h4>
										</div>
										<p className="tx-12 tx-gray-500 mb-3">
											Customer retention is the collection of activities a
											business uses to increase the number of repeat customers
											and to increase the profitability of each existing
											customer{" "}
											<a href="#" className="text-primary ml-1">
												Learn more
											</a>
										</p>
										<div className=" row row-xs">
											<div className="col-4">
												<h5 className="mb-0 tx-20 font-weight-bold">38,098</h5>
												<div className="tx-13 text-muted">New Clients</div>
											</div>
											<div className="col-4">
												<h5 className="mb-0 tx-20 font-weight-bold">65,213</h5>
												<div className="tx-13 text-muted">Retained</div>
											</div>
											<div className="col-4">
												<h5 className="mb-0 tx-20 font-weight-bold">657,213</h5>
												<div className="tx-13 text-muted">Total clients</div>
											</div>
										</div>
										<div className="">
											<div className="summary chart-legend">
												<div>
													<div className="legend bg-primary mt-0"></div> New
													Clients
												</div>
												<div>
													<div className="legend bg-pink mt-0 ml-3"></div>
													Retained Clients
												</div>
											</div>
											<div id="summary-chart" className=""></div>
										</div>
									</div>
								</div>
							</div>
						</div> */}
						{/* <!-- row closed --> */}

						{/* <!-- row opened --> */}
						{/* <div className="row row-sm row-deck">
							<div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
								<div className="card overflow-hidden">
									<div className="card-header bg-transparent pd-b-0 pd-t-20 bd-b-0">
										<div className="d-flex justify-content-between">
											<h4 className="card-title mg-b-10">Overall Rating</h4>
										</div>
										<p className="tx-12 tx-gray-500 mb-0">
											Opinion of a customer on the product in the form of
											ratings 5-star rating.{" "}
											<a href="#" className="text-primary ml-1">
												Learn more
											</a>
										</p>
									</div>
									<div className="card-body pt-2">
										<div className="mb-0">
											<div className="d-flex align-items-end mg-b-5">
												<h1 className="mb-0">4.6</h1>
												<div className="text-warning mg-l-5">
													<i className="bx bx-star active"></i>
													<i className="bx bx-star active"></i>
													<i className="bx bx-star active"></i>
													<i className="bx bx-star active"></i>
													<i className="bx bx-star"></i>
												</div>
											</div>
											<h6 className="tx-uppercase tx-semibold tx-10 mb-0">
												Overall product rating by the customers.
											</h6>
										</div>
										<table className="table table-borderless mt-3 rating-table mb-2">
											<tbody>
												<tr>
													<td className="">
														<small className="mr-1">1</small>
													</td>
													<td className="">
														<span>
															<i className="bx bx-star tx-18 text-warning"></i>
														</span>
													</td>
													<td className="w-100">
														<div className="progress mt-2 ht-5">
															<div
																aria-valuemax="100"
																aria-valuemin="0"
																aria-valuenow="80"
																className="progress-bar wd-20p bg-danger"
																role="progressbar"
															></div>
														</div>
													</td>
													<td className="">
														<small className="font-weight-bold">7</small>
													</td>
												</tr>
												<tr>
													<td className="text-gray">
														<small className="mr-1">2</small>
													</td>
													<td className="text-gray">
														<span>
															<i className="bx bx-star tx-18 text-warning"></i>
														</span>
													</td>
													<td className="w-100">
														<div className="progress mt-2 ht-5">
															<div
																aria-valuemax="100"
																aria-valuemin="0"
																aria-valuenow="80"
																className="progress-bar wd-30p bg-primary"
																role="progressbar"
															></div>
														</div>
													</td>
													<td className="">
														<small className="font-weight-bold">27</small>
													</td>
												</tr>
												<tr>
													<td className="text-gray">
														<small className="mr-1">3</small>
													</td>
													<td className="text-gray">
														<span>
															<i className="bx bx-star tx-18 text-warning"></i>
														</span>
													</td>
													<td className="w-100">
														<div className="progress mt-2 ht-5">
															<div
																aria-valuemax="100"
																aria-valuemin="0"
																aria-valuenow="80"
																className="progress-bar wd-60p bg-warning"
																role="progressbar"
															></div>
														</div>
													</td>
													<td className="">
														<small className="font-weight-bold">64</small>
													</td>
												</tr>
												<tr>
													<td className="text-gray">
														<small className="mr-1">4</small>
													</td>
													<td className="text-gray">
														<span>
															<i className="bx bx-star tx-18 text-warning"></i>
														</span>
													</td>
													<td className="w-100">
														<div className="progress mt-2 ht-5">
															<div
																aria-valuemax="100"
																aria-valuemin="0"
																aria-valuenow="80"
																className="progress-bar wd-70p bg-teal"
																role="progressbar"
															></div>
														</div>
													</td>
													<td className="">
														<small className="font-weight-bold">93</small>
													</td>
												</tr>
												<tr>
													<td className="text-gray">
														<small className="mr-1">5</small>
													</td>
													<td className="text-gray">
														<span>
															<i className="bx bx-star tx-18 text-warning"></i>
														</span>
													</td>
													<td className="w-100">
														<div className="progress mt-2 ht-5">
															<div
																aria-valuemax="100"
																aria-valuemin="0"
																aria-valuenow="80"
																className="progress-bar wd-80p bg-success"
																role="progressbar"
															></div>
														</div>
													</td>
													<td className="">
														<small className="font-weight-bold">82</small>
													</td>
												</tr>
											</tbody>
										</table>
										<div className="wrapper d-flex justify-content-center image-group pb-0 pt-1">
											
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
								<div className="card order-list">
									<div className="card-body">
										<div className="d-flex justify-content-between">
											<h4 className="card-title mg-b-10">Order Activity</h4>
										</div>
										<p className="tx-12 tx-gray-500 mb-3">
											Order Activity is ecommerce platforms to track the orders
											placed on their stores{" "}
											<a href="#" className="text-primary ml-1">
												Learn more
											</a>
										</p>
										<ul className="list list-noborders pb-0 mb-0">
											<li className="list-item">
												<div className=" ml-3">
													<h6 className="mb-1 font-weight-medium">
														Lottie Arnold
													</h6>
													<p className="mb-0 text-muted tx-13">#PRD-10250</p>
												</div>
												
											</li>
											<li className="list-item">
												<div className=" ml-3">
													<h6 className="mb-1 font-weight-medium">
														Alan Macedo
													</h6>
													<p className="mb-0 tx-13 text-muted">#PRD-10251</p>
												</div>
												<div className="ml-auto d-flex">
												
												</div>
											</li>
											<li className="list-item">
												<div className=" ml-3">
													<h6 className="mb-1 font-weight-medium">
														Bruce Tran
													</h6>
													<p className="mb-0 text-muted tx-13">#PRD-10252</p>
												</div>
												<div className="ml-auto d-flex">
													
												</div>
											</li>
											<li className="list-item">
												<div className=" ml-3">
													<h6 className="mb-1 font-weight-medium">
														Mina Harper
													</h6>
													<p className="mb-0 text-muted tx-13">#PRD-10253</p>
												</div>
												<div className="ml-auto d-flex">
												
												</div>
											</li>
											<li className="list-item pb-0 mb-0">
												<div className=" ml-3">
													<h6 className="mb-1 font-weight-medium">
														Maria Quinn
													</h6>
													<p className="mb-0 text-muted tx-13">#PRD-10254</p>
												</div>
												<div className="ml-auto d-flex">
													
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
								<div className="card traffic-resource">
									<div className="card-body pb-3">
										<div className="">
											<div className="d-flex justify-content-between">
												<h4 className="card-title mg-b-10">
													Traffic resources
												</h4>
											</div>
											<p className="tx-12 tx-gray-500 mb-1">
												Website traffic refers to web users who visit a website.
												Web traffic is measured in visits
												<a href="#" className="text-primary ml-1">
													Learn more
												</a>
											</p>
										</div>
										<div className="table-responsive  mb-0 pb-0">
											<table className="table table-hover mb-0 pb-0">
												<tbody>
													<tr>
														<td>
															<h6>Unique visitors</h6>
														</td>
														<td>
															<span className="f-18 text-muted">3,475</span>
														</td>
														<td className="text-right">
															<span id="unique-visitors">
																2,3,6,8,4,6,5,9,6
															</span>
														</td>
													</tr>
													<tr>
														<td>
															<h6>Bounce rate</h6>
														</td>
														<td>
															<span className="f-18 text-muted">56%</span>
														</td>
														<td className="text-right">
															<span id="bounce-rate">4,7,3,12,8,5,7,8,3</span>
														</td>
													</tr>
													<tr>
														<td>
															<h6>Page/visit</h6>
														</td>
														<td>
															<span className="f-18 text-muted">5,147</span>
														</td>
														<td className="text-right">
															<span id="visit">2,6,3,8,10,5,8,11,4</span>
														</td>
													</tr>
													<tr>
														<td>
															<h6>Pageviews</h6>
														</td>
														<td>
															<span className="f-18 text-muted">365</span>
														</td>
														<td className="text-right">
															<span id="page-views">4,6,2,7,5,2,6,12,9</span>
														</td>
													</tr>
													<tr>
														<td>
															<h6>Unique visitors</h6>
														</td>
														<td>
															<span className="f-18 text-muted">5,736</span>
														</td>
														<td className="text-right">
															<span id="session">5,3,6,0,8,11,6,4,2</span>
														</td>
													</tr>
													<tr>
														<td className="">
															<h6>Visit</h6>
														</td>
														<td className="">
															<span className="f-18 text-muted">657</span>
														</td>
														<td className="text-right">
															<span id="total-visit">6,3,8,1,6,3,7,5,9</span>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div> */}
						{/* <!-- row closed --> */}

						{/* <!-- row opened --> */}
						{/* <div className="row row-sm row-deck">
							<div className="col-md-12 col-xl-6 col-lg-6">
								<div className="card">
									<div className="card-body">
										<h4 className="card-title mg-b-10">Product Status</h4>
										<p className="tx-12 tx-gray-500 mb-4">
											Order statuses can help you decide what actions need to be
											taken for a particular order, such as the order need to be
											packaged or shipped.{" "}
											<a href="#" className="text-primary ml-1">
												Learn more
											</a>
										</p>
										<div className="row">
											<div className="col-md-6">
												<div className="wd-100p ht-200" id="flotPie"></div>
											</div>
											<div className="col-md-5 col-lg-6">
												<div className="mb-3">
													<p className="mb-2">
														Completed
														<span className="float-right text-muted">39%</span>
													</p>
													<div className="progress  ht-5 mt-2">
														<div
															aria-valuemax="100"
															aria-valuemin="0"
															aria-valuenow="80"
															className="progress-bar wd-90p bg-primary"
															role="progressbar"
														></div>
													</div>
												</div>
												<div className="mb-3">
													<p className="mb-2">
														Pending
														<span className="float-right text-muted">20%</span>
													</p>
													<div className="progress  ht-5 mt-2">
														<div
															aria-valuemax="100"
															aria-valuemin="0"
															aria-valuenow="80"
															className="progress-bar wd-70p bg-teal"
															role="progressbar"
														></div>
													</div>
												</div>
												<div className="mb-3">
													<p className="mb-2">
														Out Standing
														<span className="float-right text-muted">15%</span>
													</p>
													<div className="progress  ht-5 mt-2">
														<div
															aria-valuemax="100"
															aria-valuemin="0"
															aria-valuenow="80"
															className="progress-bar wd-30p bg-pink"
															role="progressbar"
														></div>
													</div>
												</div>
												<div className="mb-0">
													<p className="mb-2">
														Started
														<span className="float-right text-muted">26%</span>
													</p>
													<div className="progress  ht-5 mt-2">
														<div
															aria-valuemax="100"
															aria-valuemin="0"
															aria-valuenow="80"
															className="progress-bar wd-50p bg-purple"
															role="progressbar"
														></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
								<div className="card overflow-hidden ">
									<div className="card-body">
										<div className="">
											<h4 className="card-title mg-b-10">Annual Report</h4>
											<p className="tx-12 tx-gray-500 mb-4">
												Sales reports include data on sales volume, ongoing
												opportunities, new accounts, revenue, and customer
												acquisition costs{" "}
												<a href="#" className="text-primary ml-1">
													Learn more
												</a>
											</p>
										</div>
										<div className="card-block-big fees-card">
											<div className="row">
												<div className="col-sm-4">
													<ul className="list-unstyled mb-0">
														<li>
															<div className="legend bg-primary"></div>
															<div className="legend-content">
																<p className="mb-0 tx-16 font-weight-bold">
																	$5,634
																</p>
																<span className="text-muted text-nowrap tx-13">
																	Sales Report
																</span>
															</div>
														</li>
														<li>
															<div className="legend bg-pink"></div>
															<div className="legend-content">
																<p className="mb-0 tx-16 font-weight-bold">
																	$2,355
																</p>
																<span className="text-muted text-nowrap tx-13">
																	Annual Revenue
																</span>
															</div>
														</li>
														<li className="">
															<div className="legend bg-warning"></div>
															<div className="legend-content">
																<p className="mb-0 tx-16 font-weight-bold">
																	$4,516
																</p>
																<span className="text-muted text-nowrap tx-13">
																	Total Profit
																</span>
															</div>
														</li>
													</ul>
												</div>
												<div className="col-sm-8">
													<div className="">
														<canvas id="ecom-chart"></canvas>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */}
						{/* <!-- row closed --> */}

						{/* <!-- row opened --> */}
						{/* <div className="row row-sm row-deck">
							<div className="col-xl-8 col-lg-12 col-md-12 col-sm-12">
								<div className="card top-selling-product">
									<div className="card-body">
										<div className="">
											<div className="d-flex justify-content-between">
												<h4 className="card-title mg-b-10">
													Top Selling Product
												</h4>
											</div>
											<p className="tx-12 tx-gray-500 mb-3">
												The products which are extremely popular and sell in
												larger quanitites than others .Products that are most in
												demand has the top sales .Number of items sold by
												category , by month{" "}
												<a href="#" className="text-primary ml-1">
													Learn more
												</a>
											</p>
										</div>
										<div className="table-responsive mb-0">
											<table className="table table-hover table-dashboard-two table-bordered mb-0">
												<thead>
													<tr>
														<th>Product</th>
														<th>Product Code</th>
														<th>Customer</th>
														<th>Status</th>
														<th>Rating</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="font-weight-semibold">#PRD001</td>
														<td>Arnold@gmail.com</td>
														<td>
															<div className="badge badge-danger">
																Out Stock
															</div>
														</td>
														<td>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-default"></i>
															</a>
														</td>
													</tr>
													<tr>
														<td className="font-weight-semibold">#PRD002</td>
														<td>Alan_Macedo@gmail.com</td>
														<td>
															<div className="badge badge-success">
																In Stock
															</div>
														</td>
														<td>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-default"></i>
															</a>
														</td>
													</tr>
													<tr>
														<td className="font-weight-semibold">#PRD003</td>
														<td>Maria_Quinn@gmail.com</td>
														<td>
															<div className="badge badge-danger">
																Out Stock
															</div>
														</td>
														<td>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-default"></i>
															</a>
														</td>
													</tr>
													<tr>
														<td className="font-weight-semibold">#PRD004</td>
														<td>Petey@gmail.com</td>
														<td>
															<div className="badge badge-success">
																In Stock
															</div>
														</td>
														<td>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-default"></i>
															</a>
														</td>
													</tr>
													<tr>
														<td className="font-weight-semibold">#PRD005</td>
														<td>Anna_Mull@gmail.com</td>
														<td>
															<div className="badge badge-success">
																In Stock
															</div>
														</td>
														<td>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-default"></i>
															</a>
														</td>
													</tr>
													<tr>
														<td className="font-weight-semibold">#PRD006</td>
														<td>Paige_Turner@gmail.com</td>
														<td>
															<div className="badge badge-danger">
																Out Stock
															</div>
														</td>
														<td>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-warning"></i>
															</a>
															<a href="#!">
																<i className="fe fe-star tx-15 text-default"></i>
															</a>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
								<div className="card">
									<div className="card-header pt-3 pb-2 mb-0">
										<div className="d-flex justify-content-between">
											<h4 className="card-title  mt-1 mg-b-10">
												ACTIVITY STREAM
											</h4>
										</div>
										<p className="tx-12 tx-gray-500 mb-1">
											Activity streams means to syndicate updates about a user
											or a group of users within a social network.{" "}
											<a href="#" className="text-primary ml-1">
												Learn more
											</a>
										</p>
									</div>
									<div className="card-body pt-0">
										<div className="main-media-list-activity">
											<div className="media">
												<div className="media-icon bg-success-transparent">
													<i className="typcn typcn-tick-outline text-success"></i>
												</div>
												<div className="media-body">
													<h6>Successful Purchase</h6>
													<span>Product ID: #0102</span>
												</div>
												<div className="media-right">2 hours</div>
											</div>
											<div className="media">
												<div className="media-icon bg-primary-transparent">
													<i className="typcn typcn-shopping-cart text-primary"></i>
												</div>
												<div className="media-body">
													<h6>Order Verification</h6>
													<span>Product ID: #2200</span>
												</div>
												<div className="media-right">3 hours</div>
											</div>
											<div className="media">
												<div className="media-icon bg-purple-transparent">
													<i className="typcn typcn-arrow-forward-outline text-purple"></i>
												</div>
												<div className="media-body">
													<h6>Orders For Shipment</h6>
													<span>Cleared By: Agent#20</span>
												</div>
												<div className="media-right">5 hours</div>
											</div>
											<div className="media">
												<div className="media-icon bg-danger-transparent">
													<i className="typcn typcn-times-outline text-danger"></i>
												</div>
												<div className="media-body">
													<h6>Purchase Cancellation</h6>
													<span>Product ID: #0102</span>
												</div>
												<div className="media-right">6 hours</div>
											</div>
											<div className="media">
												<div className="media-icon bg-warning-transparent">
													<i className="typcn typcn-tick-outline text-warning"></i>
												</div>
												<div className="media-body">
													<h6>Overdue Shipments</h6>
													<span>Reminder from: Agent#30</span>
												</div>
												<div className="media-right">18 hours</div>
											</div>
											<div className="media">
												<div className="media-icon bg-info-transparent">
													<i className="typcn typcn-times-outline text-info"></i>
												</div>
												<div className="media-body">
													<h6>New Item Added</h6>
													<span>Department: Wearables</span>
												</div>
												<div className="media-right">Yesterday</div>
											</div>
											<div className="media">
												<div className="media-icon bg-orange-transparent">
													<i className="typcn typcn-times-outline text-orange"></i>
												</div>
												<div className="media-body">
													<h6>New Registered Seller</h6>
													<span>Seller Name: Socrates</span>
												</div>
												<div className="media-right">3 days</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */}
						{/* <!-- /row --> */}
					</div>
					{/* <!-- Main-content-body closed --> */}
				</div>

				{/* <!-- Container-fluid closed --> */}
			</div>
		</>
	);
}
export default Content;
