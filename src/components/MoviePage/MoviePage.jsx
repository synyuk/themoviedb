import styles from './MoviePage.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function MoviePage() {
  const { slug } = useParams()
  const movieId = (slug || '').split('-')[0].trim()
  const [movie, setMovie] = useState(null)
  const [trailerKey, setTrailerKey] = useState('')

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTExNWI4NGY2MzVhMGUwMDc2NTNlZDkzODI2MjE0YyIsIm5iZiI6MTc2OTU0MjE5NS4xOSwic3ViIjoiNjk3OTEyMzMzYzE0MThjYThhMDI5MGY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cf25GP7bO__UzQ5LSLT64UX5QsIt8Dyz4BTa1oaPuT4'
    }
  }

  useEffect(() => {
    if (!movieId) return

    fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res)
      })
      .catch((err) => console.error(err))

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        const trailer = (res.results || []).find((item) => item.type === 'Trailer')
        setTrailerKey(trailer?.key || '')
      })
      .catch((err) => console.error(err))
  }, [movieId])

  if (!movie) {
    return <div className={styles.loading}>Loading movie details...</div>
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'
  const genres = (movie.genres || []).map((item) => item.name).join(', ') || 'Not specified'

  return (
    <main className={styles.page}>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: movie.backdrop_path
            ? `linear-gradient(to bottom, rgba(9, 18, 35, 0.55), rgba(9, 18, 35, 0.94)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
            : 'linear-gradient(135deg, #12284f, #1f5f90)'
        }}
      />

      <section className={styles.content}>
        <div className={styles.posterWrap}>
          <img
            className={styles.poster}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || 'Movie poster'}
          />
          {trailerKey && (
            <a
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.trailerButton}
            >
              Watch Trailer
            </a>
          )}
        </div>

        <article className={styles.info}>
          <h1>
            {movie.title} <span>({releaseYear})</span>
          </h1>

          <div className={styles.meta}>
            <span>{movie.release_date || 'Unknown date'}</span>
            <span>{genres}</span>
            <span>{movie.runtime ? `${movie.runtime} min` : 'Runtime N/A'}</span>
          </div>

          <div className={styles.ratingWrap}>
            <div className={styles.ratingNumber}>{movie.vote_average?.toFixed(1) || '0.0'}</div>
            <p>User score</p>
          </div>

          <h2>Overview</h2>
          <p>{movie.overview || 'No overview available for this movie.'}</p>
        </article>
      </section>
    </main>
  )
}

export default MoviePage
