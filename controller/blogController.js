const router = require('express').Router();
const { ObjectId } = require('mongodb');
const HttpResponseError = require("../error/http_response_error");
const routeGuard = require('../middleware/routeGuard');
const Guard = require("../middleware/routeGuard");
const BlogRepository = require('../repository/blog_repository');

//Endpoint
// /api/v1/blog/

//Get All Blogs
router.get("/",async(req,res,next) => {
    try {
        const data = await BlogRepository.getAllBlogs();
        res.status(200).json(data); 
    } catch (error) {
        next(error);
    }
   
});

//Get Blog using blog id
router.get("/:id",async(req,res,next) => {
    try {
        const id = req.params.id;
        const data = await BlogRepository.getBlogUsingId(id);
        res.status(200).json(data); 
    } catch (error) {
        next(error);
    }
});

//Get All Blogs using user id
router.get("/user/:id",async(req,res,next) => {
    try {
        const id = req.params.id;
        const data = await BlogRepository.getBlogUsingAuthorId(id);
        res.status(200).json(data); 
    } catch (error) {
        next(error);
    }
});

// Create new blog
router.post("/",routeGuard,async(req,res,next) => {
    try {

        const {title,body,author_id} = req.body;
        //
        await BlogRepository.createBlog({
            title:title,
            body:body,
            author_id:new ObjectId(author_id)
        });
        console.log("created blog");
        res.status(201).json({msg:"Create Blog"});
    } catch (error) {
        next(error);
    }
});

// update blog details using id
router.put("/:id",routeGuard,async(req,res,next) => {
    try {
        const body = req.body
        const id = req.params.id;
        await BlogRepository.updateBlog(id,body);
        console.log("Updated blog");
        res.status(200).json({msg:"Update Blog"});
    } catch (error) {
        next(error);
    }
});

// delete blog details using id
router.delete("/:id",routeGuard,async(req,res,next) => {
    try {
        const id = req.params.id;
        await BlogRepository.deleteBlog(id);
        res.status(201).json({msg:"Deleted Blog"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;