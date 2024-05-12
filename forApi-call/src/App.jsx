import {useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("")
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/films");
      const resData = await response.json();
      setData(resData);
    } catch (error) {
      setError("Something went wrong. Retrying...");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Hello Api</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchData}
        >
          Fetch Data
        </button>
        {isLoading && (
          <div className="mt-4 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
            <p className="ml-2 text-gray-500">Loading...</p>
          </div>
        )}
        <p className="text-xl text-center">{error}</p>
        {data && (
          <ul>
            {data.results.map((film) => (
              <li key={film.episode_id}>
                <strong>{film.title}</strong>
                <p>{film.opening_crawl}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
