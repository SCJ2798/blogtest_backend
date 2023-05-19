const {Router} = require('express');
const HttpResponseError = require('../error/http_response_error');
const app = Router();

// controllers
const authController = require('../controller/userAuthController');
const blogController = require('../controller/blogController');
const RouteGuard = require('../middleware/routeGuard');


app.use('/user', authController);
app.use('/blog',blogController);


 // Identify Erros
 app.use((err, req, res, next) => {
 
    if (err instanceof HttpResponseError) {
      console.log(err);
      res.status(err.code).json({ error: err.name, msg: err.message });
      return;
    }
    
    // else if (err instanceof TokenError) {
    //   console.log(err);
    //   res.status(err.code).json({ error: err.name, msg: err.message, status: err.status });
    //   return;
    // }
    // else if (err instanceof Joi.ValidationError) {
    //   console.log(err);
    //   res.status(400).json({ error: err.name, msg: err.message });
    //   return;
    // }
    // else if (err instanceof Sequelize.UniqueConstraintError) {
    //   console.log(err);
    //   var msgs = "";
    //   err.errors.forEach(e => {
    //     msgs = msgs.concat(e.message, ',')
    //   });
    //   res.status(409).json({ error: err.name, msg: msgs });
    //   return;
  
    // }
  
    console.error("ERROR", err);
    res.status(500).json({ err });

  });


module.exports = app;