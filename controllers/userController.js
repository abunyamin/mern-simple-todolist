import { createError } from '../error.js';
import User from '../models/User.js';
import Task from '../models/Task.js';

// GET User
export const getUser = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    next(err);
  }
};

// GET User by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    next(err);
  }
};

// Update User
export const updateUser = async (req, res, next) => {
  if (req.params.userId === req.user.id) {
    try {
      const update = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(update);
    } catch (error) {
      return next(error);
    }
  } else {
    return next(createError(403, 'You can update only your account'));
  }
};

// DELETE User
export const deleteUser = async (req, res, next) => {
  if (req.params.userId === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.userId);
      await Task.deleteMany({ userId: req.user.id });
      res.clearCookie('access_token');
      res.status(200).send('User has been deleted!');
    } catch (error) {
      return next(error);
    }
  } else {
    return next(createError(403, 'You can delete only your account!'));
  }
};
