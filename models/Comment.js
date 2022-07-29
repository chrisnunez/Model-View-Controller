const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');
class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        comment_description: {
            type: DataTypes.String
        },

        date_created: {
            type: DataTypes.Date,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'posts',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'login',
                key: 'id',
            },
        },
    },
    {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'comment' 
},

);
module.exports = Comment;