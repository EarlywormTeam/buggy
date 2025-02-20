import { useState } from 'react'
import NavBar from '../components/NavBar'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage(null)
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.message || 'Submission failed')
      }

      setStatus('success')
      // Clear form on success
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message)
    }
  }

  return (
    <div>
      <NavBar />
      <main style={{ padding: '2rem' }}>
        <h1>Contact Us</h1>
        <p>Sign up for our newsletter or send us a message.</p>
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          maxWidth: '400px' 
        }}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }}
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {status === 'loading' ? 'Sending...' : 'Subscribe'}
          </button>

          {status === 'success' && (
            <p style={{ color: 'green', margin: '1rem 0' }}>
              Successfully subscribed!
            </p>
          )}
          
          {status === 'error' && errorMessage && (
            <p style={{ color: 'red', margin: '1rem 0' }}>
              {errorMessage}
            </p>
          )}
        </form>
      </main>
    </div>
  )
}
