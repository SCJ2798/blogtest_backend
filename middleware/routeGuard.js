const jwt  = require('jsonwebtoken');
const HttpResponseError = require('../error/http_response_error');

const routeGuard = (req,res,next) => {
    try {
        const { authorization } = req.headers;
        if(!authorization) throw new HttpResponseError(403,"UN AUTHORIZED");

        var key = authorization.toString().split(" ")[1];

        jwt.verify(key,`${process.env.KEY}`,(err,payload) => {
            if(err) throw new HttpResponseError(403,err.message);
            else next();
        });
         
    } catch (error) {
        next(error)
    }
}

module.exports = routeGuard;