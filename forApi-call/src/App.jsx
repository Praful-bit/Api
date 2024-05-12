import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState(null);

  // by async await 
  
  // useEffect(() => {  
  // const data =async()=>{
  // const response = await fetch("https://swapi.dev/api/films")
  // const resData = await response.json()
  // setData(resData)
  // }
  // data()
  // }, [])

  useEffect(() => {
    fetch("https://swapi.dev/api/films")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Hello Api</h1>
      {console.log(data)}
      {data && (
        <ul>
          {data.results.map((film) => (
            <>
              <li key={film.episode_id}>{film.title}</li>
              <li>{film.opening_crawl}</li>
            </>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
