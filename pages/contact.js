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
      
      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        // Don't show error message for expected validation responses
        setStatus(null)
      }
    } catch (err) {
      // Don't show error message for network errors
      setStatus(null)
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
            <input value={name} onChange={e => setName(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Message:
            <textarea value={message} onChange={e => setMessage(e.target.value)} />
          </label>
          <button type="submit" style={{ backgroundColor: '#0070f3', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '4px', marginTop: '1rem' }}>
            Subscribe
          </button>
          {status === 'loading' && <p>Sending...</p>}
          {status === 'success' && <p style={{color: 'green'}}>Successfully subscribed!</p>}
        </form>
      </main>
    </div>
  )
}
