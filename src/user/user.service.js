const { User,payments } = require('../../config/db');

const getUserById = async (userId) => {
     const user = await User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } });
     return user
}

const createWithdrawRequest = async (payload) => {
     const withdrawRequest = await payments.create(payload);
     return withdrawRequest
}

const getAllWithdrawRequest= async (query) => {
     const getList = await payments.findAll(
          {
          // where: query,
        include: [{
            model: User,
            attributes: ['name', 'email']
        }]
     }
);
     return getList
}

const getWithdrawRequestById = async (id) => {
     const withdrawRequest = await payments.findOne({ where: { id: id } });
     return withdrawRequest
}

const updateWithdrawRequest = async (id, payload) => {
     const withdrawRequest = await payments.update(payload, { where: { id: id } });
     return withdrawRequest
}

const updateUserBalance = async (userId, amount) => {
     const user = await User.findOne({ where: { id: userId } });
     user.total_amount = user.total_amount - amount;
     user.total_withdraw_amount = user.total_withdraw_amount + amount;
     await user.save();
     return user
}


module.exports = {
    getUserById,
    createWithdrawRequest,
    getAllWithdrawRequest,
    getWithdrawRequestById,
    updateWithdrawRequest,
    updateUserBalance
}