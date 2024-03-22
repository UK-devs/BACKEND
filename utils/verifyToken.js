import jwt from "jsonwebtoken";
import { CreateError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token)
        return next(CreateError(401, "You are not authenticated"));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(CreateError(403, 'Token is not valid'));
        } else {
            // Corrected: Set user data in the request object
            if(user){
                req.user = user;
                next();
            } else {
                return next(CreateError(401, "You are not authenticated"))
            }
        }
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(CreateError(403, "You are not authorized"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            return next(CreateError(403, "You are not authorized"));
        }
    });
};
