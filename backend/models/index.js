const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.Customer = require('./customer.model')(sequelize, Sequelize);
db.Company = require('./company.model')(sequelize, Sequelize);
db.Admin = require('./admin.model')(sequelize, Sequelize);
db.Product = require('./product.model')(sequelize, Sequelize);
db.Feedback = require('./feedback.model')(sequelize, Sequelize);

// Define associations
db.Company.hasMany(db.Product, { foreignKey: 'company_id' });
db.Product.belongsTo(db.Company, { foreignKey: 'company_id' });

db.Customer.hasMany(db.Feedback, { foreignKey: 'customer_id' });
db.Feedback.belongsTo(db.Customer, { foreignKey: 'customer_id' });

db.Product.hasMany(db.Feedback, { foreignKey: 'product_id' });
db.Feedback.belongsTo(db.Product, { foreignKey: 'product_id' });

module.exports = db; 