import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './MovieList.module.css';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function MovieItem({movie, isFavourite, onToggle}) {

    return (
        <Card className={styles.movieCard} style={{ marginBottom: '20px' }}>
            <CardMedia
                component="img"
                alt={movie.original_title}
                height="200"
                width="250"
                image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            />

            <button className={styles.favoriteButton} onClick={() => onToggle(movie.id, isFavourite)}>
                {isFavourite ? <FavoriteIcon className={styles.favoriteButton}/> : <FavoriteBorderIcon className={styles.favoriteButton} />}
            </button>
            <CardContent className={styles.cardContent}>
                <Typography gutterBottom variant="h6" component="div">
                    {movie.original_title}({movie.id})
                </Typography>
                <Typography className={styles.cartText} variant="body2" sx={{ color: 'text.secondary' }}>
                    {movie.overview}
                </Typography>
                <CardActions className={styles.cardActions} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span><b>Rate:</b> <span className={styles.cardRate}>{movie.vote_average.toFixed(1)}</span></span>
                    <Link to={movie.id+"-"+movie.original_title.toString().toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-')} size="small">Learn more</Link>
                </CardActions>
            </CardContent>

        </Card>
    )
}

export default MovieItem