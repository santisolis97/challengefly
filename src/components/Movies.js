import React from "react";
import Movie from "./Movie";
function Movies(props) {
  return (
    <div>
      {props.loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!props.loading && (
        <div>
          <div className="row">
            {props.results.results.map((item, index) => (
              <div key={index} className="col-3">
                <Movie result={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* {searchResults.length > 0 && !loading && (
        <div>
          <h3>Top rated movies:</h3>
          <div className="row">
            {searchResults.map((item, index) => (
              <div key={index} className="col-3">
                {item.title}
              </div>
            ))}
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
      )} */}
    </div>
  );
}

export default Movies;
