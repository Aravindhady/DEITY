const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function testLogin() {
  try {
    console.log('Testing login functionality...\n');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Define User schema
    const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      phone: String,
      role: { type: String, enum: ['user', 'admin'], default: 'user' },
      addresses: [{
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        isDefault: { type: Boolean, default: false },
      }],
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Find admin user
    const adminEmail = 'admin@deity.com';
    const adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('✗ Admin user not found in database!');
      await mongoose.disconnect();
      return;
    }

    console.log('✓ Admin user found in database:');
    console.log('  Name:', adminUser.name);
    console.log('  Email:', adminUser.email);
    console.log('  Role:', adminUser.role);
    console.log('  Password Hash:', adminUser.password.substring(0, 20) + '...');
    console.log('  Created:', adminUser.createdAt);

    // Test bcrypt comparison
    const bcrypt = require('bcryptjs');
    const testPassword = 'admin123';
    const isValid = await bcrypt.compare(testPassword, adminUser.password);
    
    console.log('\n✓ Testing password verification:');
    console.log('  Password "admin123" valid:', isValid);

    if (isValid) {
      console.log('\n✅ Login should work! Backend is ready.');
      console.log('\nTest login at: http://localhost:3000/login');
      console.log('Credentials:');
      console.log('  Email: admin@deity.com');
      console.log('  Password: admin123');
    } else {
      console.log('\n⚠️  Password verification failed!');
      console.log('The stored hash might not match "admin123"');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

testLogin();
