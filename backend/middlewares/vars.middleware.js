export default function(req, res, next) {
    res.locals.isAuth = req.session.auth;
    next();
}