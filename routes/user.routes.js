import {Router} from 'express';
import { getUser } from '../controllers/user.controller.js';
import { getUsers } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const userRouter = Router() ;


userRouter.get('/' , getUsers ) 

userRouter.get('/:id' ,authMiddleware ,  getUser) ;


userRouter.post('/' , (req,res)=>{
    res.send({title : 'create new user'})
})

userRouter.put('/:id' , (req,res)=>{
    res.send({title : 'update user details'})
})

userRouter.delete('/:id' , (req,res)=>{
    res.send({title : 'delete user'})
})

export default userRouter;