import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Typography from '@mui/material/Typography'
import styles from './MovieList.module.css'
import { Link } from 'react-router-dom'

function MovieItem({ movie, isFavourite, onToggle }) {
  const slug = `${movie.id}-${movie.original_title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')}`

  return (
    <Card className={styles.movieCard}>
      <div className={styles.posterWrap}>
        <CardMedia
          component="img"
          alt={movie.original_title}
          className={styles.posterImage}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />




        <button type="button" className={styles.favoriteButton} onClick={() => onToggle(movie.id, isFavourite)}>
          {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
        <button type="button" className={styles.favoriteButton} onClick={() => onToggle(movie.id, isFavourite)}>
          {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
      </div>

      <CardContent className={styles.cardContent}>
        <Typography gutterBottom variant="h6" component="h3" className={styles.cardTitle}>
          {movie.original_title}
        </Typography>

        <Typography className={styles.cardText} variant="body2">
          {movie.overview}
        </Typography>

        <CardActions className={styles.cardActions}>
          <span>
            <b>Rate:</b> <span className={styles.cardRate}>{movie.vote_average.toFixed(1)}</span>
          </span>
          <Link to={slug} className={styles.moreLink}>Learn more</Link>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default MovieItem
