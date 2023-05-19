const { ObjectId } = require('mongodb');
const HttpResponseError = require('../error/http_response_error');
const blog = require('../model/blog');
const Blog = require('../model/blog')

module.exports.createBlog = async (blogSchema) =>  {
    await Blog.create(blogSchema);
}

module.exports.getAllBlogs = async () =>  {
    return new Promise(async (resolve,reject)=>{
        try {
            const blogs = await Blog.aggregate([
                {
                    $lookup:{
                        from:"users",
                        localField:"author_id",
                        foreignField:"_id",
                        as:'author'
                    }
                },
                {
                    $unwind:'$author'
                },{
                    $project:{
                        "author.psw":false,
                        "author.createdAt":false,
                        "author.updatedAt":false,
                    }
                }
            ]);
            if(blogs.length < 1)throw new HttpResponseError(404,"NOT FOUND");
            resolve(blogs);
        } catch (error) {
            reject(error);
        }
    });   // return await Blog.find();
}
 
module.exports.getBlogUsingId = async (blogId) =>  {
    return new Promise(async (resolve,reject)=>{
        try {
            const blogs = await Blog.aggregate([
                {
                    $match:{"_id":new ObjectId(blogId)}
                },
                {
                    $lookup:{
                        from:"users",
                        localField:"author_id",
                        foreignField:"_id",
                        as:'author'
                    }
                },
                {
                    $unwind:'$author'
                },{
                    $project:{
                        "author.psw":false,
                        "author.createdAt":false,
                        "author.updatedAt":false,
                    }
                }
            ]);
            if(blogs ==  null)throw new HttpResponseError(404,"NOT FOUND");
            resolve(blogs);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.getBlogUsingAuthorId = async (authorId) =>  {
    return await Blog.find({author_id:authorId});
}

module.exports.updateBlog = async (id,blog) =>  {
    return await Blog.findOneAndUpdate({_id:id},blog);
}

module.exports.deleteBlog = async (id) =>  {
    return await Blog.deleteOne({_id:id});
}

