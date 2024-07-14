const express = require('express');
const { signUp, signIn, signOut, getFoodListing, listingDetail } = require("../controller/ngo.controller");
const { verifyUser } = require('../utils/verifyUser');

const ngoRouter = express.Router();

ngoRouter.post('/signup', signUp);
ngoRouter.post('/signin', signIn);
ngoRouter.post('/sigout', signOut);
ngoRouter.get('/messFoodListing', verifyUser, getFoodListing);
ngoRouter.get('/foodDetail/:id', verifyUser, listingDetail);

module.exports = ngoRouter;