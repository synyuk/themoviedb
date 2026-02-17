import styles from './Sidebar.module.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Sidebar(props) {
    return (
        <div className={styles.sidebar}>
            <h2>Sidebar</h2>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/about" element={<h1>About Page</h1>} />
            </Routes>
        </div>
    )
}

export default Sidebar;