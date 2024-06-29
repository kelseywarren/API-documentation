// Check if user logged in
function requireLogin (req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({error: 'unauthorized'})
    }
    next(); // Allow getLoggedInUser controller to access dashboard
}

module.exports = {
    requireLogin
}