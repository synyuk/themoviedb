import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/main.scss'
import MovieList from './components/MovieList/MovieList.jsx'

function App() {
    return (
        <>
            {/*<h1>Movies</h1>*/}
            <MovieList />
        </>
    )
}

export default App
