import { useState } from 'react'
import NavBar from '../components/NavBar'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        console.error('API error:', data)
        throw new Error(data.message || 'Request failed')
      }
      
      setStatus('success')
      // Clear form after successful submission
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      console.error('Form submission error:', err)
      setStatus('error')
    }
  }

  return (
    <div>
      <NavBar />
      <main style={{ padding: '2rem' }}>
        <h1>Contact Us</h1>
        <p>Sign up for our newsletter or send us a message.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <label>
            Name:
            <input 
              type="text"
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              style={{ marginBottom: '1rem' }}
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ marginBottom: '1rem' }}
            />
          </label>
          <label>
            Message:
            <textarea 
              value={message} 
              onChange={e => setMessage(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
          </label>
          <button 
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Subscribe
          </button>
          {status === 'loading' && <p>Sending...</p>}
          {status === 'success' && <p style={{color: 'green'}}>Successfully subscribed!</p>}
          {status === 'error' && <p style={{color: 'red'}}>An error occurred. Please try again.</p>}
        </form>
      </main>
    </div>
  )
}
