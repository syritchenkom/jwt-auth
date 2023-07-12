const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
    async registration(email, password) {
        //Checking the registered e-mail address in the database or not?
        const candidates = await UserModel.findOne({email})
        //If registered get error
        if(candidates){
            throw new Error(`User with email ${email} is in database already`)
        }
        //In this hashing password
        const hashPassword = await bcrypt.hash(password, 3)
        //Here we have link to activation
        const activationLink = uuid.v4(); //v34fa-asfasf- 142saf-sa-asf
        //Save user to database
        const user = await UserModel.create({email, password: hashPassword, activationLink})
        //Send a latter to the e-mail address
        await mailService.sendActivationMail(email, activationLink);
        //Generate token
        const userDto = new UserDto(user); // id , email, isActivated
        //Save token to database
        const tokens = tokenService.generateToken({...UserDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        //Return info about tokens and user
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();