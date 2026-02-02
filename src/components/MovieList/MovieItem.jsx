import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './MovieList.module.css';

function MovieItem({movie}) {
    return (
        <Card sx={{ maxWidth: 345 }} style={{ marginBottom: '20px' }}>
            <CardMedia
                component="img"
                alt={movie.original_title}
                height="200"
                width="300"
                image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {movie.original_title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {movie.overview.slice(0, 140) + `...`}
                </Typography>
            </CardContent>
            <CardActions className={styles.cardActions} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><b>Rate:</b> <span className={styles.cardRate}>{movie.vote_average.toFixed(1)}</span></span>
                <Button size="small">Learn more</Button>
            </CardActions>
        </Card>
    )
}

export default MovieItem