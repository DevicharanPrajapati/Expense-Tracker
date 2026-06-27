const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next)=>{
try {
  
    const authHeader = req.headers.authorization;
    if(!authHeader){
      return res.status(401).json({message : "Accsess Denie!"})
    }
  
    const token = authHeader.replace("Bearer ", "");
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = decode;
  
    next();
} catch (error) {
 return res.status(401).json({message: "Invalid or Expired Token",error});

}
}

module.exports = verifyToken;