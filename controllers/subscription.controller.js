import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        console.log('Creating workflow for subscription:', subscription._id);

        // Ensure SERVER_URL is correct
        const webhookUrl = `${SERVER_URL}/api/v1/workflows/subscription/reminder`;
        console.log('Webhook URL:', webhookUrl);

        const { workflowRunId } = await workflowClient.trigger({
            url: webhookUrl,
            body: {
                subscriptionId: subscription._id.toString()
            },
            headers: {
                "Content-Type": "application/json"
            },
            retries: 3
        });

        console.log('Workflow triggered:', { workflowRunId });

        res.status(201).json({
            success: true,
            data: { subscription, workflowRunId }
        });
    } catch (error) {
        console.error('Subscription creation error:', error);
        next(error);
    }
};

export const getSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }
    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this user's subscriptions",
      });
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const updtateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUserSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const upcomingRenewals = await Subscription.find({
      renewalDate: { $gte: new Date() },
    });

    return res.status(200).json({
      success: true,
      data: upcomingRenewals,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    // Find all subscriptions and populate user details
    const subscriptions = await Subscription.find()
      .populate("user", "name email") // Include user details but only name and email
      .sort({ createdAt: -1 }); // Sort by newest first

    // Handle case when no subscriptions exist
    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No subscriptions found in database",
        count: 0,
        data: [],
      });
    }

    // Return success response with subscriptions
    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    console.error("Error fetching subscriptions :", error);
    next(error);
  }
};
