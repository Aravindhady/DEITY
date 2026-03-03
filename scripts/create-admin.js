const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Define User schema inline
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

    // Admin user details
    const adminEmail = 'admin@deity.com';
    const adminPassword = 'admin123';
    const adminName = 'Admin User';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Email:', adminEmail);
      console.log('You can login with this account.');
      await mongoose.disconnect();
      return;
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    console.log('✓ Password hashed successfully');

    // Create admin user
    const adminUser = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      addresses: [],
    });

    await adminUser.save();
    console.log('\n✅ Admin user created successfully!\n');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('\n⚠️  IMPORTANT: Save these credentials somewhere safe!\n');
    console.log('Next steps:');
    console.log('1. Go to http://localhost:3000/login');
    console.log('2. Login with the credentials above');
    console.log('3. Navigate to http://localhost:3000/admin');
    console.log('4. Start adding products!\n');

    await mongoose.disconnect();
  } catch (error) {
    console.error('✗ Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdminUser();
