import React,{useEffect,lazy,Suspense} from 'react';
import TopMenu from '../topMenue';
import {useDispatch} from 'react-redux';
import {listStoreService} from '../../services/superAdminService/listStoreService';
import ListGrid from './listgrid';
import ListStore from './listStore';
import './Multi_Step_Form/css/mult.css'

function CustomMana(){
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(
    //     listUserService())
	// });
	const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listStoreService())
    },[dispatch])
    return (
        <>
			<div className="main-content singlemenu">
				<TopMenu user="Custom Store Management" />
				
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
export default CustomMana;