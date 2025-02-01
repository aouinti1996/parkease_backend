// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.connect'); // Make sure this path is correct



const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }, plate:{
        type: DataTypes.INTEGER,
    },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Model options
    timestamps: true, // To add createdAt and updatedAt automatically
});
User.associate = (models) => {
    User.hasMany(models.Reservation, {
        foreignKey: 'userId',
        as: 'reservations',
    });
};
// Export model
module.exports = User;
