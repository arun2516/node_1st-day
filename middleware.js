const logging =(req,res,next)=>{
    console.log(`request received-${new Date()}-${req.url}`);
    next();
  };

  module.exports={
      logging,
  };