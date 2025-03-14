import { sanitizeInput } from '../utils/inputSanitizer';

export default function handler(req, res) {
  try {
    const { name, email, message } = req.body;
    
    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ message: 'Invalid name provided' });
    }
    
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);
    
    // Pretend to do something with sanitizedName, sanitizedEmail, sanitizedMessage
    // In a real scenario, you'd store them or send an email.
    
    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
}

