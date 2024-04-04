import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVerses = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.alquran.cloud/v1/search/${searchText}/all/en`
      );
      const data = await response.json();
      setSearchResults(data.data.matches);
      console.log(data.data.matches);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchVerses();
  };

  return (
    <div>
      <h1 className="heading">Quranic Verse Search</h1>
      <div className="container">
        <div className="searchBox">
          <input
            type="text"
            placeholder="Search Quranic verses..."
            className="searchInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="searchButton"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          searchResults !== null ? (
            <ul className="resultsList">
              {searchResults.map((result, index) => (
                <li key={index} className="resultItem">
                  <p className="resultText bold">Surah: {result.surah.englishName} ({result.surah.name})</p>
                  <p className="resultText">Verse {result.numberInSurah}:</p>
                  <p className="resultText">{result.text}</p>
                </li>
              ))}
            </ul>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Main;

