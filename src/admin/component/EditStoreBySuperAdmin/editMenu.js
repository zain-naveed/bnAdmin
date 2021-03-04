import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import { EditMenuService } from '../../../services/superAdminService/editMenusService';
import { editStoreMenusAction } from '../../../action/editStoreMenusAction';
import { useDispatch } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { Modal } from 'react-bootstrap';
import '../Multi_Step_Form/css/editMenu.css';
export default function EditMenu() {
    const individualStore = useSelector(state => state.GetStoreUserId);
    const [menusArray, setMenusArray] = useState([]);
    const [updateMenus, setupdateMenus] = useState([]);
    const [MenuStatus, setMenuStatus] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(-1);
    const [subMenus, setSubMenus] = useState([])

    //  individualStore.data.menus;

    const dispatch = useDispatch();
    const apiStatus = useSelector(state => state.editMenu);
    if (
        apiStatus &&
        Object.keys(apiStatus).length > 0 &&
        apiStatus.isSuccess &&
        loading
    ) {

        setLoading(false);
        setShow(true);
        setTimeout(() => {
            setShow(false);
            dispatch(
                editStoreMenusAction({})
            )
        }, 3000);
    }
    else
        if (
            apiStatus &&
            Object.keys(apiStatus).length > 0 &&
            !apiStatus.isSuccess &&
            loading
        ) {
            setLoading(false);
            setShow(true);
            setTimeout(() => {
                setShow(false);
                dispatch(
                    editStoreMenusAction({})
                )
            }, 3000);
        }

    if (individualStore &&
        individualStore.data.menus &&
        individualStore.data.menus.length > 0 && menusArray.length === 0
    ) {
        setMenusArray(individualStore.data.menus)
    }

    const handleMenus = (data) => {
        
        var selectMenus = [...updateMenus];
        var subvalue = selectMenus.findIndex(i=>i.menuId === data.id);
        if(subvalue > -1){
            // 1 dafa menu add ho jaye array main bar bar na ho add
        }else{
            
        var menusResult = {
            name: data.name,
            isAvailable: true,
            menuId: data.id
        }
        setupdateMenus([...updateMenus, menusResult]);
    }
       
    }
    // console.log(updateMenus)
    const changeTextMenu = (index, value, resul) => {
        // console.log(resul)
        const menuClone = [...updateMenus]
        var checkIndex = menuClone.findIndex(i=>i.menuId === resul.id);
        if(checkIndex > -1){
        //    return false
        menuClone[checkIndex] = {
            name: value,
            isAvailable: resul.isAvailable,
            menuId: resul.id
        };
        setupdateMenus(menuClone)
        console.log("adfja;")
    }else{
        console.log("lj;asdf")
        
    }
    }
    
    // console.log(updateMenus)
    const changeToggler = (ev, indx, result) => {
        // console.log(e.target.checked)
        console.log(ev)
        const menuClone = [...updateMenus];
        !MenuStatus ? setMenuStatus(true) : setMenuStatus(false)
        menuClone[indx] =
        {
            name: result.name,
            isAvailable: ev,
            menuId: result.menuId
        }
        setupdateMenus(menuClone);
    }
    const handleSubmitForm = (e) => {
        // e.preventDefault();
        const checkEmpty = [];
        console.log(updateMenus);
        updateMenus.forEach(data=>{
            if(data.name !== ""){
                checkEmpty.push(data);
            }
    })
        setLoading(true);
        dispatch(
            EditMenuService(checkEmpty)
        )

        console.log(checkEmpty)
    }
    // console.log(updateMenus);
    const handleInput = (indx) => {
        setIndex(indx)
    }
    const addSubfield = (id,indx) => {
        let subvalue = [...subMenus];
        // console.log("hello")
        let findCurrendIndex = subvalue.findIndex(i=>i === id)

        if(index === indx && findCurrendIndex === -1 && subvalue.length === 0){
        subvalue.push(id);
    
        setSubMenus(subvalue);
        }
        else if(index === indx && findCurrendIndex > -1 && subvalue.length > 0){
            subvalue.push(id);
    
            setSubMenus(subvalue); 
        }
        else if(index === indx && findCurrendIndex === -1 && subvalue.length > 0){
            subvalue.push(id);
    
            setSubMenus(subvalue); 
        }
    }
    const removeSubfield = (id , indx)=>{
        let subValue = [...subMenus];
        console.log(subValue)
        let del = subValue.findIndex(i=>i === id);
        if(del > -1 && index === indx){
            subValue.splice(del,1);
            setSubMenus(subValue);
        }
        

    }
    const handleClose = () => setShow(false);
    const ModalComponent = () => {
        // console.log(apiStatus.message);
        return (
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body className="text-secondary text-center">
                        {apiStatus.message}
                    </Modal.Body>
                </Modal>
            </>
        );
    };
    console.log(updateMenus)
    return (
        <>
            <LoadingOverlay active={loading} spinner text="Loading...">
                {
                    apiStatus && Object.keys(apiStatus).length > 0
                        && apiStatus.isSuccess && show
                        ? (
                            <ModalComponent />
                        ) :
                        apiStatus && Object.keys(apiStatus).length > 0
                            && !apiStatus.isSuccess && show ?
                            (
                                <ModalComponent />
                            ) : ""}
                <Container>

                    <Row className="mt-2">
                        <Col sm={6}>
                            {
                                menusArray.length > 0 ?

                                    menusArray.map((resp, indx) => {
                                        return <div>
                                        <div className="input-group py-2" key={indx}>
                                            <input type="text" className="form-focus form-control "
                                                defaultValue={resp.name} disabled={
                                                    index === indx ? false : true
                                                }
                                                style={{
                                                    border: `${index === indx ? "1px solid white" : ""
                                                        }`
                                                }}
                                                onChange={(e)=>changeTextMenu(index,e.target.value,resp)}
                                            />
                                            <div class="input-group-prepend" onClick={() => {
                                                handleInput(indx);
                                                handleMenus(resp);
                                            }} >
                                                <div class="input-group-text"><i class="far fa-edit"></i></div>
                                            </div>
                                            
                                            <div class="input-group-prepend"  disabled={
                                                index === indx ? false : true
                                            }  >
                                                <div class="input-group-text" onClick={()=>addSubfield(resp.id,indx)}>+</div>
                                            </div>
                                                
                                            {/* {
                                index[indx] === indx ?  
                                <div>
                                <input type="text" defaultValue={resp.name} className="form-control" />
                                <input type="text" className="ml-4 my-2 form-control" /> 
                                </div>
                                
                                :""
                            } */}
                                        </div>
                                        {
                                            index === indx && subMenus.length > 0 ? 
                                            subMenus.map((data,subindex)=>{
                                                return <>
                                                {
                                                    data === resp.id ? <div className="input-group ml-4 my-2" style={{width:"23.5rem"}}>
                                                    <input type="text" className="form-control"  />
                                                    <div class="input-group-prepend" onClick={()=>removeSubfield(resp.id,indx)} >
                                                        <div class="input-group-text" >-</div>
                                                    </div>
                                                </div> :""
                                                }
                                                </>
                                            
                                            })
                                            
                                            :""
                                        }
                                        
                                        </div>

                                    })

                                    // <form className="form" onSubmit={handleSubmitForm}>
                                    // <label htmlFor="menus">Update Menus</label>
                                    // {
                                    //     updateMenus.map((result,indx)=>{
                                    //      return   <div className="form-group" key={indx}>

                                    //         <input type="text" placeholder="Menus" defaultValue={result.name} onChange={(e)=>changeTextMenu(indx,e.target.value,result)} id="menus" className="form-control my-2" />
                                    //         <Switch onChange={(e)=>changeToggler(e,indx,result)}></Switch>
                                    //     </div>
                                    //     })
                                    // }


                                    // <button className="btn btn-outline-dark">Update</button>
                                    // </form>
                                    : ""
                            }
                            <button className="btn btn-outline-dark" onClick={handleSubmitForm}>Update</button>
                        </Col>
                        {/* <Col>
                    <div>
                    {
                        menusArray.map((resp,indx)=>{
                           return <div className="row" key={indx}>
                               <p className="form-control d-flex justify-content-between">{resp.name}<i class="far fa-edit"></i></p>
                            <input type="text" id={`${resp.name}`}  className="list-group list-group-items" onChange={(e)=>handleMenus(e,resp,resp.id)}    /> 
                        <label htmlFor={`${resp.name}`} className="mt-2 ml-2" >{resp.name}</label>
                            </div>

                        })
                    }
                    </div>
                    </Col> */}
                    </Row>
                </Container>
            </LoadingOverlay>
        </>
    )
}