import React from "react";

const Country = ({ name, capital, flag, region, population, showDetails, code }) => {

  const showDetailsHandler = () => {
    showDetails(code);
  };

  return (
    <div className="country" onClick={showDetailsHandler}>
      <div className="country-img">
        <img src={flag} alt="" />
      </div>
      <div className="country-info">
        <h3>{name}</h3>
        <p>Capital: {""}
            <span className="values">{capital}</span> 
        </p>
        <p>Region: {""}
            <span className="values">{region}</span> 
        </p>
        <p>Population: {""}
            <span className="values">{population}</span> 
        </p>
      </div>
    </div>
  );
};

export default Country;
