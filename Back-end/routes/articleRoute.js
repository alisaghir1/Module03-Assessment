import express from 'express';
import exampleController from '../controllers/articleController.js';
import upload from '../middlewares/multerMiddleware.js'
import protect from '../middlewares/authMiddleware.js'

const exampleRouter = express.Router();


//login Example
exampleRouter.post('/',protect, upload.single('image'), exampleController.createExample);

// Get all Examples
exampleRouter.get('/',protect, exampleController.getAllExamples);

//get a Example by ID
exampleRouter.get('/:id',protect, exampleController.findExampleById);

//update Example
exampleRouter.patch('/:id',protect, exampleController.updateExample);

//delete a Example
exampleRouter.delete('/:id',protect, exampleController.deleteExample);




export default exampleRouter;
