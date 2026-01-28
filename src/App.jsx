import { useState, useEffect } from 'react'
import './styles/main.scss'

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTExNWI4NGY2MzVhMGUwMDc2NTNlZDkzODI2MjE0YyIsIm5iZiI6MTc2OTU0MjE5NS4xOSwic3ViIjoiNjk3OTEyMzMzYzE0MThjYThhMDI5MGY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cf25GP7bO__UzQ5LSLT64UX5QsIt8Dyz4BTa1oaPuT4'
    }
};


function App() {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
      fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=' + page + '&sort_by=popularity.desc', options)
          .then(res => res.json())
          .then(data => setMovie(data.results))
          .catch(err => console.error(err));
  }, [page]);

  return (
    <>
      <h1>Movies</h1>
      <ul>
          {movie.map(item => (
              <div key={item.id} className="movie-card">
                  <span>{item.title}</span>
                  <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt={item.original_title} width="100"/>
                    <span>{item.vote_average}</span>
              </div>
          ))}
      </ul>
     <button onClick={() => setPage((page) => page + 1)}>Next</button>
    </>
  )
}

export default App
