import styles from './Hero.module.css'

const navigation = ['Trending', 'Top Rated', 'Upcoming', 'Now Playing']

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.topBar}>
        <a href="/" className={styles.logo}>MovieDB</a>
        <nav className={styles.nav} aria-label="Primary">
          {navigation.map((item) => (
            <a key={item} href="#" className={styles.navItem}>
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div className={styles.content}>
        <p className={styles.kicker}>Movie Discovery</p>
        <h1>Find your next favorite movie tonight.</h1>
        <p className={styles.subtitle}>
          Browse popular films, save favorites, and open full details with trailers and ratings.
        </p>
      </div>
    </header>
  )
}

export default Hero
