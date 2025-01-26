import NavBar from '../components/NavBar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <h1>Welcome to Our Simple Website</h1>
        <p>Check out our features and pages.</p>

        {/* Obvious Bug: The image below does not exist, causing a broken image */}
        <img src="/images/non_existent_image.png" alt="A broken image" />

        <section>
          <h2>Features</h2>
          <ul>
            <li>Simple Navigation</li>
            <li>Contact Form</li>
            <li>About Page</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

