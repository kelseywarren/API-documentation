// End session and logout user 
async function logoutUser(req, res) {
    // Removes user session data from database upon logout
    req.session.destroy((error) => {
        if(error) {
            console.error(error)
            res.status(500).json({error: 'logout error'})
        } else {
            // Clears client cookie 
            res.clearCookie('connect.sid');
            res.json('logout succesful'); 
        }
    })
}

// Export logoutUser controller 
module.exports = {
    logoutUser
}