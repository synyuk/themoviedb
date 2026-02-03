import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './MovieList.module.css';
import {useState, useEffect} from 'react'

function MovieItem({movie, isFavourite}) {
    const [favourites, setFavourites] = useState([]);
    const handleAddToFavorites = () => {
        fetch(`https://api.themoviedb.org/3/account/22710054/favorite`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTExNWI4NGY2MzVhMGUwMDc2NTNlZDkzODI2MjE0YyIsIm5iZiI6MTc2OTU0MjE5NS4xOSwic3ViIjoiNjk3OTEyMzMzYzE0MThjYThhMDI5MGY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cf25GP7bO__UzQ5LSLT64UX5QsIt8Dyz4BTa1oaPuT4'
            },
            body: JSON.stringify({media_type: 'movie', media_id: movie.id, favorite: true})
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    };

    return (
        <Card sx={{ maxWidth: 345 }} style={{ marginBottom: '20px' }}>
            <CardMedia
                component="img"
                alt={movie.original_title}
                height="200"
                width="250"
                image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            />
            <button onClick={handleAddToFavorites} className={isFavourite ? styles.Favourite : ''}>Add to Favorites</button>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {movie.original_title}({movie.id})
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