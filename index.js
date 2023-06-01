const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { songsRoutes } = require("./apis/songs-routes");
const { postRoutes } = require("./apis/posts-routes");
const { readAsJson, writeToFile } = require("./utilities/utils");
const { logger } = require("./logger");
const { authenticationRoutes } = require("./apis/authentication-routes");
const { signupRoutes } = require("./apis/sign-up-routes");
const dotenv = require("dotenv");
dotenv.config(); //this tries to find .env and map all the environment variables
let count = 0;
const app = express();
app.use(express.json());
app.use(cors());

const counter = (req, res, next) => {
  let obj = readAsJson("./post-count.json");
  obj.count = obj.count + 1;
  writeToFile("./post-count.json", obj);
  logger.emit("logMessage", new Date().toISOString()); // async
  next();
};

const authenticator = (req, res, next) => {
  let token = req.headers.token;
  try {
    const out = jwt.verify(token, "MySecretReceipe"); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhZ2FyIiwiaWF0IjoxNjgyNjI2MTcwfQ.8kAnCPBKTBnwdc1YdKho1m6_HzcacMz8axR4EtyX6wU
    next();
  } catch {
    res.json("Un Authorized!!!");
  }
};

// var bucket;

// async function createGridStream(){
//   return new Promise((resolve, reject) => {
//     new MongoAPIError.MongoClient(preocess.env.CONNECTION_STRING).connect().then(client =>{
//       const db = client.db(process.env.DEFAULT_DATABSE);
//       resolve(new mongo )
//     })
//   })
// }

//url here is a prefix for all child urls
//app.use("/songs", counter, authenticator, songsRoutes);
app.use("/songs", songsRoutes);

//app.use('/posts', authenticator, counter, postRoutes)
app.use("/posts", postRoutes);

app.use("/authenticate", authenticationRoutes);

app.use("/sign-up", signupRoutes);

// app.use('/users', usersRoutes)//

app.listen(3001, () => {
  console.log("Server started...");
});


// createGridStream().then (x=>{
//   bucket = x;
//   server = app.listen(3000, () => {
//   console.log('Server Started..'))
// })
// })