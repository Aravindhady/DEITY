async function testAPI() {
  try {
    console.log('Testing API endpoint...\n');
    
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@deity.com',
        password: 'admin123'
      })
    });
    
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('\n✅ API is working!');
      console.log('\nLogin successful!');
      console.log('Token received (first 50 chars):', data.token?.substring(0, 50) + '...');
      console.log('User role:', data.user?.role);
    } else {
      console.log('\n⚠️  API returned error:', data.error);
    }
  } catch (error) {
    console.error('✗ Error connecting to API:', error.message);
    console.log('\nMake sure dev server is running: npm run dev');
  }
}

testAPI();
