const News = require('../models/newsModel')
const ImageToBase64 = require('image-to-base64');


// @desc-> Add News
const addNews = async (req, res, next) => {
    try {
        console.log(req.body);
        const { title, content, author, category, addToSlider } = req.body;

        const base64Data = await ImageToBase64(req.files.newsImage.path);
        // console.log(base64Data);
        const news = await News.create({
            author, content, category, addToSlider, newsImage: `data:${req.files.newsImage.type};base64,${base64Data}`, addedAt: Date.now()
        })
        if (news) {
            res.status(200).json({
                success: true,
                msg: 'News Added Successfully',
                data: news
            })
        }
        else {
            res.status(400).json({
                success: false,
                msg: 'Invalid News Data'
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
}

//@desc Fetch all News
const getAllNews = async (req, res, next) => {
    try {
        const size = req.params.pageSize;
        const pageNo = req.params.pageNo;

        var query = {}

        if (pageNo < 0 || pageNo === 0) {
            return res.status(401).json({
                success: false,
                msg: 'Invallid page number, should start with 1'
            });
        }

        query.skip = size * (pageNo - 1)
        query.limit = size;

        const newsCount = await News.find({})
        const news = await News.find({})
            .sort('-addedAt')
            .populate({ path: 'category', select: ['_id', 'category_name'] })
            .limit(Number(query.limit))
            .skip(Number(query.skip));

        res.status(201).json({
            success: true,
            totalCount: newsCount.length,
            count: news.length,
            data: news
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
}

//@desc Get News by Id
const getNewsById = async (req, res, next) => {
    try {

        const news = await News.findById(req.params.newsId)
            .populate({ path: 'category', select: ['_id', 'category_name'] })

        res.status(201).json({
            success: true,
            data: news
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
}

//@desc Get Slider News
const getSliderNews = async (req, res, next) => {
    try {

        const news = await News.find({addToSlider: true})
            .populate({ path: 'category', select: ['_id', 'category_name'] })

        res.status(201).json({
            success: true,
            count: news.length,
            data: news
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
}

//@desc Get News by category
const getNewsByCategory = async (req, res, next) => {
    try {

        const news = await News.find({category: req.params.catId})
            .populate({ path: 'category', select: ['_id', 'category_name'] })

        res.status(201).json({
            success: true,
            count: news.length,
            data: news
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
}

//@desc delete News by id
const deleteNewsById = async (req, res, next) => {
    try {
        const news = await News.findByIdAndDelete(req.params.newsId);
        res.status(201).json({
                success: true,
                msg: 'News deleted successfully',
                data: news

        });
        if(!news){
            return res.status(401).json({
                success: false,
                msg: 'News not found'
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
}

// @desc Update News
const editNews=async (req,res,next)=>{
    try {
        const news = await News.findByIdAndUpdate(req.params.newsId,req.body,{
            new:true,
            runValidators:true
        });
        res.status(201).json({
                success: true,
                msg: 'News updated successfully',
                data: news

        });
        if(!news){
            return res.status(401).json({
                success: false,
                msg: 'News not found'
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
}

module.exports = {
    addNews,
    getAllNews,
    getNewsById,
    getSliderNews,
    getNewsByCategory,
    deleteNewsById,
    editNews
}