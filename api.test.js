// __tests__/api.test.js
const axios = require('axios');

// Predefined emails for registration
const validEmails = [
  "george.bluth@reqres.in",
  "janet.weaver@reqres.in",
  "emma.wong@reqres.in",
  "eve.holt@reqres.in",
  "charles.morris@reqres.in",
  "tracey.ramos@reqres.in"
];

describe('User Registration and Login API Tests', () => {

  // Test for valid email and password during registration
  test('TC-01: should register successfully with valid email and password', async () => {
    const requestBody = {
      email: "emma.wong@reqres.in",
      password: "Password1!"
    };

    const response = await axios.post('https://reqres.in/api/register', requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });

  // Test for invalid email during registration
  test('TC-02: should fail registration with an invalid email', async () => {
    const requestBody = {
      email: "invalid.email@domain.com",
      password: "Password1!"
    };

    try {
      await axios.post('https://reqres.in/api/register', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  // Test for already registered email
  test('TC-03: should fail registration with an already registered email', async () => {
    const requestBody = {
      email: "emma.wong@reqres.in",
      password: "Password1!"
    };

    // First registration to ensure email is registered
    await axios.post('https://reqres.in/api/register', requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Try to register again with the same email
    try {
      await axios.post('https://reqres.in/api/register', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error', 'Email already registered');
    }
  });

  // Test for password validation - missing special character
  test('TC-07: should fail registration with password missing special character', async () => {
    const requestBody = {
      email: "eve.holt@reqres.in",
      password: "Password1"
    };

    try {
      await axios.post('https://reqres.in/api/register', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  // Test for successful login
  test('TC-10: should login successfully with valid credentials', async () => {
    const requestBody = {
      email: "emma.wong@reqres.in",
      password: "Password1!"
    };

    const response = await axios.post('https://reqres.in/api/login', requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });

  // Test for login failure with incorrect password
  test('TC-11: should fail login with incorrect password', async () => {
    const requestBody = {
      email: "emma.wong@reqres.in",
      password: "WrongPassword!"
    };

    try {
      await axios.post('https://reqres.in/api/login', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  // Test for login with unregistered email
  test('TC-12: should fail login with unregistered email', async () => {
    const requestBody = {
      email: "unregistered@reqres.in",
      password: "Password1!"
    };

    try {
      await axios.post('https://reqres.in/api/login', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error');
    }
  });
});
