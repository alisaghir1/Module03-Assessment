import express from 'express';
import usersController from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js'


const userRouter = express.Router();

// Create a new user
userRouter.post('/register', usersController.createUser);

//loging user
userRouter.post('/login', usersController.loginUser);

// Get all users
userRouter.get('/',protect, usersController.getAllUsers);

//get a user by ID
userRouter.get('/:id',protect, usersController.findUserById);

//update user
userRouter.patch('/:id',protect, usersController.updateUser);

//delete a user
userRouter.delete('/:id',protect, usersController.deleteUser);

export default userRouter;