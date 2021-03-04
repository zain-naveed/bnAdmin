import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import {Switch} from 'antd';
import 'antd/dist/antd.css';


function ListGrid(){
    const list = useSelector(state=>state.list)
    const {isSuccess,data} = list;
    const [toggle,setToggle] = useState(true);
    const handleToggle = ()=>{
        !toggle ? setToggle(true) : setToggle(false)
        console.log(toggle)
    }
    console.log(isSuccess)

    return <>
    <div className="container-fluid">
        <div className="row">
            
            {
                !isSuccess ?  <GridData result={data} eventoggle={handleToggle} /> : "Loading..."
            }
            
        </div>
    </div>
    </>
}
const GridData = (props)=>{
    return <>
    {
        props.result ? <>
        {
            props.result.map((data,index)=>{
                return <div key={index} className="col-md-12 bg-light py-3 px-4 mt-3">
                            <div className="row">
                                <div className="col-3">
                                    <div className="grid">
                            <label>Institute Name: </label>
                            <label className="px-2 text-secondary">{data.instituteName}</label>
                            </div>
                            <div className="grid ">
                            <label>Phone:</label>
                                <label className="px-2 text-secondary">
                                    
                                {
                                    data.phoneNo
                                }
                                </label>
                                </div>
                                
                                
                            </div>
                            <div className="col-3 text-center">
                            <div className="grid">
                            <label className="">First Name:</label>
                                <label className="px-2 text-secondary">
                                {
                                    data.firstName
                                }
                                </label>
                                </div>
                                <div className="grid">
                            <label>Last Name:</label>
                                <label className="px-2 text-secondary">
                                {
                                    data.lastName
                                }
                                </label>
                                </div>
                            </div>
                          
                            
                            <div className="col-3  d-flex align-items-center justify-content-center" >
                                <button className="btn btn-secondary px-3" onClick={()=>{console.log(data._id)}}>
                                <i className="fas fa-eye"></i>
                               
                                </button>
                            </div>
                            <div className="col-3 d-flex align-items-center ">
                                <Switch  onClick={props.eventoggle}  ></Switch>
                                
                            </div>
                            </div>

                     </div>
            })
        }
       
        
        </> :  <div className="col-12 py-4 bg-light" >
                                Loading...
                            </div>
    }
    
    </>
}
export default ListGrid;