import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Movie";
function Movies() {
  const [topRatedMovies, setTopRatedMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const apiKey = "eeec2429b31a143e915ed959aad485f0";
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    console.log(searchInput);
  };
  const handleSearch = (event) => {};
  const fetchTopRatedMovies = () => {
    axios.get(url).then((res) => {
      setTopRatedMovies(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchTopRatedMovies();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-center ">
        <form className="form-inline" onSubmit={handleSearch}>
          <input
            className="form-control mr-sm-2"
            type="search"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && (
        <div>
          <h3>Top rated movies:</h3>
          <div className="row">
            {topRatedMovies.results.map((item, index) => (
              <div key={index} className="col-3">
                <Movie result={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
