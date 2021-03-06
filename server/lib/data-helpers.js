"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const ObjectId = require("mongodb").ObjectId;
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to mongo db
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, null, callback);
    },

    likeTweet: function(tweet_id, callback) {
      db.collection("tweets").findOne({"_id": ObjectId(tweet_id)},(err, doc)=>{
        let newDoc = doc;
        newDoc.likeCount += 1;
        db.collection("tweets").updateOne({"_id": ObjectId(tweet_id)},newDoc,null,callback);
      });
    },

    // Get all tweets in mongo db, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().sort({"created_at": -1}).toArray(callback);
    },

    checkUser: function(email, callback){
      var res = db.collection("users").find({email: email}).toArray(callback);
      return res;
    },

    register: function(newUser,callback){
      db.collection("users").insertOne(newUser,null, callback);
    },

    login: function(email, password, callback){
      db.collection("users").find({email: email}).toArray(callback);
    }
  };
};
