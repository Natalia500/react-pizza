import React from "react";
import emptyCart from '../assets/img/emptyCart.png'
import { Link } from 'react-router-dom';

const CartEmpty = ()=>{
    return(
   <>
   <div class="cart cart--empty">
     <h2>Your bag is empty<icon>😕</icon></h2>
     <p>
     There is nothing in your bag. Let's add some items.
     </p>
     <img src={emptyCart} alt="Empty cart" />
     <Link to="/" class="button button--black">
       <span>Back</span>
     </Link>
   </div>
   </>
       
    )
}
export default CartEmpty;