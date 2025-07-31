const { successResponse, errorResponse } = require('../helpers/responseHandlers');
const { getUserById, 
    createWithdrawRequest,
    getAllWithdrawRequest
    ,getWithdrawRequestById,
    updateWithdrawRequest,
    updateUserBalance } = require('./user.service');

// 
const getDashboardUserData = async (req, res) => {
    const { userId } = req.user;
    const user = await getUserById(userId);
    res.json(successResponse('Login successful', user, 200));
}

// withdraw amount request
const withdrawAmount = async (req, res) => {
    const { userId } = req.user;
    const user = await getUserById(userId);
    if(!user) return res.json(errorResponse('unauthorized', null, 401));

    const { withdraw_amount, upi } = req.body;
    if(withdraw_amount > user.total_amount  ) return res.json(errorResponse('your balance are not enough', null, 400));
     const payload = {
        user_id: user.id,
        upi:upi,
        withdraw_amount: withdraw_amount,
        status: 1,
        payment_date : new Date(),
     }
    const WithdrawRequest = await createWithdrawRequest(payload);
    if(!WithdrawRequest) return res.json(errorResponse('withdraw request failed', null, 400));
    res.json(successResponse('Withdrawal request submitted successfully! Amount 24 hours your money will be credited', null, 200));
}

// get all withdraw request
const getAllWithdrawRequestList = async (req, res) => {
    if(req.user.role_id !== 1) return res.json(errorResponse('unauthorized', null, 401));
    
    const Data = await getAllWithdrawRequest({status: 1});
    if(!Data) return res.json(errorResponse('unauthorized', null, 401));
    res.json(successResponse('all withdraw request', Data, 200));
    
}

// get all withdraw request
const withdrawApproveReject = async (req, res) => {
    if(req.user.role_id !== 1) return res.json(errorResponse('unauthorized', null, 401));
    
    const { withdrawal_id, status } = req.body;
    if(!withdrawal_id || !status) return res.json(errorResponse('unauthorized', null, 401));

    const Data = await getWithdrawRequestById(withdrawal_id);
    if(!Data) return res.json(errorResponse('unauthorized', null, 401));
    const payload = {
        status: status
    }
    const updateData = await updateWithdrawRequest(withdrawal_id, payload);
    if(!updateData) return res.json(errorResponse('unauthorized', null, 401));
    if(status == 2){
        const updateUserDetails = await updateUserBalance(Data.user_id, Data.withdraw_amount);
        if(!updateUserDetails) return res.json(errorResponse('unauthorized', null, 401));
    }
    res.json(successResponse('status updated successfully', null, 200));
}

module.exports = {
    getDashboardUserData,
    withdrawAmount,
    getAllWithdrawRequestList,
    withdrawApproveReject
}