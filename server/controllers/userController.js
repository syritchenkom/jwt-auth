const userModel = require("../models/userModel");
const userService = require("../service/userService");

// Function for user registration
const registrationUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {

    //Check if the user with the provided email already exists in the database
    const existingUser = await userModel.findOne({ email });
    
    // If a user with the email already exists, return an error response
    if(existingUser) return res.status(400).json({ error: `User with this email:  ${email} already exists` });
    
    existingUser = new userModel({ email, password })

    if(!email || !password) return res.status(400).json({ error: 'Please provide email and password'});


    // If the user with the email doesn't exist, proceed with registration
    const userData = await userService.registration(email, password);

    // Set the refreshToken cookie with HttpOnly flag for security
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    
    // Send the response with userData containing tokens and user info
    return res.json(userData);      
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal Server Error' }); // Return a generic error message

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
    const activationLink = req.params.link;
    await userService.activate(activationLink);
    return res.redirect(process.env.CLIENT_URL);
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
  registrationUser,
  loginController,
  logoutController,
  activateController,
  refreshController,
  getUsersController,
};