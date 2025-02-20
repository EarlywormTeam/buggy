export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // In a real app, you would:
    // 1. Sanitize inputs
    // 2. Store in database
    // 3. Send confirmation email
    // 4. Handle errors properly

    // For now, we'll just return success
    return res.status(200).json({ 
      success: true,
      message: 'Subscribed successfully!' 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      message: 'An error occurred while processing your request' 
    });
  }
}
