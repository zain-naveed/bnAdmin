import { createStore, combineReducers, applyMiddleware } from "redux";
import { userProfileReducer } from "../reducer/userReducer";
import { apiCallsReducer } from "../reducer/apiCallsReducer";
import {userListReducer} from '../reducer/listReducer';
import {addStoreUser} from '../reducer/addStoreReducer';
import {listStoreReducer} from '../reducer/listStoreReducer';
import {customStoreReducer} from '../reducer/customStoreReducer';
import {getStoreUserIdAdminReducer} from '../reducer/getStoreUserIdReducer';
import {profileTokeReducer} from '../reducer/profileTokenReducer';
import {addProductSuperAdminReducer} from  '../reducer/addProductSuperAdminReducer';
import {addProductToCustomStoreReducer} from '../reducer/addProductToCustomStoreReducer';
import {listSuperProductReducer} from '../reducer/listSuperProductSuperAdminReducer';
import {StoreLoginUserReducer} from '../reducer/storeUserLoginReducer';
import {AddMenuReducer} from '../reducer/addMenuReducer';
import {listProductAdminReducer} from '../reducer/storeAdmin/listStoreAdminReducer';
import {editStoreReducer} from '../reducer/editStoreReducer';
import {editCustomStoreReducer} from '../reducer/editCustomStoreReducer';
import {editStoreMenusReducer} from '../reducer/editStoreMenusReducer';
import {getProductStoreAdminbyIdReducer} from '../reducer/storeAdmin/getProductbyIdStoreAdminReducer';
import {updateProductReducer} from '../reducer/storeAdmin/updateStoreProductReducer';
import {getSingleProductbySuperAdminReducer} from '../reducer/getSingleProductbySuperAdminReducer';
import {editProductSuperAdminReducer} from '../reducer/editProductSuperAdminReducer';
import {orderDetailSuperAdminReducer,orderUpdateSuperAdminReducer} from '../reducer/orderDetailSuperAdminReducer';
import {listStoreMenusReducer}  from '../reducer/storeAdmin/listStoreMenusReducer';
import {addProductSubMenusReducer} from '../reducer/storeAdmin/addProductSubMenusReducer';
import {getStoreProductbyIdReducer} from '../reducer/getStoreProductbyIdReducer';
import {getStoreMenubyIdReducer} from '../reducer/getMenubyIdReducer';
import {orderDetailStoreAdminIdReducer} from '../reducer/storeAdmin/orderDetailStoreAdminId';
import {addStudentReducer} from '../reducer/addStudentReducer';
import {ListAllRolesReducer} from '../reducer/listAllRolesReducer';
import {addOfferReducer} from '../reducer/storeAdmin/addOfferReducer';
import {FeatureProductReducer} from '../reducer/storeAdmin/featureProductReducer';
import {listOfferReducer,getOfferidReducer,updateOfferReducer} from '../reducer/storeAdmin/offerReducer';
import {ListApprovalReducer,addApprovalReducer,updateApprovalReducer} from '../reducer/approvalReducer';
import {dashboardReducer} from '../reducer/dashboardReducer';
const thunkMiddleware = require("redux-thunk").default;

const MainReducer = combineReducers({
	apiCallStatus: apiCallsReducer,
	profile: userProfileReducer,
	list:userListReducer,
	addStoreUser: addStoreUser,
	listStore:listStoreReducer,
	CustomStore:customStoreReducer,
	GetStoreUserId: getStoreUserIdAdminReducer,
	profileToken:profileTokeReducer,
	addProductSuperAdmin:addProductSuperAdminReducer,
	addProductToCustomStore:addProductToCustomStoreReducer,
	listSuperProduct:listSuperProductReducer,
	storeAdminLogin:StoreLoginUserReducer,
	addMenu:AddMenuReducer,
	listStoreAdminProduct:listProductAdminReducer,
	editStore:editStoreReducer,
	editCustom:editCustomStoreReducer,
	editMenu:editStoreMenusReducer,
	getSingleProductbyStoreAdmin:getProductStoreAdminbyIdReducer,
	updateProductStoreAdmin:updateProductReducer,
	getSingleProductSuperAdmin: getSingleProductbySuperAdminReducer,
	editProductSuperAdmin:editProductSuperAdminReducer,
	orderDetailSuperAdmin:orderDetailSuperAdminReducer,
	orderDetailStoreAdminId:orderDetailStoreAdminIdReducer,
	listStoreMenus:listStoreMenusReducer,
	addProductSubMenus:addProductSubMenusReducer,
	getProductbyId: getStoreProductbyIdReducer,
	getStoreMenubyId:getStoreMenubyIdReducer,
	addStudent:addStudentReducer,
	ListAllRoles:ListAllRolesReducer,
	addOffer:addOfferReducer,
	FeatureProduct:FeatureProductReducer,
	listOffer:listOfferReducer,
	getOfferId:getOfferidReducer,
	updateOffer:updateOfferReducer,
	listApproval:ListApprovalReducer,
	addApproval:addApprovalReducer,
	updateApproval:updateApprovalReducer,
	updateOrder:orderUpdateSuperAdminReducer,
	dashboard:dashboardReducer,
});
const store = createStore(MainReducer, applyMiddleware(thunkMiddleware));
export default store;
