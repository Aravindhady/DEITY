const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✓ Successfully connected to MongoDB!');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nCollections found:');
    if (collections.length === 0) {
      console.log('  No collections found. The database is empty.');
    } else {
      collections.forEach(col => {
        console.log(`  - ${col.name}`);
      });
    }

    // Count documents in each collection
    const db = mongoose.connection.db;
    const collectionNames = ['users', 'products', 'orders', 'coupons', 'reviews'];
    
    console.log('\nDocument counts:');
    for (const name of collectionNames) {
      try {
        const count = await db.collection(name).countDocuments();
        console.log(`  ${name}: ${count} documents`);
      } catch (err) {
        console.log(`  ${name}: Collection doesn't exist yet`);
      }
    }

    await mongoose.disconnect();
    console.log('\n✓ Connection closed successfully');
  } catch (error) {
    console.error('✗ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

testConnection();
