export const List_Product_Approval = "Product_Approval";
export const Add_Product_Approval = "Add_Product_Approval";
export const Update_Product_Approval = "Update_Product_Approval";

export const listProductApproval = (data)=>{
    return{
        type:List_Product_Approval,
        payload:data
    }
}
export const addProductApproval = (data)=>{
    return{
        type:Add_Product_Approval,
        payload:data
    }
}

export const updateProductApproval = (data)=>{
    return{
        type:Update_Product_Approval,
        payload:data
    }
}
