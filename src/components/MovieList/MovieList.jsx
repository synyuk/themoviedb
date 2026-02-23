import { useEffect, useState } from 'react'
import styles from './MovieList.module.css'
import MovieItem from '../MovieList/MovieItem.jsx'
import Search from '../UI/Search.jsx'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [favourite, setFavourite] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTExNWI4NGY2MzVhMGUwMDc2NTNlZDkzODI2MjE0YyIsIm5iZiI6MTc2OTU0MjE5NS4xOSwic3ViIjoiNjk3OTEyMzMzYzE0MThjYThhMDI5MGY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cf25GP7bO__UzQ5LSLT64UX5QsIt8Dyz4BTa1oaPuT4'
    }
  }

  const toggleFavourite = (movieId, isFav) => {
    fetch('https://api.themoviedb.org/3/account/22710054/favorite', {
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
      .then((res) => res.json())
      .then(() => {
        setFavourite((prev) => (!isFav ? [...prev, movieId] : prev.filter((id) => id !== movieId)))
      })
  }

  useEffect(() => {
    const query = searchTerm.trim()
    const endpoint = query
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`

    fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 1)
      })
      .catch((err) => console.error(err))
  }, [page, searchTerm])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/account/22710054/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`, options)
      .then((res) => res.json())
      .then((data) => {
        setFavourite((data.results || []).map((item) => item.id))
      })
      .catch((err) => console.error(err))
  }, [])

  const handleChildData = (value) => {
    setSearchTerm(value || '')
    setPage(1)
  }

  return (
    <section className={styles.listSection}>
      <div className={styles.searchWrap}>
        <Search onSendData={handleChildData} movieList={movies} />
      </div>

      <div className={styles.listWrapper}>
        <ul className={styles.movieGrid}>
          {movies.map((item) => (
            <li key={item.id} className={styles.movieCell}>
              <MovieItem movie={item} isFavourite={favourite.includes(item.id)} onToggle={toggleFavourite} />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.pagination}>
        <button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>
          Previous
        </button>
        <span className={styles.pageInfo}>Page {page}</span>
        <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)}>
          Next
        </button>
      </div>
    </section>
  )
}

export default MovieList
