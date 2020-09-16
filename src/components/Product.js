import React from 'react'
import { useStateValue } from '../StateProvider'
import './Product.css'

function Product({ id, title, image, price, rating }) {

    const [{basket}, dispatch] = useStateValue();
// console.log("This is basket >>>>>>", basket);

    const addToBasket = () => {
        //dispatch the item to store
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id:id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        })

    }

    return (
        <div className="product">
            <div className = "product__info">
               <p>{title}</p> 
               <p className="product__price">
                    <small>Rs.</small>
                    <strong>{price}</strong>
               </p>
               <div className="product__rating">
                   {
                       Array(rating).fill().map((x)=> (
                           <p>🌟</p>
                       )) 
                   }
                
               </div>
            </div>

            <img src={image} alt="" />
        <button onClick={addToBasket}>add to basket</button>
        </div>
    )
}

export default Product
