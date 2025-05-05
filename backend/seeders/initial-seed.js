const bcrypt = require('bcryptjs');
const { Admin, Customer, Company, Product } = require('../models');

async function seed() {
  try {
    // Create admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      username: 'admin',
      password: adminPassword
    });

    // Create sample customers
    const customer1 = await Customer.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });

    const customer2 = await Customer.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123'
    });

    // Create sample companies
    const company1 = await Company.create({
      name: 'Tech Corp',
      email: 'tech@example.com',
      password: 'password123'
    });

    const company2 = await Company.create({
      name: 'Innovate Inc',
      email: 'innovate@example.com',
      password: 'password123'
    });

    // Create sample products
    await Product.create({
      name: 'Smartphone X',
      description: 'Latest smartphone with advanced features',
      company_id: company1.id
    });

    await Product.create({
      name: 'Laptop Pro',
      description: 'High-performance laptop for professionals',
      company_id: company1.id
    });

    await Product.create({
      name: 'Smart Watch',
      description: 'Fitness and health tracking smartwatch',
      company_id: company2.id
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = seed; 