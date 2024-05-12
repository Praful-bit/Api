/* eslint-disable react/prop-types */
import  { useState } from "react";

function InputField({ onAdd }) {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const handleAddClick = () => {
    const movies = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate,
    };
    onAdd(movies);
    setTitle("");
    setOpeningText("");
    setReleaseDate("");
  };

  return (
    <form className="flex flex-col items-center">
      <div className="mb-4 w-full">
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="openingText" className="block text-gray-700">
          Opening Text
        </label>
        <input
          type="text"
          id="openingText"
          value={openingText}
          onChange={(e) => setOpeningText(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="releaseDate" className="block text-gray-700">
          Release Date
        </label>
        <input
          type="date"
          id="releaseDate"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddClick}
      >
        Add
      </button>
    </form>
  );
}

export default InputField;
