import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useParams, useNavigate} from 'react-router';
import { border } from '@mui/system';

function CountryDetails({countries}) {

  const params = useParams();
  const navigator = useNavigate();

  let name;
  let capital;
  let flagImg;
  let population;
  let area;
  let region;
  let currencies = [];
  let languages = [];
  let timezone = [];
  let borders = [];
  let latlang = [];

  countries.forEach((country) => {
    if(country.alpha3Code === params.countryCode){
      name = country.name;
      flagImg = country.flag;
      capital = country.capital;
      population = country.population;
      area = country.area;
      region = country.region;
      timezone = country.timezones;
      latlang = country.latlng;
      
      country.currencies?.forEach((currency) => {
      currencies.push(currency.name)
      });

      country.languages?.forEach((language) => {
        languages.push(language.name)
      });

      country.borders?.forEach((border) => {
      borders.push(border)
      });

    }
  })

  const goBack = () => {
    navigator("/");
  };

  return (
    <div className='country-details'>
      <button className='back' onClick={goBack}>
        <ArrowBackIcon/>
        <p>Go Back</p>
      </button>
      <div className="country-details-body">
        <div className="img-container">
          <img src={flagImg} alt="" />
        </div>
        <div className="inf">
          <h2>{name}</h2>
          <div className="info-container">
            <div className='info-left'>
              <p>Capital: {""}
                <span className="values">{capital}</span> 
              </p>
              <p>Region: {""}
                <span className="values">{region}</span> 
              </p>
              <p>Latlng: {""}
                <span className="values">{latlang.join(",")}</span> 
              </p>
              <p>Area: {""}
                <span className="values">{area}</span> 
              </p>
            </div>
            <div className="right-info">
              <p>Population: {""}
                <span className="values">{population}</span> 
              </p>
              <p>Time Zone: {""}
                <span className="values">{timezone}</span> 
              </p>
              <p>Currency: {""}
                {currencies.map((currency) => {
                  if(currencies.indexOf(currency) !== currencies.length - 1){
                    return (
                      <span className="values">{currency}</span> 
                    )
                  } else{
                    return (
                      <span className="values">{currency}</span> 
                    )
                  }
                })};
              </p>
              <p>Official Languages: {""}
                {languages.map((language) => {
                  if(languages.indexOf(language) !== languages.length - 1){
                    return (
                      <span className="values">{language}</span> 
                    )
                  } else{
                    return (
                      <span className="values">{language}</span> 
                    )
                  }
                })};
              </p>
            </div>
          </div>
          Neighbor Countries:
                {borders.length ? (
                  borders.map((border) => (
                    <div className="border-country">
                      <p>{border}</p>
                    </div>
                  ))
                ) : (
                  <div className="values">
                    <p>No borders...</p>
                  </div>
                )}
        </div>
      </div>
    </div>
)};

export default CountryDetails;

