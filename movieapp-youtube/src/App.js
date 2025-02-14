import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import YouTube from 'react-youtube';
import './App.css';

function App() {
  const API_URL = 'https://api.themoviedb.org/3'; 
  const API_KEY = '2fcbe19b1c0a8b50341cc7b25b9de875';
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original'; 

  // variables de estado
  const [movies, setMovies] = useState([]); // Asegurarse de que movies sea un array
  const [searchKey, setSearchKey] = useState(''); // Definir searchKey y setSearchKey
  const [trailer, setTrailer] = useState(null); // Definir trailer y setTrailer
  const [movie, setMovie] = useState(null); // Definir movie en el estado
  const [playing, setPlaying] = useState(false); // Definir playing en el estado

  // funcion para realizar la peticion por get a la api
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, { 
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    }); 

    console.log('Movies fetched:', results); // Agregar console.log para verificar la respuesta de la API
    setMovies(results || []); // Asegurarse de que results sea un array

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  }

  //funcion para la peticion de un solo bojeto y mostrar en reproduccion de video
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'videos',  
      },
    }); 

    console.log('Movie fetched:', data); // Agregar console.log para verificar la respuesta de la API

    if (data.videos && data.videos.results){
      const trailer = data.videos.results.find(
        (vid) => vid.name.includes('Trailer') || vid.type === 'Trailer'
      ); 
      console.log('Trailer found:', trailer); // Agregar console.log para verificar el tráiler encontrado
      setTrailer(trailer ? trailer : data.videos.results[0]); 
    } else {
      console.log('No videos found for this movie.');
    }
    setMovie(data);
  }

  const selectMovie = async(movie) => {
    fetchMovie(movie.id);
    window.scrollTo(0, 0);  
  }  

  //funcion para buscar peliculas
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  }

  useEffect(() => {
    fetchMovies();
  }, []);  

  return (
    <div>
      <h2 className='text-center mt-5'>Trailer Movies</h2>
      {/*buscador de peliculas */}  
      <form className='container mt-4' onSubmit={searchMovies}> 
        <input type='text' placeholder='search' onChange={(e) => setSearchKey(e.target.value)}/>
        <button className='btn btn-primary'>Search</button>  
        </form> 

       {/*aqui va todo el contenedor del bonner y del reproducctor de video */}  

       <div>
        <main>
          {movie ? (
            <div
            className="viewtrailer"
            style={{
              backgroundImage: movie.backdrop_path ? `url("${URL_IMAGE}${movie.backdrop_path}")` : 'none',
            }}  
            >
            {playing ? (
              <>
              <YouTube
              videoId={trailer ? trailer.key : ''}
              className="reproductor container"
              containerClassName={"youtube-contanier amru"}
              opts={{
                height: "390",
                width: "640",
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  cc_load_policy: 0,  
                  fs: 0,  
                  iv_load_policy: 0,
                  modestbranding: 0,
                  rel: 0, 
                  showinfo: 0,        
                },
              }}  
              />
              <button onClick={() => setPlaying(false)} className="boton">
                Close
              </button> 
              </> 
            ) : (
              <div className="container"> 
              <div className="">
                {trailer ? (
                  <button
                  onClick={() => setPlaying(true)}
                  type="button"
                  >
                    play trailer
                  </button>
                ) : (
                  "sorry, no trailer available" 
                )}
                <h1 className= "text-white">{movie.title}</h1>  
                <p className="text-white">{movie.overview}</p>  
              </div>  
              </div>  
            )}
            </div>  
          ) : null}
        </main>
      </div>

      {/* contenedor que va a mostrar posters de las peliculas actuales */}
      <div className='container mt-3'>
        <div className='row'>
          {movies.map((movie) => (
            <div key={movie.id} className='col-md-4 mb-3' onClick={() => selectMovie(movie)}> 
              <img src={movie.poster_path ? `${URL_IMAGE + movie.poster_path}` : ''} alt="" height={600} width="100%"/>
              <h4 className='text-center'>{movie.title}</h4>  
            </div>
          ))}
        </div>
      </div>
    </div>    
  );
}

export default App;