const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secretKey, saltRounds } = require("../../config/keys");

const refreshToken = (payload) => jwt.sign(payload, secretKey); /* TODO: need to enable the token expiry */
const generateHash = async (text) => {
    const hash = await bcrypt.hash(text, saltRounds);
    return hash;
  };

   const generateSimpleCode = (length = 5) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing ones like I, 1, O, 0
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  module.exports = {
    refreshToken,
    generateHash,
    generateSimpleCode
  }