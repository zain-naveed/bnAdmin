import React, { useEffect, useState } from "react";
import Login from "./admin/login";
import Main from "./admin/main";
import store from "./redux/store";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Forget from "./admin/forget";
function Main1() {
	const [name, setName] = useState({});

	const profile = useSelector((state) => state.profile);
	useEffect(() => {
		document.body.style.backgroundColor = name ? "#1A1F2A" : "white";
		document.body.style.color = name ? "#FFFFFF" : "black";
	}, []);

	if (
		profile &&
		Object.keys(profile).length > 0 &&
		profile.role === "SuperAdmin"
	) {
		var na =  <Main />;
	}
	else if (
		profile &&
		Object.keys(profile).length > 0 &&
		profile.role === "StoreAdmin"
	) {
		var na =  <Main />;
	}
	 else {
		na = <Switch> <Route exact={true} path="/" component={Login} />;
		<Route path="/forget" component={Forget} ></Route>
		</Switch>
	}
	return (
		<>
			<Switch>{na}</Switch>
		</>
	);
}
export default Main1;