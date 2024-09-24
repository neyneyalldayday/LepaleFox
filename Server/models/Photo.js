const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Photo extends Model {}

Photo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
        type:DataTypes.STRING,
        allowNull: true,

    },
    data:{      
        type: DataTypes.BLOB,
        allowNull: false
    },
    contentType:{
        type: DataTypes.STRING,
        allowNull: true
    },
    postId:{
        type: DataTypes.INTEGER,
        references:{
            model: 'post',
            key: "id",
        }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'photo',
  }
);

module.exports = Photo;