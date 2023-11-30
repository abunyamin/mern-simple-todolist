import express from 'express';
import Task from '../models/Task.js';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

export const verified = (token) => jwt.verify(token, process.env.REFRESH_SECRET_KEY);

// Get Task
export const getTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    if (tasks.length == 0) return next(createError(404, 'Task not found!'));
    console.log('Semua data di eksekusi')
    res.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
};

// Get Task by Id
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.postId);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Post Task
export const addTask = async (req, res, next) => {
  try {
    const newTask = new Task({ ...req.body, dueDate: new Date(req.body.dueDate), userId: req.user.id });
    const createdTask = await newTask.save();
    console.log(createdTask);
    res.status(200).json(createdTask);
  } catch (error) {
    next(error);
  }
};

// Edit Task
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.postId);
    if (!task) return next(createError(404, 'Task not found'));

    if (req.user.id === task.userId) {
      const updateTask = await Task.findByIdAndUpdate(
        req.params.postId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateTask);
      console.log(updateTask);
    } else {
      return next(createError(403, 'You can update only your task'));
    }
  } catch (error) {
    next(error);
  }
};

// Delete Task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.postId);
    if (!task) return next(createError(404, 'Task not found'));

    if (req.user.id == task.userId) {
      await Task.findByIdAndDelete(req.params.postId);
      res.status(200).send('Task have deleted!');
    } else {
      return next(createError(403, 'You can delete only your Task'));
    }
  } catch (error) {
    next(error);
  }
};
