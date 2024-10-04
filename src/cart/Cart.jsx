import React from 'react'
import { CartContext } from './CartContext'
import { useContext } from 'react'


const Cart = () => {
  const {userData,updateCartItemQuantity,removeCartItem,cartItems}=useContext(CartContext)

  return (
    {if(userData){
      <div className="displayItems">
        {cartItems.map((item,ind)=>(
          <div key={ind} className="displayItem">
          <div className="itemImage"><img src={item.pic[0]} alt="" /></div>
          <div className="itemImage">{item.name}</div>
          <div className="itemImage">{item.price}</div>
          <button onClick={()=>updateCartItemQuantity(item,1)}>+</button>
       <span>{item.quantity}</span>
       <button onClick={()=>updateCartItemQuantity(item,-1)}>-</button>
       <button onClick={()=>removeCartItem(item)}>x</button>
          </div>
        ))}
      </div>}}
  )
}

export default Cart
