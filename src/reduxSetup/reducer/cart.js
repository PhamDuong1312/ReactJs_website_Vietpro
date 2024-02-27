import { ADD_TO_CART,UPDATE_CART,DELETE_CART,DELETE_ALL } from "../../shared/constants/action-type";

const initState = {
    items: [],

}

export default (state = initState,action) =>{
    switch(action.type){
        case ADD_TO_CART:
            return addToCart(state, action.payload);
        case UPDATE_CART:
            return upDateCart(state, action.payload);
        case DELETE_CART:
            return deleteCart(state, action.payload);
        case DELETE_ALL:
            return {...state, items: []}
        default:
            return state;
    }
}

const addToCart = (state, payload)=>{
    const {items} = state;
    let isProductExits=false;
    items.map((item)=>{
        if(item._id===payload._id){
            item.qty+=payload.qty;
            isProductExits=true;
        }
        return item;
    })
    const newItems=isProductExits?items:[...items,payload];
    return {
        ...state,
        items: newItems
    };
}
const upDateCart=(state, payload)=>{
    const {items} = state;
    const newItems=items.map((item)=>{
        if(item._id===payload._id){
            item.qty=payload.qty;
        }
        return item;
    })
    return {
        ...state,
        items:newItems
    }
}
const deleteCart=(state, payload)=>{
    const {items} = state;
    const newItems=items.filter((item)=>item._id!=payload._id)
    return {...state,items:newItems}
}