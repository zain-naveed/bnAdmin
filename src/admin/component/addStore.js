import React from 'react';
import TopMenu from '../topMenue';
import ParentComp from './Multi_Step_Form/parentCompnent';
function AddStore(props){
	console.log(props)
    console.log("Users")
    return <>
    <div className="main-content singlemenu">
				<TopMenu user="Add Store" />
				
				<div className="container-fluid">
					<div className="main-content-body">
						
						<ParentComp props={props} />
					
					</div>
				
				</div>
			</div>
    </>
}
export default AddStore;