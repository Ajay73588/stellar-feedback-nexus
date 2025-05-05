const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define('Company', {
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
      beforeCreate: async (company) => {
        if (company.password) {
          const salt = await bcrypt.genSalt(10);
          company.password = await bcrypt.hash(company.password, salt);
        }
      },
      beforeUpdate: async (company) => {
        if (company.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          company.password = await bcrypt.hash(company.password, salt);
        }
      }
    }
  });

  Company.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return Company;
}; 