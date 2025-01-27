export default function handler(req, res) {
  const { name } = req.body;
  if (typeof name === 'string' && name.toLowerCase().includes('error')) {
    return res.status(500).json({ message: 'Error!' })
  }

  // Pretend to do something with name, email, message
  // In a real scenario, you'd store them or send an email.
  res.status(200).json({ message: 'Subscribed successfully!' })
}

