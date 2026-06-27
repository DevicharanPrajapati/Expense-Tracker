const mongoose = require('mongoose');
const { schema } = require('../models/user.model');

const categorySchema = new mongoose.Schema(
  {
    useId : {
      type : mongoose.Schema.Type.objectID,
      ref : "Users"
    },
    name : {
      type : String,
      required : true,
      trim : true
    },
    type : {
      type : String,
      enum : ["income", "expense"],
      required : true
    },
    isDefault : {
      type : Boolean,
      default : false
    }
  }, {timestamps : true}
)

module.exports = mongoose.model("category", categorySchema);