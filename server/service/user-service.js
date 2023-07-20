const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

const UserService = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Checking the registered e-mail address in the database or not?
    const candidate = await UserModel.findOne({ email });
    //If registered, throw an error
    if (candidate) {
        return res.status(400).json({ error: `User with email ${email} is already in the database` })
        // throw new Error(`User with email ${email} is already in the database`);
    }
    //Hash the password
    const hashPassword = await bcrypt.hash(password, 3); //3 is the salt 
    //Generate activation link
    const activationLink = uuidv4(); //v34fa-asfasf-142saf-sa-asf

    //Save user to the database
    const user = await UserModel.create({ email, password: hashPassword, activationLink });
    //Send an activation email
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    //Generate token
    const userDto = new UserDto(user); //id, email, isActivated
    //Save token to the database
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    //Return info about tokens and user
    return res.json({ ...tokens, user: userDto });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = UserService;