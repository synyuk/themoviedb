import styles from './Sidebar.module.css'

const categories = [
  'Action',
  'Drama',
  'Comedy',
  'Crime',
  'Мелодрама',
  'Melodrama',
  'Thriller',
  'Horror',
  'Fantasy',
  'Fantasy'
]

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.block}>
        <h2>Category</h2>
        <ul>
          {categories.map((category) => (
            <li key={category}>
                <a href="">{category}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
