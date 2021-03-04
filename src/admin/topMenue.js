import { React } from "react";
import Text from './component/text';

import TopMenu1 from './component/topMenu1';
import {
	useRouteMatch,
	Switch,
	Route,
	Link
} from 'react-router-dom';
function TopMenu(props) {
	// let {path,url} = useRouteMatch();
	// console.log({path,url})
	// console.log(props)
	return (
		<>
		{
			props.user  === 'Custom Store Management' ? <>
	<TopMenu1 user={props.user} store_mange="custom manage" />
			
			</> : props.user === "Inventory" ? <>
			<TopMenu1 user={props.user} inventory="inventory"  />
			</>: 
			props.user === "Store" ?
			<>

			<TopMenu1 user={props.user} editStore="editStore" />
			</> 
			:
			props.user === "Products" ? 
			<>

<TopMenu1 user={props.user} offer="offer"  />
</>:<>

<TopMenu1 user={props.user}  />
</>
			
		
		}
		
		</>
	);
}
export default TopMenu;
