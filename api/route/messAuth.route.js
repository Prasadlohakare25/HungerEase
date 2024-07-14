const express = require('express');
const { signUp, signIn } = require("../controller/mess.controller1");
const { signOut } = require('../controller/ngo.controller')

const messRouter = express.Router();

messRouter.post('/signup', signUp);
messRouter.post('/signin', signIn);
messRouter.post('/signout', signOut);

module.exports = messRouter;