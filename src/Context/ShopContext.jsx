import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product'


export const ShopContext = createContext(null);   /* here we are creating context outside function and storing in one variable*/

const getDefaultCart=()=>{
    let cart = {}
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
        
    }
    return cart;
}

const ShopContextProvider = (props)=>{           /* created one function*/
    const [cartItems,setCartItems] = useState(getDefaultCart());
    
    const addToCart = (itemId)=> {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }

    const removeFromCart = (itemId)=> {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }   
        }
        return totalAmount
    }

    const getTotalCartItems = ()=>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart };             /*getting all product details and storing in contextvalue variable */
    return(
        <ShopContext.Provider value={contextValue}>    {/* provider method is available in that variavle and use that method and value is one attribute and mention product details in that value what we are going to use */}
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

//we can use this all product details wher we require in components because using context hook
//mention this function in index.js file 