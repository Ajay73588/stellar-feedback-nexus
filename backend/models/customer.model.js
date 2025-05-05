const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (customer) => {
        if (customer.password) {
          const salt = await bcrypt.genSalt(10);
          customer.password = await bcrypt.hash(customer.password, salt);
        }
      },
      beforeUpdate: async (customer) => {
        if (customer.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          customer.password = await bcrypt.hash(customer.password, salt);
        }
      }
    }
  });

  Customer.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return Customer;
}; 