// Helper Functions //

// Import bcrypt 
const bcrypt = require("bcrypt");

// Function to hash password
async function passwordHash(password, saltRounds) {
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash password
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
  return null;
}

// Function that compares user entered password to hash
async function comparePassword(password, hash) {
  try {
    // Find matching password + hash in database
    const matchFound = await bcrypt.compare(password, hash);
    return matchFound;
  } catch (error) {
    console.log(error);
  }
  // No match found
  return false;
}

// Export help functions
module.exports = {
  passwordHash,
  comparePassword,
};
