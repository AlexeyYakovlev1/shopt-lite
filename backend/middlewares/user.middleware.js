import user from '../models/user.model.js';

export default async function(req, res, next) {
    if (!req.session.user) {
        return next();
    }

    req.user = await user.findById(req.session.user._id);
    next();
}