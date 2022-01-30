import React from 'react';

function StudioGhibliFilm(props) {
  return (
    <div id='ghibliFilm-container'>
        <div id = 'ghibliFilm-div'>
        <h3 id="ghibliFilm-title">Title: {props.ghibliFilm.title}</h3>
        <h3 id="ghibliFilm-director">Director: {props.ghibliFilm.director}</h3>
      {/* <div id='ghibliFilm-pictures'> */}
        {/* <img id="ghibliFilm-image" src={props.ghibliFilm.image} alt=''></img> */}
        <img id="ghibliFilm-movie-banner" src={props.ghibliFilm.movie_banner} alt=''></img>
      {/* </div> */}
        <h3 id="ghibliFilm-release-date">Released: {props.ghibliFilm.release_date}</h3>
        <h3 id="ghibliFilm-release-description">Description: {props.ghibliFilm.description}</h3>
      </div>
    </div>
    );
}

export default StudioGhibliFilm;
