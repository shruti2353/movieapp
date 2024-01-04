import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/CreateMovie.css";

function EditMovie() {
  const location = useLocation();
  const navigate = useNavigate();

  const [movieName, setMovieName] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [movieImage, setMovieImage] = useState(null);

  useEffect(() => {
    if (location.state && location.state.movie) {
      const { title, year, image } = location.state.movie;
      setMovieName(title || "");
      setMovieYear(year || "");
      // Set the movie image path or data to display
      setMovieImage(image || null);
    }
  }, [location.state]);

  const handleFileChange = (e) => {
    // Handle file change logic here...
  };

  const handleTitleChange = (e) => {
    setMovieName(e.target.value);
  };

  const handleYearChange = (e) => {
    setMovieYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the edited movie details
    const editedMovie = {
      title: movieName,
      year: movieYear,
      image: movieImage,
    };

    // Get all movies from local storage
    let storedMovies = JSON.parse(localStorage.getItem("movies")) || [];

    // Find the index of the movie to be updated in the stored movies
    const movieIndex = storedMovies.findIndex(
      (movie) => movie.image === editedMovie.image
    );

    if (movieIndex !== -1) {
      // Replace the movie details at the found index with the edited movie
      storedMovies[movieIndex] = editedMovie;

      // Update local storage with the updated movies list
      localStorage.setItem("movies", JSON.stringify(storedMovies));

      // Navigate back to the movie list
      navigate("/mymovie");
    } else {
      console.log("Movie not found in the list.");
    }
  };

  return (
    <div className="maincontainer">
      <div className="wrapper">
        <div className="headcontainer">
          <h1>Create a New Movie</h1>
        </div>
        <div className="inputbox">
          <div className="imagebox">
            {/* Input for uploading image */}
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </div>
          <div className="inputFeilds">
            <input
              type="text"
              placeholder="Title"
              value={movieName}
              class
              onChange={handleTitleChange}
            />

            <input
              type="number"
              placeholder="Publishing Year"
              value={movieYear}
              onChange={handleYearChange}
            />
            <div className="buttonwrapper">
              <button className="buttonscancel">Cancel</button>
              <button className="buttonssubmit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMovie;
