import { AsyncPaginate } from 'react-select-async-paginate';
import searchIcon from './assets/searchIcon.svg';
import './search.scss';
import { useState } from 'react';
import { geoOptions} from './api';

export default function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (searchVal) => {
    setSearch(searchVal);
    onSearchChange(searchVal);

    try {
      const response = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchVal }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setWeatherData(data);
      onSearchChange(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadOptions = (inputValue, loadedOptions) => {
    const offset = loadedOptions.length;

    return fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}&offset=${offset}`,
      geoOptions
    )
      .then((res) => res.json())
      .then((data) => {
        const options = data.data.map((city) => ({
          label: city.name,
          value: city.id,
          latitude: city.latitude,
          longitude: city.longitude,
        }));

        return {
          options: options,
          hasMore: options.length >= 10,
          additional: {
            page: offset / 10 + 1,
          },
        };
      })
      .catch((error) => {
        console.log(error);
        return {
          options: [],
          hasMore: false,
        };
      });
  };

  return (
    <div className="container">
      <div className="search-area">
        <img src={searchIcon} alt="search Icon" width={30} />
        <AsyncPaginate
          placeholder="Location"
          value={search}
          className="input"
          onChange={handleSearch}
          loadOptions={loadOptions}
          debounceTimeout={600}
          isClearable={true}
          additional={{
            page: 1,
          }}
          getAdditionalItems={(page, data) => ({
            ...data,
            options: [...data.options],
            additional: {
              page: page,
            },
          })}
        />
      </div>

      {weatherData && (
        <div className="output">
          <div className="current-weather">
            <img
              src={` http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <p>{weatherData.weather[0].description}</p>
          </div>
          <div className="attributes">
            <div className="temperature">
              <p className='value'>{weatherData.main.temp}&#8451;</p>
              <p>Temperature</p>
            </div>
            <div className="humidity">
              <p className="value">{weatherData.main.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// <div className="weather-details">
//   <p>{weatherData.name}</p>
// </div>;