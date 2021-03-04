import React,{ useEffect} from 'react';
import {useSelector} from 'react-redux';
import Content from './content';
import Sidebar from './sidebar';
import CustomMana from './component/custom_management';
import AddUser from './component/addStore';
import RequestManage from './component/request_Manage';
import {Route,Switch} from 'react-router-dom';
import Profile from './component/profile';
import Store_Management from './component/store_management';
import GetstoreAdminSuperAdminId from './component/getstoreid';
import AddStore from './component/addStore';
import Inventory from './component/inventory';
import ListSuperProduct from './component/listSuperProductSuperAdmin';
import Product from './storeAdminComponent/product';
import EditProduct from './storeadmin/editProduct';
import EditStore from './component/editStore';
import ViewProduct from './component/inventory/viewProduct';
import OrderSuperAdmin from './orderSuperAdminComponent/order';
import OrderStoreAdmin from './orderStoreComponent/orderstoreAdmin';
import OfferList from './storeAdminComponent/offerList';


function Main(){
    const profile = useSelector((state) => state.profile);
    if(profile &&
		Object.keys(profile).length > 0 &&
        profile.role === "SuperAdmin"
        ){
        

        
      return<>
       <div className="main-body app sidebar-mini dark-theme">
      <div classNameName="page">
        
  {/* <!-- main-sidebar --> */}
  <div classNameName="app-sidebar__overlay" data-toggle="sidebar"></div>
  <Sidebar />
  {/* <!-- main-sidebar --> */}
  <Switch>
    <Route path="/" exact={true} component={Content} />
    <Route exact={true} path="/Custom_Management" component={CustomMana} />
    <Route exact={true} path="/Custom_Management/add_store" component={AddStore} />
    <Route  path="/Store_Management/:id" component={GetstoreAdminSuperAdminId} />
    <Route exact={true} path="/Request_Management" component={RequestManage} />
    <Route exact={true} path="/profile" component={Profile} />
    <Route exact={true} path="/Store_Management" component={Store_Management} />
    <Route exact={true} path="/Inventory" component={ListSuperProduct} />
    <Route exact={true} path="/Inventory/addProduct" component={Inventory} />
    <Route path="/Store/editStore/:id" exact={true} component={EditStore} />
    <Route  path="/inventory/:id" component={ViewProduct}  />
    <Route path="/order" exact={true} component={OrderSuperAdmin}></Route>

  </Switch>  
  {/* <!-- Main-content --> */}
  {/* <Content /> */}
  {/* <!-- Main-content closed --> */}
  {/* <!-- Footer opened --> */}
  <div className="main-footer ht-40">
      <div className="container-fluid pd-t-0-f ht-100p">
          <span>Copyright &copy; 2020  Designed by Spruko All rights reserved.</span>
      </div>
  </div>
  
  {/* <!-- Footer closed --> */}
  
  </div>
      </div>
      </>
        }
        else
        if(
            profile &&
		Object.keys(profile).length > 0 &&
		profile.role === "StoreAdmin"
        ){
            return<>
       <div className="main-body app sidebar-mini dark-theme">
      <div classNameName="page">
        
  {/* <!-- main-sidebar --> */}
  <div classNameName="app-sidebar__overlay" data-toggle="sidebar"></div>
  <Sidebar />
  {/* <!-- main-sidebar --> */}
  <Switch>
     <Route path="/" exact={true} component={Content} />
     <Route exact={true} path="/profile" component={Profile} />
     <Route path="/product" exact={true} component={Product} /> 
     <Route path="/product/:id" component={EditProduct} />
     <Route path="/order" component={OrderStoreAdmin}></Route>
     <Route path="/Offers" exact={true} component={OfferList} />

  </Switch>  
 
  <div className="main-footer ht-40">
      <div className="container-fluid pd-t-0-f ht-100p">
          <span>Copyright &copy; 2020  Designed by Spruko All rights reserved.</span>
      </div>
  </div>
  
  {/* <!-- Footer closed --> */}
  
  </div>
      </div>
      </>
        }
}
export default Main;