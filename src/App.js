import React from "react";
import Main1 from "./main";
import { getCookie } from "./cookies/cookies";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentUserProfile } from "./action/userLogin";
import "react-sortable-tree/style.css";

function App(props) {
	const profile = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	if (getCookie("profile") && Object.keys(profile).length === 0) {
		dispatch(currentUserProfile(getCookie("profile")));
	}
	return (
		<>
			<Router>
				<Main1 />
			</Router>
		</>
	);
}
export default App;
