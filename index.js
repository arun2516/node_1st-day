const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//imports
const authroutes = require("./Routes/auth.routes");
const postroutes = require("./Routes/posts");

const middleware = require("./middleware");
const mongo = require("./mongo");

const server = express();



(async ()=>{
  try{

  //mongodb connection
   await mongo.connect();

   
   server.use(cors({
     origin:"",
     optionsSuccessStatus: 200 
    }));
   
  //parsing request body as json format
   server.use(express.json());

   //logging middleware
   server.use(middleware.logging);

   //Routes
   server.use("/auth",authroutes);

   //check token exists
   server.use((req,res,next)=>{
      let token = req.headers["authorization"].split(" ")[1];
      try{
        const user= jwt.verify(token, process.env.JWT_SECRET);
        req.user = user.userId;
        next();
      }catch(err){
         res.sendStatus(403);
      }
      
  });
 

   server.use("/posts",postroutes);//posts routes
   

   server.listen(process.env.PORT,()=>{
   console.log(`server listening at port-${process.env.PORT}`);
   });
  } catch(err){
    console.error("error starting our application",err);
  }
})();

