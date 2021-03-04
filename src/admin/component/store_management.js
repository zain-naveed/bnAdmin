import React, { useEffect } from 'react';
import TopMenu from '../topMenue';
import {listStoreService} from '../../services/superAdminService/listStoreService';
import {useDispatch} from 'react-redux';
import ListStore from './listStore';
function Store_Management(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listStoreService())
    })
    return (
        <>
			<div className="main-content singlemenu">
				<TopMenu user="Store Management" />
				
				<div className="container-fluid">
					<div className="main-content-body">
						
						{/* <ListGrid /> */}
					<ListStore />
					</div>
				
				</div>
			</div>
		</>
    )
}
export default Store_Management;