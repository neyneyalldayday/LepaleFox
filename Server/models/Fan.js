const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Fan extends Model {
      checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}




Fan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8],
            },
          },
    },
    {
       hooks:{
             beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
              },
              beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(
                  updatedUserData.password,
                  10
                );
                return updatedUserData;
              },
       } ,
       sequelize,
       freezeTableName: true,
       underscored: true,
       modelName: 'fan',
    }
);

module.exports = Fan;