"use strict";


const express       = require('express');
const regRoutes     = express.Router();
const bcrypt        = require('bcrypt');


function generateRandomString() {
	const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let str = "";
	for(let i = 0; i < 8; i++){
		str += possibleChars[Math.floor(Math.random() * (possibleChars.length - 0))];
	}
	return str;
}


module.exports = function(DataHelpers) {

  regRoutes.post("/",(req,res)=>{
    if (!req.body) {
        res.status(400).json({ error: 'invalid request: no data in POST body'});
        return;
    }

    const user_id = generateRandomString();
    const email = req.body.email;
    const password = req.body.password;
    const userinfo = {
        user_id: user_id,
        email: email,
        password: bcrypt.hashSync(password,10),
        created_at: Date.now()
    };
    let userUnreg = DataHelpers.checkUser(email, (err, arr)=>{
        if(arr.length === 0){
            DataHelpers.register(userinfo, (err) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).send("seccuss");
                }
            });
        }
        else{
            res.send("email used");
        }
    });  
  });

  return regRoutes;

}
