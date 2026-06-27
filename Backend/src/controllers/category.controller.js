const Category = require("../models/category.model.js");
const User = require("../models/user.model.js");

const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }


    const addCategory = await Category.create({
      userId: req.user.id,
      name,
      type,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category: addCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategories = async(req, res)=>{
try {
    const categories = await Category.find(
     { userId : req.user.id}
    ).select("-password");
  
    if(categories.length === 0){ //because find returns array
      return res.status(404)
      .json({success : false, message : "Categories are empty or not found!"})
    }
  
    return res
    .status(200)
    .json({
      success: true,
      message : "Categories Fetched successful",
      Category : categories
    })
} catch (error) {
  return res.status(500)
  .json({success :false, message : error.message})
}
};

// const getCategoryById = async(req, res)=>{

// };

const updateCategory = async(req, res)=>{

try {
   const {newName} = req.body;
   const updatedName = Category.findByIdAndUpdate(
    req.user.id,
    {
      name : newName
    },
    {
      new : true
    }
  );
  
  return res
  .status(201)
  .json({
    success : true,
    message : "Category updated successfully!"
  })
} catch (error) {
  return res.status(500)
  .json({success :false, message : error.message})
}
};

const deleteCategory = async(req, res)=>{
  const deletedCategory = await Category.findByIdAndUpdate(req.user.id);

  return res
  .status(201)
  .json({success : true, message : "Category deleted successfully!"})
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};
