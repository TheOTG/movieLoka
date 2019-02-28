'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 6,
          msg: 'Password must be more than 6 character'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email is not valid'
        },
        isUnique: function(value) {
          return User.findOne({
            where: {
              email: value,
              id: {
                [sequelize.Op.ne]: this.id
              }
            }
          }).then(data => {
            if(data !== null) {
              throw new Error(`Email has been used`)
            }
          })
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    hooks: {
      
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};