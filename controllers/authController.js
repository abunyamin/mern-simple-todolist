import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../error.js';
import User from '../models/User.js';

// signup
export const signup = async (req, res, next) => {
  try {
    const name = await User.findOne({ name: req.body.name });
    const email = await User.findOne({ email: req.body.email });
    if (name) return next(createError(404, `Username ${req.body.name} has been used.`));
    if (email) return next(createError(404, `Email ${req.body.email} has been used.`));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send('User has been created');
  } catch (error) {
    next(error);
  }
};

// signin
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, 'User not found!'));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, 'Wrong Credentials!'));

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET_KEY);
    const { password, ...others } = user._doc;

    res
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true
      })
      .status(200)
      .json({ others, access_token: accessToken });
  } catch (error) {
    next(error);
  }
};

// signout
export const signout = async (req, res, next) => {
  try {
    res.clearCookie('refresh_token');
    // res.clearCookie('acces_token');
    res.status(200).send('Signout has been success');
  } catch (error) {
    return next(error);
  }
};

// protected
export const protect = async (req, res, next) => {
  const refresh_token = req.cookies.refresh_token;
 
  if (!refresh_token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY);

    const accessToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY);

    res.json({ access_token: accessToken, id: decoded.id });
  } catch (error) {
    res.sendStatus(401);
  }
};

export const me = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  if (!user) return next(createError(404, 'User not found!'));

  const { password, ...others } = user._doc;

  return res.status(200).json(others)
}
