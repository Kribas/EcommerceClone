const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./db/userModel");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const router = express.Router();
const MongoClient = require("mongodb");

// require the database
const dbConnect = require("./db/dbConnect");

// execute the db connection
dbConnect();

// Curb Cors Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! this is your server response!" });
  next();
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: hashedPassword,
      });
      // save the new user

      user
        .save()
        // return success if the new user is added to the database successfully

        .then((result) => {
          response.status(201).send({
            message: "User created successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database

        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful

    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint

app.post("/login", (request, response) => {
  // check if email exists

  User.findOne({ email: request.body.email })
    // if email exists

    .then((user) => {
      // compare the password entered and the hashed password found

      bcrypt
        .compare(request.body.password, user.password)
        // if the passwords match

        .then((passwordCheck) => {
          // check if password matches

          if (!passwordCheck) {
            return response.status(400).send({
              message: "Password does not match",
              error,
            });
          }
          // create JWT token

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          // return success response

          response.status(200).send({
            message: "Login Successful",
            userFirstName: user.firstName,
            userLastName: user.lastName,
            userEmail: user.email,
            token,
          });
        })
        // catch error if password does not match

        .catch((error) => {
          response.status(400).send({
            message: "Password does not match",
            error,
          });
        });
    })
    // catch error if error does not exist

    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

module.exports = app;
