import { auth } from '../firebase';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import useForm from '../useForm';
import validate from '../RegisterValiadtion';

function Register() {
    const history = useHistory();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    // const [phoneno, setPhoneno] = useState('');

    const [{}, dispatch] = useStateValue();

    const {
        values,
        handleChange,
        handleSubmit,
        errors,
      } = useForm(login, validate);


      function login() {
        console.log('No errors, submit callback called!');
        auth.createUserWithEmailAndPassword(values.email, values.password)
        .then((auth) => {
            // it success creates a new user account with email and password
            // console.log(auth);
            if(auth){
                dispatch({
                    type: 'SET_DETAILS',
                    name: values.name,
                    phoneno: values.phoneno
                    });
                history.push('/');
            }
        })
        .catch(error => alert(error.message))
       
      }

    // const register = e => {
    //     e.preventDefault();
        
        

    // }

    return (
        <div className="login">
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>
            <div className='login__container'>
                <h1>sign-up</h1>
            
            <form onSubmit={handleSubmit} noValidate>
                <h5>Name</h5>
                <input type='text' 
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                required
                 />
                 {errors.name && (
                    <p className="danger">{errors.name}</p>
                )}

                 <h5>Phone Number</h5>
                 <input type='text' 
                name="phoneno"
                value={values.phoneno || ''}
                onChange={handleChange}
                required
                 />
                 {errors.phoneno && (
                    <p className="danger">{errors.phoneno}</p>
                )}

                <h5>E-mail</h5>
                <input type='email' 
                name="email"
                value={values.email || ''}
                onChange={handleChange}
                required
                 />
                 {errors.email && (
                    <p className="danger">{errors.email}</p>
                )}

                <h5>Password</h5>
                <input type='password' 
                name="password"
                value={values.password || ''}
                onChange={handleChange}
                required
                 />
                 {errors.password && (
                    <p className="danger">{errors.password}</p>
                )}

                <button
                type='submit'
                className='login__registerButton'>
                Create New Account</button>
                
            </form>
            <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>

            
            </div>
        </div>
    )
}

export default Register
