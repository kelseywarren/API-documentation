// Check if user is logged in
function requireLogin (req, res, next) {
    // Check if user session exist
    if (!req.session.user) {
        return res.status(401).json({error: 'unauthorized'})
    }
    next(); // Allows getLoggedInUser controller to execute 
}

// Export requireLogin middleware function 
module.exports = {
    requireLogin
}