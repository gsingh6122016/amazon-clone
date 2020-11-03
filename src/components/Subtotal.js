import React from 'react'
import CurrencyFormat from "react-currency-format";
import { useHistory } from 'react-router-dom';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import './Subtotal.css'

function Subtotal() {

  // const [{basket, subtotal}, dispatch] = useStateValue();
  const history = useHistory();
  const [{basket, user}, dispatch] = useStateValue();

  const proceedHandler = (e) => {
    if(user) {
      if(basket.length) {
        history.push('/address');
      }
      else{
        alert("Please add something to cart first");
      }
    }
    else {
      history.push('/login')
    }
  }

    return (
        <div className="subtotal">
            <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
            
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs. "}
      />

<button onClick={proceedHandler}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
