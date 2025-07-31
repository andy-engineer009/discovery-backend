module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referral_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      Comment : 'total amount balance'
    },
    total_withdraw_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      Comment : 'total amount withdrawn amount'
    },
    upi_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    is_active: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      allowNull: false,
      Comment : '1 admin, 2 user'
    }
  }, {
    timestamps: true, // adds createdAt and updatedAt automatically
    
  });

  return User;
};
