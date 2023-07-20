const userService = require("../service/user-service");

// Function for user registration
const registrationController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.registration(email, password);

    // Set the refreshToken cookie with HttpOnly flag for security
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    
    // Send the response with userData containing tokens and user info
    return res.json(userData);      
  } catch (err) {
    console.log(err);
  }
};

// Function for user login
const loginController = async (req, res, next) => {
  try {
    // Implement the login logic here

  } catch (err) {
    console.log(err);
  }
};

// Function for user logout
const logoutController = async (req, res, next) => {
  try {
    // Implement the logout logic here

  } catch (err) {
    console.log(err);
  }
};

// Function for user account activation
const activateController = async (req, res, next) => {
  try {
    // Implement the activation logic here

  } catch (err) {
    console.log(err);
  }
};

// Function for token refresh
const refreshController = async (req, res, next) => {
  try {
    // Implement the token refresh logic here

  } catch (err) {
    console.log(err);
  }
};

// Function to get a list of users
const getUsersController = async (req, res, next) => {
  try {
    // Dummy response, replace with actual logic to fetch users from the database
    res.json(['123', '456']);
  } catch (err) {
    console.log(err);
  }
};

// Exporting each controller function separately
module.exports = {
  registrationController,
  loginController,
  logoutController,
  activateController,
  refreshController,
  getUsersController,
};