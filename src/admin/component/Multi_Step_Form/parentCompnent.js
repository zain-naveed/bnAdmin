import React,{useState} from 'react';
import MulitStep from './multiStep';
import {Container,Row,Col} from 'react-bootstrap';
import './css/custom.css'
function ParentComp(props){
    const [currIndex,setCurrndex] = useState("");
    const [textIndex,settextIndex] = useState("");
    const [complet,setComplete] = useState([]);
    const form = ["Add Custom Store","Add Store Admin",
                   "Add Store Menus","Add Product to Store"     
];
    const [value, setValue] = useState(1);
    const handleParentIndex = (index,txt) => {
        console.log(txt)
		setValue(index);
        setCurrndex(index)
        settextIndex(txt)
        setComplete([...complet,txt]);
    };
    return <Container>
    <Row className="d-flex justify-content-between">
        <Col className="mt-4 col-12 col-lg-4" >
            {
                console.log(complet)
            }
        <div class="div p-4">
            {
             form.map((data,key)=>{
                    return <div key={key} className="list-group">
                        {
                            value == currIndex && complet[key]  ?
                            <div className="list-group-item list1 completed"> <i className="fa fa-check-circle text-success px-2" aria-hidden="true"></i>
                            {data}
                            </div>
                         :<div className={`text-secondary list1 list-group-item ${ value == (key+1) ? "acitve-stepper":"" }`}  > <i class="fa fa-circle text-secondary px-2" aria-hidden="true"></i>
                         {data}
                            
                         </div>
                        
                        }
                        
                         </div>
                })
            }
            <div>
                <span></span>
            </div>
</div>
       </Col>
        <Col className="col-12 col-lg-8">
        <MulitStep parentIndex={handleParentIndex} props={props}  index={value} />
        </Col>
    </Row>
    </Container>
}
export default ParentComp;