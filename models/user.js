'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 10],
          msg: 'Username must be between 4 to 10 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 15],
          msg: 'Password must be between 6 to 15 characters'
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