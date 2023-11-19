const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
const registrationValidation=require("./registerValidation")
const {checkSchema,validationResult}= require("express-validator");
const User = require("./schema");

app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/voting1")
  .then(() => {
    console.log("DB is connected");
  })
  .catch((error) => {
    console.log(error);
  });
PORT = 8080;


app.post("/auth/register",checkSchema(registrationValidation), async (req, res) => {
    const {errors}=validationResult(req)
    console.log(errors)
        if(errors.length>0){
       return res.json(errors)}
  try {
    
    const saltedpassword = await bcrypt.genSalt();
    // console.log(saltedpassword)
    // console.log(req.body.registrationDate);
    const encryptedpassword = await bcrypt.hash(
      req.body.password,
      saltedpassword
    );
    
    //   console.log(encryptedpassword)
    req.body.password = encryptedpassword;
    const newUser = await new User(req.body).save();
    res.json(newUser);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log("server is running");
});

module.exports=User