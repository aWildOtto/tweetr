"use strict";


const express      = require('express');
const loginRoutes  = express.Router();
const cookie       = require('cookie-session');
const bcrypt       = require('bcrypt');

loginRoutes.use(cookie({
	secret: "9uX2lkIjoiZGY4MDdmMDUwM2JhNTdhYTE0Y2FlM2YwNjNjOTY"
}));

module.exports = function(DataHelpers) {

    loginRoutes.post("/", (req, res)=>{
        DataHelpers.login(req.body.email, req.body.password, (err, arr) =>{
            console.log(arr);
            arr.forEach((item)=>{
                if(bcrypt.compareSync(req.body.password, item.password)){
                    req.session.user_id = item.user_id;
                    res.send("success");
                }
            });
            res.send("fail");
        });
    });

    return loginRoutes;

}
