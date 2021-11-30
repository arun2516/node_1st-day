const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {register,login} = require("../schema");

const db = require("../mongo");


const service = {
    async register(req,res){
        try{
        // validations
       const {error,value} = register.validate(req.body);
       if(error) return res.send({error:error.details[0].message});

        // check if user already exists withlowercase in the db 
        value.email = value.email.toLowerCase();
        const user = await db.users.findOne({email:value.email});
        if(user) return res.sendStatus(400);

        // encrypt the password
        const salt = await bcrypt.genSalt();
        value.password = await bcrypt.hash(value.password,salt);
        
        // insert user to db
        await db.users.insertOne(value);

        res.send({message:"user registered successfully"});

        }

        catch(err){
            console.error("error registering posts",err);
            res.sendStatus(500);
        }
    },
    async login(req,res){
        try{
            const{error,value} = login.validate(req.body);
            if(error) return res.send({error:error.details[0].message});

            //check if user exists
            value.email = value.email.toLowerCase();
            const user = await db.users.findOne({email:value.email});
            if(!user) return res.sendStatus(403);

           // check if password match
           const ismatch = await bcrypt.compare(value.password,user.password);
           if(!ismatch) return res.sendStatus(403);
           
           // generate auth token
           const authtoken = jwt.sign({ userid:user._id },process.env.JWT_SECRET);

           res.send({message:"users logged in successfully",authtoken});
        }

        catch(err){
            console.error("error login user",err);
            res.sendStatus(500);

        }

    }

}

module.exports = service;
