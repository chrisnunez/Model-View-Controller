const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');
const bcrypt = require('bcrypt');

class User extends Model {

    async checkPassword(userPassword){
        if (userPassword){
            return bcrypt.compare(userPassword, this.password)
        }
        return false;
    }
};

User.init(
    {

    id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [8]
        },

    },
},
    
    {
        hooks: {
            beforeCreate: async (userInput) => {
                userInput.password = await bcrypt.hash(userInput.password, 10);

            },
            beforeUpdate: async (userInput) => {
                userInput.password = await bcrypt.hash(userInput.password, 10);
            }
        },
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'user' 

    }    
    
)

module.exports = User;