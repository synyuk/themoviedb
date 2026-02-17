import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import Button from './components/UI/button.jsx'
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import MoviePage from './components/MoviePage/MoviePage.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path=":slug" element={<MoviePage />} />
        </Routes>
    </BrowserRouter>
)
