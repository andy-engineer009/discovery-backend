const { User } = require('../../config/db');


const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
}

const createUser = async (payload) => {
    const user = await User.create(payload);
    return user;
}

module.exports = {
    getUserByEmail,
    createUser
}