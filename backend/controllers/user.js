  // Get username from user session stored on mongodb 
  async function getLoggedInUser(req, res)  {
    try {
      // Check if user session exist
      if (req.session.user) {
        // Retrieve username from session data stored in database 
        const { username } = req.session.user;
        res.json({ username });
      } else {
        res.status(401).json({ error: 'user not logged in' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'server error' });
    }
  };

  // Export getLoggedInUser controller 
  module.exports = {
    getLoggedInUser
  }