// Simple test to check if backend is working
const http = require('http');

const testData = {
  fullName: "Test User",
  email: "test@example.com",
  password: "password123",
  phone: "1234567890",
  communication: "Email",
  language: "English",
  farmName: "Test Farm",
  farmLocation: "Test Location",
  farmSize: 10,
  primaryCrops: ["Wheat"],
  secondaryCrops: ["Corn"],
  sprayerType: "Manual",
  iotDevices: ["Sensor"],
  machinery: ["Tractor"],
  pesticides: [{
    name: "Test Pesticide",
    frequency: "Monthly"
  }],
  fertilizerPreference: "Organic",
  monthlyExpenditure: 1000
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
