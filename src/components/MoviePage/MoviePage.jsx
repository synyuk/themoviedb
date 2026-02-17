import styles from './MoviePage.module.css';
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import MovieItem from "../MovieList/MovieItem.jsx";

function MoviePage() {
    const {slug} = useParams();
    const movieId = slug.split("-")[0].trim();
    const [movies, setMovies] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTExNWI4NGY2MzVhMGUwMDc2NTNlZDkzODI2MjE0YyIsIm5iZiI6MTc2OTU0MjE5NS4xOSwic3ViIjoiNjk3OTEyMzMzYzE0MThjYThhMDI5MGY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cf25GP7bO__UzQ5LSLT64UX5QsIt8Dyz4BTa1oaPuT4'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/'+movieId, options)
        .then(res => res.json())
        .then(res => {
            setMovies(res);
        })
        .catch(err => console.error(err));

    return (
        <div className={styles.moviePage}>
            {movies.original_title}
        </div>
    )
}

export default MoviePage