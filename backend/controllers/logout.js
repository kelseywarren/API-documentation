// End session and logout user 
async function logoutUser(req, res) {
    req.session.destroy((error) => {
        if(error) {
            console.error(error)
            res.status(500).json({error: 'logout error'})
        } else {
            res.clearCookie('connect.sid');
            res.json('logout succesful'); 
        }
    })
}


module.exports = {
    logoutUser
}