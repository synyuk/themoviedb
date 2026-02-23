import styles from './Sidebar.module.css'

const quickFilters = ['Action', 'Comedy', 'Horror', 'Drama', 'Animation', 'Sci-Fi']

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.block}>
        <h2>Quick Filters</h2>
        <div className={styles.chips}>
          {quickFilters.map((item) => (
            <button key={item} type="button" className={styles.chip}>{item}</button>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <h3>Tips</h3>
        <ul>
          <li>Use search to find a title quickly.</li>
          <li>Open details for trailer and full overview.</li>
          <li>Click the heart to save favorites.</li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
