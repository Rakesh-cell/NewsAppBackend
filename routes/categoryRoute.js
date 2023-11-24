const express=require('express');
const router=express.Router();
const protect=require('../middleware/authMiddleware');
const { addCategory, deleteCategory, getAllCategories, editCategory } = require('../controllers/categoryController');
const { model } = require('mongoose');


router.route('/addCategory').post(protect,addCategory);
router.route('/deleteCategory/:catId').delete(protect,deleteCategory);
router.route('/getAllCat').get(getAllCategories);
router.route('/editCategory/:catId').put(protect,editCategory);

module.exports=router;