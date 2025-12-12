const httpStatus= require('http-status').status;
const jwt = require('jsonwebtoken');

module.exports=async function(req,res,next) {
        const authHeader = req.headers['authorization'];


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Request failed! Try to login again.'
    });
  }

  const access_token = authHeader.split(" ")[1];
        try{
            let decoded=await jwt.verify(access_token, process.env.SECRET_OF_JWT);
            req.user=decoded; //for further use if needed
            next();
        }
        catch(e) {
          return  res.status(httpStatus.UNAUTHORIZED).json({
            'message': 'Request failed! Try to login again.'
        });
        }
        
}