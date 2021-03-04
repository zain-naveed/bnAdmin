import React,{useState} from 'react';
import {useSelector} from 'react-redux';
export default function ViewMenu(){
    const individualStore = useSelector(state=>state.GetStoreUserId);
    const [viewMenus,setMenus] = useState([]);
    console.log(individualStore);
    var getMenus = [];
    if(
        individualStore &&
        individualStore.data &&
        individualStore.data.menus &&
        viewMenus.length === 0
        ){
            console.log("zain")
            individualStore.data.menus.forEach(data=>{
                console.log(data)
                getMenus.push(data);
                setMenus(getMenus);
            })
        }

        console.log(viewMenus);
    return (
        <div className="mt-3">

{
    viewMenus.length > 0 ? <div id="accordion">
  {
      viewMenus.map((resp,inde)=>{
return <>
<div className="row ml-2">
<div class="form-control mt-2 col-5" id="headingOne">
    
      <h6 class="mb-0 text-secondary pt-1" style={{cursor:"pointer"}} data-toggle="collapse" data-target={`#menu${inde}`} aria-expanded="false" aria-controls={`collapse${inde}`}>
      
        {
            resp.name
        }
     
      </h6>
    </div>
    </div>  
    {
        resp.subMenus.length > 0 ? resp.subMenus.map((subdata,subindex)=>{
        return <div id={`menu${inde}`} key={subindex} class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <p className="form-control col-5 pl-4 ml-4 text-secondary mt-3" style={{width:"21.5rem"}}>
                      {
                       subdata.name ?   subdata.name :""
                      }
    </p>
    </div>
        }):""
    }
    
  

</>

      })
  }
   
</div>


 :""
}






        {/* {
            viewMenus.length > 0 ? viewMenus.map((response,indx)=>{
              return <div key={indx} className="row" >
                  <p className="form-control col-5 pl-4">
                      {
                          response.name
                      }
                  </p>
              </div>
            }) :""
        } */}
        </div>
    );
}