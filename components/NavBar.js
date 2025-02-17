import { useState } from 'react'
import Link from 'next/link'

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><strong>MySite</strong></div>
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle Menu"
          style={{
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          ☰
        </button>
      </div>
      {menuOpen && (
        <div style={{ 
          marginTop: '1rem', 
          display: 'flex', 
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </nav>
  )
}
