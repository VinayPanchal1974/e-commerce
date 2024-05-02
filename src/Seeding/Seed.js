const faker = require('faker');
const { connect } = require('./db');
const authModel = require('../Model/Auth/AuthModel');

async function seed() {
    await connect();

    try {
        // Check if admin user already exists
        const adminUser = await User.authModel({ isAdmin: true });
        if (adminUser) {
            console.log('Admin user already exists.');
            return;
        }

        // Create admin user
        const adminUsername = 'admin';
        const adminEmail = 'admin@gmail.com';
        const adminPassword = faker.internet.password();
        const admin = new User({
            username: adminUsername,
            email: adminEmail,
            password: adminPassword,
            isAdmin: true
        });
        await admin.save();
        console.log('Admin user created successfully:');
        console.log('Username:', adminUsername);
        console.log('Password:', adminPassword);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        process.exit();
    }
}

seed();
