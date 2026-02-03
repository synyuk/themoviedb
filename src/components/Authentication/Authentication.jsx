import {useState, useEffect} from 'react';

function Authentication() {
    const [authenticated, setAuthenticated] = useState(false);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTExNWI4NGY2MzVhMGUwMDc2NTNlZDkzODI2MjE0YyIsIm5iZiI6MTc2OTU0MjE5NS4xOSwic3ViIjoiNjk3OTEyMzMzYzE0MThjYThhMDI5MGY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cf25GP7bO__UzQ5LSLT64UX5QsIt8Dyz4BTa1oaPuT4'
        }
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/authentication', options)
            .then(res => res.json())
            .catch(err => console.error(err));
            setAuthenticated(true)
    }, []);
  return (
    <div>
      <h1>Authentication Component</h1>
        {authenticated ? <p>User is authenticated</p> : <p>User is not authenticated</p>}
    </div>
  );
}

export default Authentication