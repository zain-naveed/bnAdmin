export const ADD_OFFER = "ADD_OFFER";
export const addOfferAction = (data)=>{
    return {
        type:ADD_OFFER,
        payload:data
    }
}