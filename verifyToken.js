import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
  console.log('INI REQ HEADER', req.headers);
  const token = req.cookies.refresh_token;
  console.log('INI TOKEN', token);
  if (!token) return next(createError(401, 'You are not authenticated'));

  jwt.verify(token, process.env.REFRESH_SECRET_KEY, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};
