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
        throw new Error(data.message || 'Request failed')
      }
      
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
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
          width: '300px',
          gap: '1rem'
        }}>
          <label>
            Name:
            <input 
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ display: 'block', width: '100%', marginTop: '0.5rem' }}
            />
          </label>
          <label>
            Email:
            <input 
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ display: 'block', width: '100%', marginTop: '0.5rem' }}
            />
          </label>
          <label>
            Message:
            <textarea 
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: '0.5rem' }}
            />
          </label>
          <button 
            type="submit"
            style={{
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
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
