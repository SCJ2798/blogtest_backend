const HttpResponseError = require('../error/http_response_error');
const User = require('../model/user');

module.exports.createUser = async (userSchema) =>  {
    return await User.create(userSchema);
}

module.exports.getAllUsers = async () =>  {
    return new Promise(async (resolve,reject)=>{
        try {
            const blogs = await User.aggregate([
                {
                    $project:{
                        "psw":0,
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
 
module.exports.getUserUsingId = async (userId) =>  {
    return new Promise(async (resolve,reject)=>{
        try {
            const blogs = await User.findById({_id:userId});
            if(blogs ==  null)throw new HttpResponseError(404,"NOT FOUND");
            resolve(blogs);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.getUserUsingEmail = async (email) =>  {
    return await User.findOne({email});
}

module.exports.updateUser= async (id,user) =>  {
    return await User.findOneAndUpdate({_id:id},user);
}

module.exports.isRegisteredUser = async (email) =>  {
   return await User.exists({email});
}

module.exports.deleteUser = async (id) =>  {
    return await User.deleteOne({_id:id});
}

