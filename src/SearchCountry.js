import React, { useState, useEffect } from "react";

function CountryDisplay() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCountries(data);
    } catch (err) {
      setError(err);
      console.error("Error fetching data:", err);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        type="text"
        placeholder="Search countries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredCountries.map((country) => (
          <div
            key={country.name.common}
            style={{
              width: "200px",
              margin: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <img
              src={country.flags.png}
              alt={country.name.common + " flag"}
              style={{ width: "100px", height: "auto" }}
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryDisplay;
