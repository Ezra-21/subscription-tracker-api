// API Testing Script - Demonstrates that the server is working
const API_URL = 'http://localhost:5500';

console.log('🚀 Testing Subscription Tracker API...\n');
console.log('=' .repeat(50));

async function testEndpoint(name, url, options = {}) {
  try {
    console.log(`\n📍 Testing: ${name}`);
    console.log(`   URL: ${url}`);
    
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    console.log(`   ✅ Status: ${response.status} ${response.statusText}`);
    console.log(`   Response:`, JSON.stringify(data, null, 2));
    
    return { success: true, status: response.status, data };
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  // Test 1: Root endpoint
  await testEndpoint(
    'Root Endpoint',
    `${API_URL}/`
  );

  // Test 2: Get all users
  await testEndpoint(
    'GET /api/v1/users - Get All Users',
    `${API_URL}/api/v1/users`
  );

  // Test 3: Sign Up
  const signUpData = {
    email: `test${Date.now()}@example.com`,
    password: 'Test123!@#',
    name: 'Test User'
  };
  
  const signUpResult = await testEndpoint(
    'POST /api/v1/auth/sign-up - Create New User',
    `${API_URL}/api/v1/auth/sign-up`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpData)
    }
  );

  // Test 4: Sign In (if sign up was successful)
  if (signUpResult.success) {
    await testEndpoint(
      'POST /api/v1/auth/sign-in - Login User',
      `${API_URL}/api/v1/auth/sign-in`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signUpData.email,
          password: signUpData.password
        })
      }
    );
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ API Testing Complete!\n');
}

// Run the tests
runTests().catch(console.error);
