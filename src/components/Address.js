import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import useForm from '../useForm';
import validate from '../validation';
import './Address.css'

function Address() {
    const history = useHistory();
    const [{basket}, dispatch] = useStateValue();
    // const [city, setCity] = useState('');
    // const [landmark, setLandmark] = useState('');
    // const [pincode, setPincode] = useState('');

    // const addressSubmit = (e) => {
    //     e.preventDefault();
        
    //         dispatch({
    //             type: 'SET_ADDRESS',
    //             city: city,
    //             landmark: landmark,
    //             pincode: pincode
    //           })
    //           history.push('/payment');
      
    // }

   
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
        } = useForm(login, validate);

        function login() {
            console.log('No errors, submit callback called!');
            dispatch({
                            type: 'SET_ADDRESS',
                            city: values.text,
                            landmark: values.text2,
                            pincode: values.pincode
                          })
            history.push('/payment');
          }
    
    return (
        <div className="address">
           
            <div className='address__container'>
                <h1>Enter Your Address</h1>
            
            <form onSubmit={handleSubmit} noValidate>
                <h5>City</h5>
                <input type='text' 
                name="text"
                value={values.text || ''}
                onChange={handleChange}
                required
                 />
                  {errors.text && (
                    <p className="danger">{errors.text}</p>
                )}


                <h5>Landmark</h5>
                <input type='text' 
                name="text2"
                value={values.text2 || ''}
                onChange={handleChange}
                required
                 />
                  {errors.text2 && (
                    <p className="danger">{errors.text2}</p>
                )}

                 <h5>Pincode</h5>
                 <input type='text' 
                name="pincode"
                value={values.pincode || ''}
                onChange={handleChange}
                required
                 />
                  {errors.pincode && (
                    <p className="danger">{errors.pincode}</p>
                )}

                <button 
                type='submit'
                className='address__submitButton' 
                >Submit</button>
            </form>
            
            </div>
            <div className='address__price'>
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
            </div>
            
        </div>
    )
}

export default Address
