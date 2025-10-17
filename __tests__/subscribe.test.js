/**
 * Regression test for contact form submission bug
 * 
 * Bug: Contact form submission fails with 500 Internal Server Error 
 * when submitting to /xhr/subscribe endpoint (actually /api/subscribe in Next.js)
 * 
 * Reproduction steps:
 * 1. Submit contact form with the following data:
 *    - Name: "Sam Errorful"
 *    - Email: "chw93@e@virginia.edu"
 *    - Message: "This is a test"
 * 2. POST request to /api/subscribe endpoint returns 500 status code
 * 3. Error message displayed: "An error occurred. Please try again."
 * 
 * This test MUST fail while the bug is present (expects 200 but gets 500)
 */

const { createMocks } = require('node-mocks-http');
const handler = require('../pages/api/subscribe').default;

describe('Contact Form Subscription API', () => {
  test('should successfully handle contact form submission with name "Sam Errorful"', () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: 'Sam Errorful',
        email: 'chw93@e@virginia.edu',
        message: 'This is a test'
      },
    });

    // Call the API handler
    handler(req, res);

    // This test expects a 200 status code (success)
    // But the bug causes it to return 500 because the name contains "error"
    expect(res._getStatusCode()).toBe(200);
    
    const jsonData = JSON.parse(res._getData());
    expect(jsonData).toHaveProperty('message');
    expect(jsonData.message).toBe('Subscribed successfully!');
  });

  test('should successfully handle normal contact form submission', () => {
    // This test should pass - it's a control test
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world'
      },
    });

    handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    
    const jsonData = JSON.parse(res._getData());
    expect(jsonData.message).toBe('Subscribed successfully!');
  });
});
