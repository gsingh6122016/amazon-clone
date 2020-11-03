import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from '../axios';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import {db} from '../firebase';

function Payment() {
    const [{basket, user, city, landmark, pincode}, dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);

useEffect(() => {
// generate the stripe client secret which allows us to charge a customer
const getClientSecret =  async () => {
    const response = await axios({
        method: 'post',
        //stripe expectes the total in a currrencies subunits
    url: `/payments/create?total=${getBasketTotal(basket)*100}`
    });
    setClientSecret(response.data.clientSecret)
}

getClientSecret();
}, [basket]) 

console.log('THE SECRET IS >>>', clientSecret)

const handleSubmit = async (event) => {
    // do the fancy stuff
    event.preventDefault();
    setProcessing(true);

   const payload = await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
           card: elements.getElement(CardElement)
       }
   }).then (({paymentIntent}) => {
       //paymentIntent means  payment confirmation

        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
            basket: basket,
            amount : paymentIntent.amount,
            created: paymentIntent.created
        })
        //no sequeal databases


       setSucceeded(true);
       setError(null);
       setProcessing(false);

       dispatch({
           type: 'EMPTY_BASKET'
       })

       history.replace('/orders');
   }) 
}

const handleChange = event => {
     setDisabled(event.empty);
     setError(event.error? event.error.message: "");
}

    return (
        <div className='payment'>
            <div className='payment__container'>

            <h1>
                Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                )
            </h1>

                {/* Payment Section - delievery address */}
                    <div className='payment__section'>
                        <div className='payment__title'>
                            <h3> Delivery address </h3>
                        </div>
                        <div className='payment__address'>
                            <p>{user?.email}</p>
                            {/* dummy address */}
                            <p>Landmark: {landmark}</p>
                            <p>Pincode: {pincode}</p>
                            <p>City: {city}</p>
                        </div>
                    </div>


                {/* Payment section - Review items */}
                    <div className='payment__section'>
                    <div className='payment__title'>
                            <h3> Review Items and delivery </h3>
                        </div>
                        <div className='payment__items'>
                           {basket.map(item => (
                               <CheckoutProduct
                               id={item.id}
                               title={item.title}
                               image = {item.image}
                               price={item.price}
                               rating =  {item.rating}
                               />
                           ))}
                        </div>
                    </div>


                {/* payment section Payment method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                            <h3> Payment Method </h3>
                        </div>
                        <div className='payment__details'>
                            {/* stripe magic will come here */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                            <CurrencyFormat
        renderText={(value) => (
          <h3>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} 
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs. "}
      />
      <button disabled={processing || disabled || succeeded}>
        <span>{ processing ? <p>processing</p>: "Buy Now" }</span>
      </button>
                            </div>

{/* for showing the error if present */}
        {error && <div>{error}</div>}
                            </form>

                        </div>

                </div>

            </div>
        </div>
    )
}

export default Payment
