import userEvent from "@testing-library/user-event";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { currentUserProfile } from "../action/userLogin";
import { deleteAllCookies, getCookie } from "../cookies/cookies";
import Text from "./component/text";
// import {Link} from 'react-router-dom';
function Sidebar(props) {
	const [userProfile, setUserProfile] = React.useState("");
	if (getCookie("profile") && userProfile === "") {
		console.log('getCookie("profile")', getCookie("profile"));
		setUserProfile(getCookie("profile"));
	}
	var z = getCookie("profile");
	// console.log(z);
	// const userProfile = useSelector((state) => state.profile);
	const dispatch = useDispatch();

	// if (userProfile && Object.keys(userProfile).length === 0) {
	// 	props.history.push("/");
	// }
	const logout = (e) => {
		e.preventDefault();
		deleteAllCookies();
		dispatch(currentUserProfile({}));
		window.location.href = "/";
	};
	console.log(props)
	return (
		<>
			<div className="app-sidebar__overlay" data-toggle="sidebar"></div>
			<aside className="app-sidebar sidebar-scroll">
				<div className="main-sidebar-header active">
					<Link className="desktop-logo logo-light active" to="/">
						{/* <img
							src="../assets/img/brand/logo.png"
							className="main-logo"
							alt="logo"
						/> */}
						
						<h4 className="text-secondary">Bn asdfasCollage</h4>
						
					</Link>
					<Link className="desktop-logo logo-dark active" to="/">
						{/* <h4>Bn Collage</h4> */}
						<Text text="BN College" />
						{/* <img
							src="../assets/img/brand/logo-white.png"
							className="main-logo dark-theme"
							alt="logo"
						/> */}
					</Link>
					<Link className="logo-icon mobile-logo icon-light active" to="/">
						<h4>Bn Collage</h4>
						{/* <img
							src="../assets/img/brand/favicon.png"
							className="logo-icon"
							alt="logo"
						/> */}
					</Link>
					<a
						className="logo-icon mobile-logo icon-dark active"
						href="index.html"
					>
						<img
							src="../assets/img/brand/favicon-white.png"
							className="logo-icon dark-theme"
							alt="logo"
						/>
					</a>
				</div>
				{userProfile && Object.keys(userProfile).length > 0 ? (
					<div className="main-sidemenu">
						<div className="app-sidebar__user clearfix">
							<div className="user-info">
								<div className="users-profile">
									<Link to="/profile">
									<span className="user-profile-img">
										<img loading="lazy"
											src={!z.profileImageURL ? "data:image/jpeg;base64,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"
										: 
										z.profileImageURL
									}
											alt="Profile image"
											className="brround avatar-xl"
										/>
									</span>
									</Link>
									<div className="green_icon"></div>
								</div>
								<div className="social-details mt-2">
									<h6 className="mb-0">{userProfile.firstName}</h6>
									<p className="mb-2 mt-1 text-muted tx-12">
										{userProfile.role}
									</p>
								</div>
							</div>
						</div>
						<ul className="side-menu">
							{userProfile && userProfile.role === "SuperAdmin" ? (
								<>
								<Link to="/Custom_Management">
									<li className="slide">
										<a className="side-menu__item" data-toggle="slide" href="#">
											<i className="side-menu__icon bx bx-home-circle"></i>
											<span className="side-menu__label"> Custom Store Managment</span>
										</a>
									</li>
									</Link>
									<Link to="/Inventory">
									<li className="slide">
										<a className="side-menu__item" data-toggle="slide" href="#">
											<i className="side-menu__icon bx bx-layer"></i>
											<span className="side-menu__label" >Inventory</span>
										</a>
									</li>
									</Link>
									<Link to="/order">
									<li className="slide">
										<a className="side-menu__item" data-toggle="slide" href="#">
											<i className="side-menu__icon bx bx-layer"></i>
											<span className="side-menu__label">
												Order
											</span>
										</a>
									</li>
									</Link>
									<Link to="/Request_Management">
									<li className="slide">
										<a className="side-menu__item" data-toggle="slide" href="#">
											<i className="side-menu__icon bx bx-layer"></i>
											<span className="side-menu__label">
												Request Managment
											</span>
										</a>
									</li>
									</Link>
									
									<li className="slide">
										<a
											className="side-menu__item"
											data-toggle="slide"
											onClick={(e) => logout(e)}
										>
											<i className="side-menu__icon  las la-sign-out-alt"></i>
											<span className="side-menu__label">Logout</span>
										</a>
									</li>
								</>
							) : 
							
							userProfile && userProfile.role === "StoreAdmin" ? (
								<>
								<Link to="/product">
									<li className="slide">
										<a className="side-menu__item" data-toggle="slide" href="#">
											<i className="side-menu__icon bx bx-home-circle"></i>
											<span className="side-menu__label"> Products</span>
										</a>
									</li>
									</Link>
									<Link to="/order">
									<li className="slide">
										<a className="side-menu__item" data-toggle="slide" href="#">
											<i className="side-menu__icon bx bx-layer"></i>
											<span className="side-menu__label" >Order</span>
										</a>
									</li>
									</Link>
									<Link to="/Offers">
									<li className="slide">
										<a className="side-menu__item" data-toggle="slide" href="#">
											<i className="side-menu__icon bx bx-layer"></i>
											<span className="side-menu__label">
												Offers
											</span>
										</a>
									</li>
									</Link>

									
									<li className="slide">
										<a
											className="side-menu__item"
											data-toggle="slide"
											onClick={(e) => logout(e)}
										>
											<i className="side-menu__icon  las la-sign-out-alt"></i>
											<span className="side-menu__label">Logout</span>
										</a>
									</li>
								</>
							) :""
							}
						</ul>
					</div>
				) : (
					""
				)}
			</aside>
		</>
	);
}
export default Sidebar;
