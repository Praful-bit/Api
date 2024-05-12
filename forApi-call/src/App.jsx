import { useEffect, useState } from "react";
import InputField from "./Component/InputField";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [retryInterval, setRetryInterval] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/films");
      const resData = await response.json();
      setData(resData);
    } catch (error) {
      setError("Something went wrong. Retrying...");
      retryFetch();
    } finally {
      setIsLoading(false);
    }
  };

  const retryFetch = () => {
    setRetryInterval(setInterval(fetchData, 5000));
  };

  const cancelRetry = () => {
    clearInterval(retryInterval);
    setRetryInterval(null);
    setError(null);
  };

  const handleAddMovie = (newMovieObj) => {
    setMovies([...movies, newMovieObj]);
  };

  useEffect(() => {
    fetchData
  }, []);

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col justify-center items-center">
      <div className="max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Hello API</h1>
        <InputField onAdd={handleAddMovie} />
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 items-center"
            onClick={fetchData}
          >
            Fetch Data
          </button>
          <ul className="mt-4 text-left">
            {movies.map((movie, index) => (
              <li key={index} className="mb-4">
                <div className="flex flex-col">
                  <strong className="mb-2">Title: {movie.title}</strong>
                  <p className="mb-2">Opening Text: {movie.openingText}</p>
                  <p>Release Date: {movie.releaseDate}</p>
                </div>
              </li>
            ))}
          </ul>

          {isLoading && (
            <div className="mt-4 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
              <p className="ml-2 text-gray-500">Loading...</p>
            </div>
          )}
          {error && (
            <div className="mt-4">
              <p className="text-red-500">{error}</p>
              <button
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={cancelRetry}
              >
                Cancel Retry
              </button>
            </div>
          )}
          {data && (
            <ul className="mt-4">
              {data.results.map((film) => (
                <li key={film.episode_id} className="mb-4">
                  <strong>{film.title}</strong>
                  <p>{film.opening_crawl}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
