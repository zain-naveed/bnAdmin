export const ORDER_DETAIL_SUPER_ADMIN = 'ORDER_DETAIL_SUPER_ADMIN';
export const UPDATE_ORDER_SUPER_ADMIN = 'UPDATE_ORDER_SUPER_ADMIN';


export const orderDetailSuperAdmin = (data)=>{
    return {
        type:ORDER_DETAIL_SUPER_ADMIN,
        payload:data
    }
}

export const updateOrderSuperAdmin = (data)=>{
    return {
        type:UPDATE_ORDER_SUPER_ADMIN,
        payload:data
    }
}