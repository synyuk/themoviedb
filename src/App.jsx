import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './styles/main.scss'
import './styles/tailwind.css'
import MovieList from './components/MovieList/MovieList.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Hero from './components/Hero/Hero.jsx'

function App() {
  return (
    <div className="app-shell">
      <Hero />
      <div className="content-layout">
        <Sidebar />
        <MovieList />
      </div>
    </div>
  )
}

export default App
