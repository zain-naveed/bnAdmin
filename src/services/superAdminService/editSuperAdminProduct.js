import * as EditSuperProductSuperAdmin from '../../action/editProductSuperAdminAction';
import { Constants } from "../../constants";
import { getCookie } from "../../cookies/cookies";


export function EditProductSuperAdmin(obj) {
    var serurl = Constants.apiUrl + "store/updateSuperProduct";
    console.log(obj)
    // console.log(obj.files);
	
	let bodyFormData = new FormData();
	console.log(obj);
	debugger;
	const size = obj.size;
    // const color = obj.color;
    const images = obj.files;
	const remove = obj.wishSelectImage;
	
    bodyFormData.append("name",obj.pname);
    bodyFormData.append("productId",obj.productid);
    bodyFormData.append("price",obj.price);
    bodyFormData.append("stock",obj.stock);
	bodyFormData.append("discount",obj.discount);
    bodyFormData.append("description",obj.description);
    if(obj && obj.wishSelectImage && obj.wishSelectImage.length > 0){
    obj.wishSelectImage.forEach((remove,index)=>{
        bodyFormData.append(`selectedImages[${index}][thumbnail]`,remove.thumbnail)
        bodyFormData.append(`selectedImages[${index}][orignalImage]`,remove.orignalImage)
    })
}
    // remove.forEach((remve)=>{
    //     bodyFormData.append("removeImages",remve);
    // })
    images.forEach((image)=>{
        bodyFormData.append("images",image);

    })
console.log(size)
    // debugger;
	Object.keys(size).forEach((sizeName)=>{
        size[sizeName].forEach((obj,indx)=>{
            console.log(obj.totalStock)
            console.log(obj)
            bodyFormData.append(`sizes[${sizeName}][${indx}][color]`,obj.color)
            bodyFormData.append(`sizes[${sizeName}][${indx}][totalStock]`,obj.totalStock);
            bodyFormData.append(`sizes[${sizeName}][${indx}][skuCode]`, obj.skuCode)
            
        })
    })
    // color.forEach((clr)=>{
	// 	bodyFormData.append("colors",clr);
    // })
    debugger;
    return (dispatch)=>{
        fetch(serurl,{
            method:"POST",
            headers: {
                'Authorization':  `Bearer ${ getCookie("access_token") } `,
            },
            
            body: bodyFormData,
        })
        .then(response=>{
            return response.json();
        })
        .then(res=>{
            console.log(res)
            if(res  && res.type && res.type === "success"){
                 dispatch(
                    EditSuperProductSuperAdmin.editProductSuperAdmin({
                        isSuccess:true,
                        data:res.data,
                        message:"Update Super Admin Product",
                        apiCall: "Edit Super Product"
                    })
                 )  
            }else{
                dispatch(
                    EditSuperProductSuperAdmin.editProductSuperAdmin({
                        isSuccess:false,
                        message:res.message,
                        apiCall: "Edit Super Product"
                    })
                 ) 
            }
        }).catch(e=>{
            dispatch(
                EditSuperProductSuperAdmin.editProductSuperAdmin({
                    isSuccess:false,
                    message:"Server Error",
                    apiCall: "Edit Super Product"
                })
             ) 
        })   
    }
}