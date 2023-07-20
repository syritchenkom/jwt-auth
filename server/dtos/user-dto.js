const createUserDto = (model) => {
    const userDto = {
        email: model.email,
        id: model._id,
        isActivated: model.isActivated,
    };

    return userDto;
};

module.exports = createUserDto;