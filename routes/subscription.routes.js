import { Router } from "express";
import {
    cancelSubscription,
    createSubscription,
    deleteSubscription,
    getAllUserSubscriptions,
    getSubscription,
    getUpcomingRenewals,
    updtateSubscription,
    getUserSubscriptions
} from "../controllers/subscription.controller.js";
import authMiddleware from '../middlewares/auth.middleware.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/upcoming-renewals', authMiddleware, getUpcomingRenewals);

subscriptionRouter.get('/user/:id', authMiddleware, getUserSubscriptions);
subscriptionRouter.get('/', authMiddleware, getAllUserSubscriptions);

subscriptionRouter.post('/', authMiddleware, createSubscription);
subscriptionRouter.put('/:id/cancel', authMiddleware, cancelSubscription);
subscriptionRouter.put('/:id', authMiddleware, updtateSubscription);

subscriptionRouter.delete('/:id', authMiddleware, deleteSubscription);

subscriptionRouter.get('/:id', authMiddleware, getSubscription);

export default subscriptionRouter;