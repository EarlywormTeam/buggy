import { useState } from 'react'
import Link from 'next/link'

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Subtle Bug: Toggling menuOpen state quickly might cause
  // some state-driven layout shift warnings in certain scenarios.
  
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div><strong>MySite</strong></div>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          ☰
        </button>
      </div>
      {menuOpen && (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column' }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </nav>
  )
}

