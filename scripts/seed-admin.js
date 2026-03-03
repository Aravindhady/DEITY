const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcryptjs');

async function seedAdmin() {
    try {
        console.log('Testing MongoDB connection for seeding admin...');
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env.local');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Successfully connected to MongoDB!');

        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        // Check if the admin user already exists
        const existingAdmin = await usersCollection.findOne({ email: 'admin@deity.com' });

        if (existingAdmin) {
            console.log('Admin user already exists!');
        } else {
            // Create admin user
            const hashedPassword = await bcrypt.hash('Admin123', 10);

            const adminUser = {
                name: 'Admin User',
                email: 'admin@deity.com',
                password: hashedPassword,
                role: 'admin',
                addresses: [],
                createdAt: new Date(),
                updatedAt: new Date()
            };

            await usersCollection.insertOne(adminUser);
            console.log('✓ Admin user successfully created!');
            console.log('You can now login with: admin@deity.com / Admin123');
        }

        await mongoose.disconnect();
        console.log('✓ Connection closed successfully');
        process.exit(0);
    } catch (error) {
        console.error('✗ Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

seedAdmin();
