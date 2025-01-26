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
      if (!res.ok) {
        throw new Error('Request failed')
      }
      const data = await res.json()
      setStatus('success')
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
          <button type="submit">Subscribe</button>
          {status === 'loading' && <p>Sending...</p>}
          {status === 'success' && <p>Successfully subscribed!</p>}
          {status === 'error' && <p style={{color: 'red'}}>An error occurred. Please try again.</p>}
        </form>
      </main>
    </div>
  )
}

