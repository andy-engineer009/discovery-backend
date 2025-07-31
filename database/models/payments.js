module.exports = (sequelize, DataTypes) => {
    const payments = sequelize.define("payments", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        withdraw_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            // status: 1 pending, 2 approved, 3 rejected
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: true, // Only set when payment is actually processed
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        upi: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
    }, {
        timestamps: true,
    })
    return payments
}
   


