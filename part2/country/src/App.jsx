import { useState, useEffect, useMemo } from 'react';
import countryServices from "./routing";

const Countries = ({ filter, countrylist, selected, changeSelected, setNewFilter }) => {
  const [weather, setWeather] = useState(null);
  const filteredCountries = useMemo(() =>
    countrylist.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    ), [filter, countrylist]);
  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };
    
    

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const countryName = filteredCountries[0].name.common;
      countryServices.getWeather(countryName).then(weatherData => {
        setWeather(weatherData);
      });
    } else {
      setWeather(null);
    }
  }, [filteredCountries]);

  const showSelected = (selectedCountry) => {
    changeSelected(selectedCountry);
  };

  useEffect(() => {
    if (selected) {
      setNewFilter(selected.name.common);
    }
  }, [selected, setNewFilter]);

  if (selected) {
    
    return (
      <div>
        <h1>{selected.name.common}</h1>
        <p>Capital: {selected.capital}</p>
        <p>Area: {selected.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(selected.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img style={{ height: '150px', margin: '10px' }} src={selected.flags.png} alt={`Flag of ${selected.name.common}`} />
        {weather && (
          
          <>
            <h1>Weather in {selected.name.common}</h1>
            <h3>Temperature: {kelvinToCelsius(weather.main.temp)}</h3>
            
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <h3>Wind: {weather.wind.speed}</h3>
          </>
        )}


      </div>
    );
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img style={{ height: '150px', margin: '10px' }} src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        {weather && (
          <>
            <h1>Weather in {country.name.common}</h1>
            <h3>Temperature: {kelvinToCelsius(weather.main.temp)}</h3>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <h3>Wind: {weather.wind.speed}</h3>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {filteredCountries.map(country => (
        <p key={country.name.common}>
          {country.name.common} <button onClick={() => showSelected(country)}>Show</button>
        </p>
      ))}
    </>
  );
};

const Filter = ({ filter, setNewFilter, changeSelected }) => {
  const handleFilterChange = (event) => {
    event.preventDefault();
    changeSelected(null);
    setNewFilter(event.target.value);
  };

  return (
    <div>
      Country: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setNewFilter] = useState('');
  const [selected, changeSelected] = useState(null);

  useEffect(() => {
    countryServices.getAll().then(initialCountries => {
      setCountries(initialCountries);
    });
  }, []);

  return (
    <>
      <Filter filter={filter} setNewFilter={setNewFilter} changeSelected={changeSelected} />
      <Countries filter={filter} countrylist={countries} selected={selected} changeSelected={changeSelected} setNewFilter={setNewFilter} />
    </>
  );
}

export default App;
