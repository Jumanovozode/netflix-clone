import React, { useEffect, useState } from 'react';
import axios from './axios';
import YouTube from 'react-youtube'
import './row.css';
import movieTrailer from 'movie-trailer';

// import Scrollable from "hide-scrollbar-react";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        // if [], run once when the row lands, and don`t run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        } 
        fetchData();
    }, [fetchUrl]) ;
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay:1,
        }
    }


    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
            .then(url => {
                const  urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
    };
    
  return (
      <div className='row'>
            <h2>{title}</h2>


            <div classname='row_posters'>

                <div className='poster'>
 
                {/* <Scrollable> */}
                {/* several row_poters */}

                {movies.map(movie => (
                    <img 
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row_poster ${isLargeRow && "row__posterLarge"} ` }
                    src={`${base_url}${ isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name}/>
                ))}
                {/* </Scrollable> */}
                </div>

            </div>
 
         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            
      </div>
  )
}

export default Row;
