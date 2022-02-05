import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import "./App.css";
import SearchIcon from '@mui/icons-material/Search';
import Country from './components/Country';
import CountryDetails from './components/CountryDetails';
import {Routes, Route} from 'react-router-dom';
import {useNavigate} from 'react-router';

function App() {
  
  const [countries,setCountries] = useState([]);
  const countriesInputRef = useRef();
  const regionRef = useRef();
  const navigator = useNavigate();

  const noCountries = countries.status || countries.message;

  useEffect(() => {
    try{
      fetchData();
    }catch(err){
      console.log(err);
    }
  }, []);

  const fetchData = async () => {
    const res = await fetch('https://restcountries.com/v2/all');
    const data = await res.json();

    setCountries(data);
  };

  const searchCountries = () => {
    const searchValue = countriesInputRef.current.value;

    if(searchValue.trim()){
      const fetchSearch = async () => {
        const res = await fetch(`https://restcountries.com/v2/name/${searchValue}`);
        const data = await res.json();

        setCountries(data);
      }

      try{
        fetchSearch();
      }catch(err){
        console.log(err);
      }
    }else{
      fetchData();
    }
  };

  const searchRegion = () => {
    const selectValue = regionRef.current.value;

    if(selectValue.trim()){
      const fetchSelect = async () =>{
        const res = await fetch(`https://restcountries.com/v2/region/${selectValue}`);
        const data = await res.json();

        if(selectValue === "All"){
          try{
            fetchData();
          }catch(err){
            console.log(err);
          }
          return;
        }
        setCountries(data);
      };
      try{
        fetchSelect();
      }catch(err){
        console.log(err);
      }
    }
  };

  const showDetails = (code) =>{
    navigator(`/${code}`);
  };

  return (
    <div className='apps'>
      <Header/>
      <Routes>
        <Route
          path='/'
          element={
      <div className='app-body'>
        <div className='inputs'>
          <div className="search-input">
            <SearchIcon/>
            <input type="text" placeholder='Search for a country...' ref={countriesInputRef} onChange={searchCountries}/>
          </div>          
          <div className="select-region">
            <select ref={regionRef} onChange={searchRegion}>
              <option>All</option>
              <option>Africa</option>
              <option>Americas</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>Oceania</option>
            </select>
          </div>
        </div>
        <div className="countries">
          {!noCountries ? (
            countries.map((country) => (
              <Country
                key={country.alpha3Code}
                code={country.alpha3Code}
                name={country.name}
                capital={country.capital}
                population={country.population}
                region={country.region}
                flag={country.flag}
                showDetails={showDetails}
                />
            ))
          ) : (
            <p>No countries found...</p>
          )}
        </div>
      </div>
          }
          />
          <Route path="/:countryCode" element={<CountryDetails countries={countries}/>}/>
      </Routes>
    </div>
  );
}

export default App;

  
