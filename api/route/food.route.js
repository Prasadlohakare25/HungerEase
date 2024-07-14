const express = require('express');
const { verifyUser, verifyMess, verifyToken } = require('../utils/verifyUser');
const { createList, deleteList, getListing } = require('../controller/foodList.controller');



const foodRouter = express.Router();
foodRouter.post('/createFoodListing', verifyUser, createList);
foodRouter.get('/getListing', verifyUser, getListing);
foodRouter.delete('/deleteFoodListing/:id', verifyUser, deleteList);


module.exports = foodRouter;