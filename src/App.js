import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './components/Checkout';
import Login from './components/Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './components/Payment';
import {loadStripe} from "@stripe/stripe-js";
import { Elements} from "@stripe/react-stripe-js";
import Orders from './components/Orders';
import Address from './components/Address';

const promise = loadStripe("pk_test_51HQwAvLcWDvwCXs9GvofmYFiZK0mvoSjPAfsmvG1Zwsw2ifQffsQdQj4TcVOcEoZS2u7ZZXmi2sChEdWATsode2900xBsWHDkR");

function App() {

  const [{basket}, dispatch] = useStateValue();

useEffect(() => {
//componenet did mount
auth.onAuthStateChanged(authUser => {
  console.log('USER IS  >>>', authUser);
  if(authUser) {
    //the user just logged in or the userr was logged in.
    dispatch({
      type: 'SET_USER',
      user: authUser
    })
  }
  else {
    //the user logged out
    dispatch({
      type: 'SET_USER',
      user: null
    })
  }
})
}, [])

  return (
    <Router>
      <div className="app">
       
        <Switch>
        <Route path="/orders">
               <Header />
              <Orders />
          </Route>
          <Route path="/address">
               <Header />
              <Address />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
               <Header />
              <Checkout />
          </Route>
          <Route path="/payment">
          <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>  
          </Route>
          <Route path="/"> 
               <Header />
              <Home />
          </Route>
        </Switch>
     
    </div>
    </Router>
    
  );
}

export default App;
