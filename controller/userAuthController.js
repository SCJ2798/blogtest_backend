const { Router } = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//
const HttpResponseError = require("../error/http_response_error");
const RouteGuard = require("../middleware/routeGuard");
const { UserLoginSchema, UserSchema } = require("../validate/user_validate");
const { Validate } = require('../validate')

const UserRepository = require('../repository/user_repository');


const router = Router();

// Endpoint
// /api/v1/user

// Sign In 
router.post('/login',Validate(UserLoginSchema),async (req,res,next) =>{
    try {

        var { email, psw, } = req.body;

        const user = await UserRepository.getUserUsingEmail(email);
        // Check user exists
        if(!user) throw new HttpResponseError(404,"NOT FOUND");
        if (!( await bcrypt.compare(psw, user.psw))) throw new HttpResponseError(401, "Password Incorrect");

        var access_token_payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email, 
        }

        var access_token = jwt.sign(access_token_payload, `${process.env.KEY}`, {
            expiresIn: (3600)
        });
        
        res.status(200).json({ msg: "OK", data: { access_token,user:access_token_payload } });
    
    } catch (error) {
        next(error);
    }
})

// Sign Up
router.post('/signup',Validate(UserSchema),async (req,res,next) =>{
    try {
        
            var { first_name, last_name, email, psw, } = req.body;
            
            if(await UserRepository.isRegisteredUser(email)) throw new HttpResponseError(409,"CONFICTS");
    
            if (psw || psw != null) {
                var saltRound = 10;
                psw = await bcrypt.hash(psw, saltRound);
            }

            const user = await UserRepository.createUser({ first_name, last_name, email, psw });

            console.log(user);
    
            var access_token_payload = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email, 
            }
    
            var access_token = jwt.sign(access_token_payload, `${process.env.KEY}`, {
                expiresIn: (3600)
            });

            res.status(201).json({ msg: "USER CREATED", data: { access_token,user:access_token_payload } });
    
    } catch (error) {
        next(error);
    }
})

// Sign Out
router.post('/signout',async (req,res,next) =>{
    try {
        throw new HttpResponseError(400,"des");
        res.status(200).json({
            msg:"USER MSG"
        });
    } catch (error) {
        next(error);
    }
})

// Get Users Details
router.get('/',async (req,res,next) =>{
    try {
        const data = await UserRepository.getAllUsers();
        res.status(200).json(data); 
    } catch (error) {
        next(error);
    }
})

// Get User Details using id
router.get('/:id',RouteGuard,async (req,res,next) =>{
    try {
        throw new HttpResponseError(400,"des");
        res.status(200).json({
            msg:"USER MSG"
        });
    } catch (error) {
        next(error);
    }
})

// Update User Details using id
router.put('/:id',RouteGuard,async (req,res,next) =>{
    try {
        throw new HttpResponseError(400,"des");
        res.status(200).json({
            msg:"USER MSG"
        });
    } catch (error) {
        next(error);
    }
})

router.delete('/:id',RouteGuard,async (req,res,next) =>{
    try {
        throw new HttpResponseError(400,"des");
        res.status(200).json({
            msg:"USER MSG"
        });
    } catch (error) {
        next(error);
    }
})

router.post('/checkToken',RouteGuard,async (req,res,next) =>{
    try {
        res.status(200).json({
            msg:"OK"
        });
    } catch (error) {
        next(error);
    }
})


module.exports = router;