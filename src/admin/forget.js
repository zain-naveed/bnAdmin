import React, { useEffect, useState } from "react";
// import { UserLogin } from "../action/userLogin";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotService } from "../services/superAdminService/forgotService";

function Forget() {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	// const res = useSelector((state) => state.profile);
	// const apiStatus = useSelector((state) => state.apiCallStatus);
	// debugger;
	// if (apiStatus && Object.keys(apiStatus).length > 0) {
	// 	if (!apiStatus.isSuccess) {
	// 		alert(apiStatus.message);
	// 	}
	// }
	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(forgotService({email}));
	};

	return (
		<>
			<div className="row">
				<div
					className="col-7"
					style={{
						height: "100vh",
						backgroundImage:
							"url(https://images.pexels.com/photos/4855424/pexels-photo-4855424.jpeg?cs=srgb&dl=pexels-cottonbro-4855424.jpg&fm=jpg)",
						backgroundSize: "cover",
						backgroundPosition: "center center",
					}}
				></div>
				<div className="col-5" style={{ backgroundColor: "#171B25" }}>
					<div class="login d-flex align-items-center py-2">
						<div class="container p-0">
							<div class="row">
								<div class="col-md-10 col-lg-10 col-xl-9 mx-auto">
									<div class="card-sigin">
										<div class="main-signup-header">
											<h2 className="text-white">BN College</h2>
                                            <h4 className="text-white">Forget Password</h4>

											<form onSubmit={handleSubmit}>
												<div class="form-group">
													<label>Email</label>
													<input
														class="form-control"
														placeholder="Enter your email"
														type="email"
														onChange={(e) => setEmail(e.target.value)}
													/>
												</div>
												{/* <div class="form-group">
													<label>Password</label>{" "}
													<input
														class="form-control"
														placeholder="Enter your password"
														type="password"
														onChange={(e) => setPassword(e.target.value)}
													/>
												</div> */}
												<div class="mt-3">
													<button
														class="btn btn-main-primary btn-block py-2"
														type="submit"
													>
														Submit
													</button>
												</div>
											</form>
										</div>
										{/* <div class="main-signin-footer mt-5">
											<p>
												<Link to="/forget" className="text-white">
													Forgot password?
													</Link>
											</p>
										</div> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Forget;
