const { MongoClient } = require("mongodb");


const mongo={
    posts:null,
    users:null,

   async connect(){
        try{
        const client = new MongoClient(process.env.MONGODB_URL);
        await client.connect();
        console.log("mongo db connected successfully");

        const db = await client.db(process.env.MONGODB_NAME);
        console.log(`selected database-${process.env.MONGODB_NAME}`);
         
        //initializong all the collections
         this.posts = db.collection("posts");
         this.users = db.collection("users");
        }catch(err){
            console.error("error connecting to mongodb",err);
        }
    },
};

module.exports = mongo;