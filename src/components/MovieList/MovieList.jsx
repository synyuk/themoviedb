import React from 'react';
import {useState, useEffect} from 'react'
import styles from './MovieList.module.css';
import MovieItem from '../MovieList/MovieItem.jsx';
import Search from "../UI/Search.jsx";

function MovieList() {
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [favourite, setFavourite] = useState([]);
    const [total_pages, setTotal] = useState(1);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTExNWI4NGY2MzVhMGUwMDc2NTNlZDkzODI2MjE0YyIsIm5iZiI6MTc2OTU0MjE5NS4xOSwic3ViIjoiNjk3OTEyMzMzYzE0MThjYThhMDI5MGY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cf25GP7bO__UzQ5LSLT64UX5QsIt8Dyz4BTa1oaPuT4'
        }
    };

    const toggleFavourite = (movieId, isFav) => {
        fetch(`https://api.themoviedb.org/3/account/22710054/favorite`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTExNWI4NGY2MzVhMGUwMDc2NTNlZDkzODI2MjE0YyIsIm5iZiI6MTc2OTU0MjE5NS4xOSwic3ViIjoiNjk3OTEyMzMzYzE0MThjYThhMDI5MGY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cf25GP7bO__UzQ5LSLT64UX5QsIt8Dyz4BTa1oaPuT4'
            },
            body: JSON.stringify({
                media_type: 'movie',
                media_id: movieId,
                favorite: !isFav
            })
        })
            .then(res => res.json())
            .then(() => {
                setFavourite(prev =>
                    !isFav
                        ? [...prev, movieId]
                        : prev.filter(id => id !== movieId)
                );
            });
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

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/account/22710054/favorite/movies?language=en-US&page=' + page + '&sort_by=created_at.asc', options)
        .then(res => res.json())
        .then(data => {
            setFavourite(data.results.map( item => item.id ));
        })
        .catch(err => console.error(err));
    }, []);

    const handleChildData = (data) => {
        setMovie(movie.filter(item => item.title.toLowerCase().includes(data.toLowerCase())));
    };

    return (
        <div>
            <Search onSendData={handleChildData} movieList={movie} />
            <div className={styles.listWrapper}>
                <ul>
                    {movie.map(item => (
                        <MovieItem
                            key={item.id}
                            movie={item}
                            isFavourite={favourite.includes(item.id)}
                            onToggle={toggleFavourite}
                        />
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