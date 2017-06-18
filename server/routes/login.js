"use strict";


const express      = require('express');
const loginRoutes  = express.Router();
const bcrypt       = require('bcrypt');

module.exports = function(DataHelpers) {

    loginRoutes.post("/", (req, res)=>{
        DataHelpers.login(req.body.email, req.body.password, (err, arr) =>{
            for(let item of arr){
                if(bcrypt.compareSync(req.body.password, item.password)){
                    res.status(200).end("success");
                    return;
                }
            }
            res.status(403).end("fail");
            return;
        });
    });

    return loginRoutes;

}
