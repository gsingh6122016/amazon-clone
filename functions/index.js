const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    'sk_test_51HQwAvLcWDvwCXs9HuIfDZAsgAWtWopl7xqRUyAZ75madRWw2XRjdhytGUjQp4YS9gQsbNmLTgGNdA3uElVq0MPI00apJ2Npjx'
);

const app = express();
//Used to fix the Cross-Origin Access Control Issue
var corsPreflightHeaders = {
  methods: "GET,POST,OPTIONS",
  optionsSuccessStatus: 200,
  origin: "*",
  "cache-control": "no-cache",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsPreflightHeaders));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello word");
});

app.post("/payments/create", async (req, res) => {
  console.log("Reqbody " + req.body);
  console.log("ReqTotal " + req.query.total);
  const total = req.query.total;
  console.log("Total : " + total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

const port = process.env.PORT || 5050;

app.listen(port, () => console.log("Listening on 5050"));