import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CreateMovie.css";

function CreateMovie() {
  const [movieName, setMovieName] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [movieImage, setMovieImage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);
  const handleTitleChange = (event) => {
    setMovieName(event.target.value);
  };

  const handleYearChange = (event) => {
    setMovieYear(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

    const MAX_WIDTH = 1920;
    const MAX_HEIGHT = 1080;

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        // Handle file size exceeded error
        alert("File size exceeds the maximum allowed size (2MB).");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
            // Handle resolution exceeded error
            alert(
              "Image resolution exceeds the maximum allowed dimensions (1920x1080)."
            );
          } else {
            setMovieImage(reader.result);
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
  const handleSubmit = () => {
    const movieDetails = {
      title: movieName,
      year: movieYear,
      image: movieImage,
    };

    // Get existing movies from local storage or initialize as an empty array
    let existingMovies = JSON.parse(localStorage.getItem("movies")) || [];

    // Add the new movie details to the existing movies list
    existingMovies.push(movieDetails);

    // Update local storage with the updated movies list
    localStorage.setItem("movies", JSON.stringify(existingMovies));

    // Reset input fields and state after adding a movie
    setMovieName("");
    setMovieYear("");
    setMovieImage(null);

    navigate("/mymovie");
  };

  return (
    <div className="maincontainer">
      <div className="wrapper">
        <div className="headcontainer">
          <h1>Create a New Movie</h1>
        </div>
        <div className="inputbox">
          <div className="imagebox">
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
              onChange={handleTitleChange}
            />

            <input
              type="number"
              placeholder="Publishing Year"
              value={movieYear}
              onChange={handleYearChange}
            />
            <div className="buttonwrapper">
              <button className="buttonscancel" onClick={handleCancel}>
                Cancel
              </button>
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

export default CreateMovie;
