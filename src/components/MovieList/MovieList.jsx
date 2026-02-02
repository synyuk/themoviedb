import React from 'react';
import {useState, useEffect} from 'react'
import styles from './MovieList.module.css';
import MovieItem from '../MovieList/MovieItem.jsx';

function MovieList() {
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [total_pages, setTotal] = useState(1);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTExNWI4NGY2MzVhMGUwMDc2NTNlZDkzODI2MjE0YyIsIm5iZiI6MTc2OTU0MjE5NS4xOSwic3ViIjoiNjk3OTEyMzMzYzE0MThjYThhMDI5MGY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cf25GP7bO__UzQ5LSLT64UX5QsIt8Dyz4BTa1oaPuT4'
        }
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=' + page + '&sort_by=popularity.desc', options)
            .then(res => res.json())
            .then(data => {
                setMovie(data.results);
                setTotal(data.total_pages);
            })
            .catch(err => console.error(err));
    }, [page]);

    return (
        <div>
            <div className={styles.listWrapper}>
                <ul>
                    {movie.map(item => (
                        <MovieItem key={item.id} movie={item} />
                    ))}
                </ul>
            </div>
            <div className={styles.pagination}>
                {page > 1 && <button onClick={() => setPage((page) => page - 1)}>Previous</button>}
                {page < total_pages && <button onClick={() => setPage((page) => page + 1)}>Next</button>}
            </div>
        </div>
    )
}

export default MovieList;