import { useEffect, useState } from "react";
import InputField from "./Component/InputField";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [retryInterval, setRetryInterval] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  // const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-24820-default-rtdb.firebaseio.com/movies.json"
      );
      const resData = await response.json();
      setData(resData);
      console.log(resData);
    } catch (error) {
      setError("Something went wrong. Retrying...");
      retryFetch();
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };

  const retryFetch = () => {
    setRetryInterval(setInterval(fetchData, 5000));
  };

  const cancelRetry = () => {
    clearInterval(retryInterval);
    setRetryInterval(null);
    setError(null);
  };

  const handleAddMovie = async(movies) => {
    // setMovies([...movies, newMovieObj]);
   const response = await fetch("https://react-http-24820-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movies),
      headers:{
      'Content-type':'application/json'
      }
    });
    const data = await response.json()
    console.log(data)
  };

  const deleteItemsFromApi =async(moviesId)=>{
    try {
     await fetch(
        `https://react-http-24820-default-rtdb.firebaseio.com/movies/${moviesId}.json`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error("Error deleting movie:",);
    }
    }


  useEffect(() => {
    fetchData
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-gray-400 flex flex-col justify-center items-center">
      <div className=" bg-white p-8 rounded-lg shadow-lg w-3/6 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Hello API</h1>
        <InputField onAdd={handleAddMovie} />
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 items-center"
            onClick={fetchData}
          >
            Fetch Data
          </button>
          {/* <ul className="mt-4 text-left">
            {movies.map((movie, index) => (
              <li key={index} className="mb-4">
                <div className="flex flex-col">
                  <strong className="mb-2">Title: {movie.title}</strong>
                  <p className="mb-2">Opening Text: {movie.openingText}</p>
                  <p>Release Date: {movie.releaseDate}</p>
                </div>
              </li>
            ))}
          </ul> */}

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
              {Object.keys(data).map((movieId) => (
                <li key={movieId} className="mb-4">
                  <strong>Title:- {data[movieId].title}</strong>
                  <p>Opening_Text:- {data[movieId].openingText}</p>
                  <p>Release_Date:- {data[movieId].releaseDate}</p>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteItemsFromApi(movieId)}
                  >
                    Delete
                  </button>
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
