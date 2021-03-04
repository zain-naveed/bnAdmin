import React,{useState,useEffect} from 'react';
import image from '../../../Supporting-Student-Mental-Health_Aug20.jpg';
import {useSelector} from 'react-redux';

export default function EditHeaderBackground({setlogoimage,setHeader}) {
    const [background,Setbackground] = useState("");
    const [logo,SetLogo] = useState("");
    const individualStore = useSelector(state => state.GetStoreUserId);
   
    useEffect(()=>{
        Setbackground(individualStore.data.cover);
        SetLogo(individualStore.data.logo);
    },[])
    // console.log(Logos);
    const handleFiles = (e) => {
        console.log("files")
        var files = e.target.files[0];
        // setFile(files);
      
        console.log(files)
        if(files){
            
            SetLogo(URL.createObjectURL(files));
            return setlogoimage(files);
            // return storeImage(URL.createObjectURL(files))
          
            
        }else{
            console.log("else part")
        }
        // setImgStatus(true);
        // setLogoimgBoolean(true);
    };
    const handleHeader = (e) => {
        var file = e.target.files[0];
        console.log(file);
        // setHeaderfile(file);
        // var imageUrl = URL.createObjectURL(file);
            if(file){
                Setbackground(URL.createObjectURL(file));
                return setHeader(file);
            }else{
                console.log("else part")
            }
       
    };
    return (
        <>


            <input type="file" id="headerfile1" style={{display:"none"}} onChange={(e)=>handleHeader(e)} />

            <input type="file" id="logofile" style={{display:"none"}} onChange={e=>handleFiles(e)} />
            <div class="row row-sm">
                
                    <div class="col-12 grid-margin">
                        <div class="profile-header" style={{ border: " 1px solid rgba(242, 244, 249, 0.1)" }}>
                        <div className="co text-center">
                    <div class="co-overlay"style={{zIndex:"1"}} ></div>
                            <div class="cover" style={{ position: "relative", borderRadius: "10px 10px 0 0 ",}}>
                                <div className="img-fluid wd-100p profile-cover-image" style={{
                                    height: "22rem", backgroundImage: `url(${background})`,
                                    backgroundSize: "cover", backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    width:"100vw"

                                }}></div>
                                <div class="co-details fadeIn-bottom" style={{zIndex:"100"}}>
                                    <div style={{ zIndex: "200" }}>
                                        <label htmlFor="headerfile1">
                                            <i className="fas fa-upload text-white" style={{ fontSize: "40px", zIndex: '1000000' }}></i>
                                        </label>
                                    </div>
                                </div>


                            </div>


                            </div>


                            <div class="cover-body row " style={{ position: "absolute", bottom: "5px", zIndex: "100" }}>
                            <div className="co text-center">
                   
                                <div class="col-xl-6 col-md-12 ml-4" style={{backgroundImage:`url(${logo})`,backgroundSize:"cover",backgroundRepeat:"no-repeat",borderRadius:"100%",maxWidth:"5rem",minWidth:"5rem",maxHeight:"5rem", minHeight:"5rem",
                            border: "5px solid #a3acc7", boxShadow: "2px 0 10px 3px rgba(126, 130, 136, 0.5)"
                            }}>
                                


                                <div class="co-overlay" style={{zIndex:"1",borderRadius:"100%"}} ></div>
                    <div class="co-details fadeIn-bottom" style={{zIndex:"100"}}>
                                    <div style={{ zIndex: "200" }}>
                                        <label htmlFor="logofile" >
                                            <i className="fas fa-upload text-white" style={{ fontSize: "40px", zIndex: '1000000' }}></i>
                                        </label>
                                    </div>
                                </div>
                                    
                                </div>
                         
                         </div>
                            </div>

                            
                        </div>

                    </div>
                
            </div>






        </>
    )
}