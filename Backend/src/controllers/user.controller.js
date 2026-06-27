const User = require("../models/user.model");

const userRegistration = async(req, res)=>{
  const {name, email, password} = req.body;

 if (!name || !email || !password) {
    return res.status(400).json({
        message: "All fields are required"
    });
}

  const existingUser = await User.findOne({email : email});
  if(existingUser){
    return res.status(409).json({
      message : "User already exist"
    })
  }

  const RegisterUser = await User.create({
    name,
    email,
    password
  });

  return res
  .status(200)
  .json({message : "User Registered Successfully!", user : RegisterUser}
    
  )
  
}

const getAllRegisteredUser = async(req, res)=>{
  const allUsers = await User.find();
  if(!allUsers){
    return res.status(400).json({message : "users are not found!"});
  } 

  console.log(allUsers);
  return res
  .status(200)
  .json({message : "Users Fetched Successfully", user : allUsers})
}

const getOneUser = async(req, res)=>{
const oneUser = await User.findOne({name : "kishor"})
if (!oneUser) {
  return res.status(400).json({message: "user not found"})
}

return res
.status(200)
.json({message: "one user find successfully", user : oneUser})
}

const updateUser = async(req, res)=>{
  const {id} = req.params;
console.log(req.params);
  if (!id) {
    return res.status(400).json({message : "User id Not Found"});
  }

  const {name} = req.body;

   if (!name) {
    return res.status(401).json({message : "Name is required"});
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,   // Which user?
    {
    name : name  // What to update?  
    },
    {
      new : true  // Return updated document
    }
)

  if (!updateUser) {
    return res.status(404).json({message : "user not found"})
  }

  return res
  .status(200)
  .json({message : "user updated successfully" ,user : updateUser})

}

const deleteUser = async(req, res)=>{
  const {id}  = req.params;
  // console.log(req.params)
  if(!id){
    return res.status(404).json({message : "User id not found"})
  }

  const deletedUser = await User.findByIdAndDelete(id);

  return res
  .status(200)
  .json({message : "User Deleted successfully!", user : deletedUser})
}

module.exports = {userRegistration, getAllRegisteredUser, getOneUser, updateUser, deleteUser};