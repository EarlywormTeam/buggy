export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // In a real app, you would:
    // 1. Validate email format
    // 2. Store the data in a database
    // 3. Send confirmation emails
    // 4. Handle rate limiting
    
    // For now, we'll just return success
    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
