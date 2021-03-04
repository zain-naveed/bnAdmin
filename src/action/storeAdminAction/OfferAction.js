export const LIST_OFFER_ACTION = 'LIST_OFFER_ACTION';
export const GET_OFFER_BY_ID = 'GET_OFFER_BY_ID';
export const UPDATE_OFFER = 'UPDATE_OFFER';

export const listOffer = (data)=>{
    return{
        type:LIST_OFFER_ACTION,
        payload:data
    }
}

export const GetOfferbyId = (data)=>{
    return{
        type:GET_OFFER_BY_ID,
        payload:data
    }
}
export const UpdateOffer = (data)=>{
    return{
        type:UPDATE_OFFER,
        payload:data
    }
}