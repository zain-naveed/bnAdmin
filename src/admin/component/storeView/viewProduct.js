import React,{useState} from 'react';
import { Row, Col } from 'react-bootstrap';
export default function ViewProductStore() {
    const [rawData,setRaw] = useState([]);
    const image = ["http://placehold.it/290x195","http://placehold.it/290x195","http://placehold.it/290x195","http://placehold.it/290x195"];
    const handleCheck = (e)=>{
        var val = {
            name: "zain"
        }
        if(e.target.checked){
            setRaw([...rawData,val])
        }else{
            rawData.splice(0,1);
        }
    }
    console.log(rawData)
    return (
        <>

        <Row className="mt-3">
            {
                image.map((resp,indx)=>{
                   return <Col className="col-12 col-lg-4 col-xl-4">
                    <label htmlFor={indx} >
                        <div class=" card" >
    
                            <div className="hovereffect text-center">
                                <img class="img-thumbnail" style={{ height: "15rem", width: "500rem" }} loading="lazy" src={
                                     "http://placehold.it/290x195"
                                } alt="" />
                                <div class="overlay">
                                    <input type="checkbox" id={indx} onChange={(e)=>handleCheck(e)}  className="check"/>
    
                                </div>
                            </div>
    
                        </div>
                    </label>
    
                </Col>
                })
            }
           
        </Row>
        </>
    );
}