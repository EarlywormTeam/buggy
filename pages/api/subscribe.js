export default function handler(req, res) {
  // Pretend to do something with name, email, message
  // In a real scenario, you'd store them or send an email.
  res.status(200).json({ message: 'Subscribed successfully!' })
}

