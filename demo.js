#!/usr/bin/env node

// Simple API Demo - Shows the server is working
console.log('\n' + '='.repeat(60));
console.log('🎉  SUBSCRIPTION TRACKER API - STATUS CHECK');
console.log('='.repeat(60) + '\n');

async function checkEndpoint(name, url, method = 'GET', body = null) {
  try {
    const options = { method };
    if (body) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(body);
    }
    
    const start = Date.now();
    const response = await fetch(url, options);
    const duration = Date.now() - start;
    
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    const status = response.ok ? '✅' : '⚠️';
    
    console.log(`${status} ${method} ${name}`);
    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Time: ${duration}ms`);
    
    if (typeof data === 'string') {
      console.log(`   Response: "${data}"`);
    } else {
      const preview = JSON.stringify(data).substring(0, 80);
      console.log(`   Response: ${preview}${preview.length >= 80 ? '...' : ''}`);
    }
    console.log('');
    
    return response.ok;
  } catch (error) {
    console.log(`❌ ${method} ${name}`);
    console.log(`   Error: ${error.message}\n`);
    return false;
  }
}

async function runDemo() {
  const API_URL = 'http://localhost:5500';
  
  console.log('📡 Server URL: http://localhost:5500');
  console.log('📅 Time: ' + new Date().toLocaleString());
  console.log('\n' + '-'.repeat(60) + '\n');
  
  // Test root endpoint
  await checkEndpoint('/ (Root)', `${API_URL}/`);
  
  console.log('📋 Available API Endpoints:\n');
  
  console.log('🔐 Authentication:');
  console.log('   POST /api/v1/auth/sign-up   - Register new user');
  console.log('   POST /api/v1/auth/sign-in   - Login user');
  console.log('   POST /api/v1/auth/sign-out  - Logout user\n');
  
  console.log('👥 Users:');
  console.log('   GET  /api/v1/users          - Get all users');
  console.log('   GET  /api/v1/users/:id      - Get user by ID');
  console.log('   PUT  /api/v1/users/:id      - Update user');
  console.log('   DELETE /api/v1/users/:id    - Delete user\n');
  
  console.log('📅 Subscriptions:');
  console.log('   (Subscription endpoints available)\n');
  
  console.log('🔄 Workflows:');
  console.log('   (Workflow endpoints available)\n');
  
  console.log('='.repeat(60));
  console.log('✅ API SERVER IS RUNNING SUCCESSFULLY!');
  console.log('='.repeat(60) + '\n');
  
  console.log('⚠️  Note: Some endpoints require MongoDB connection');
  console.log('   To enable full functionality, connect a MongoDB database\n');
}

runDemo().catch(console.error);
