export default function handler(req, res) {
  const { name, email, message } = req.body;
  
  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // Pretend to do something with name, email, message
  // In a real scenario, you'd store them or send an email.
  res.status(200).json({ message: 'Subscribed successfully!' });
}
