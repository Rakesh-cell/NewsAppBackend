const Category = require('../models/CategoryModal');

// @desc Add Category
const addCategory = async (req, res, next) => {
    try {
        const { category_name } = req.body;

        const category = await Category.findOne({ category_name: category_name });

        if (category) {
            return res.status(401).json({
                success: false,
                msg: 'Category already exists'
            });

        }
        const new_Category = await Category.create({ category_name });

        res.status(201).json({
            success: true,
            msg: 'Category created',
            data: new_Category
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
}

// @desc get all  Categories
const getAllCategories = async (req, res, next) => {
            try {
                const categories= await Category.find({});
                 res.status(201).json({
                    success:true,
                    data: categories
                 })
                
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    msg: 'Internal error occurred'
                });
            }
}

//@desc delete a  Category
const deleteCategory = async (req, res, next)=> {
    try {
        const category = await Category.findByIdAndDelete(req.params.catId);
        res.status(201).json({
                success: true,
                msg: 'Category deleted successfully',
                data: category

        });
        if(!category){
            return res.status(401).json({
                success: false,
                msg: 'Category not found'
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
}

// @desc Update Category
const editCategory=async (req,res,next)=>{
    try {
        const category = await Category.findByIdAndUpdate(req.params.catId,req.body,{
            new:true,
            runValidators:true
        });
        res.status(201).json({
                success: true,
                msg: 'Category updated successfully',
                data: category

        });
        if(!category){
            return res.status(401).json({
                success: false,
                msg: 'Category not found'
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
}

module.exports={
    addCategory,
    getAllCategories,
    deleteCategory,
    editCategory
}
