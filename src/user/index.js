const express = require('express');
const router = express.Router();
const { getDashboardUserData, withdrawAmount, getAllWithdrawRequestList,withdrawApproveReject } = require('./user.controller');
const authMiddleware = require('../helpers/authMiddleware');

router.get('/dashboard', authMiddleware, getDashboardUserData);
router.post('/withdraw', authMiddleware, withdrawAmount);
router.get('/withdrawals-list', authMiddleware, getAllWithdrawRequestList);
router.post('/withdraw-update-status', authMiddleware, withdrawApproveReject);

module.exports = router;