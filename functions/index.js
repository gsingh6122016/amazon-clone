const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const { response, request } = require('express');
const stripe = require("stripe")('sk_test_51HQwAvLcWDvwCXs9HuIfDZAsgAWtWopl7xqRUyAZ75madRWw2XRjdhytGUjQp4YS9gQsbNmLTgGNdA3uElVq0MPI00apJ2Npjx')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// API

//app config
const app = express();

//middlewares
app.use(cors({ origin: true}));
app.use(express.json());

//API routes 
app.get('/', (request, response) => response.status(200).send('hello World') ) 

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('payment request recieved BOOOO!! for this amount >>>', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount : total, //subunits of currency
        currency : "inr",
    });

    //ok - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

//Listen command
exports.api = functions.https.onRequest(app)

// http://localhost:5001/clone-a6f75/us-central1/api