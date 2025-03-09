"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null); // State to store the downloaded data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors

  // Function to download data from the API route
  const downloadData = async () => {
    try {
      const apiUrl = "/api/download"; // Next.js API route
      const response = await axios.get(apiUrl); // Fetch data from the API route

      // Parse the data (assuming it's JSON)
      setData(response.data); // Save the data to state
    } catch (err) {
      console.log(err);
      setError(err.message); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Use useEffect to trigger the download when the component mounts
  useEffect(() => {
    downloadData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Download Data from Google Drive</h1>

      {loading && (
        <div>
          <p>Loading data...</p>
          <progress value={loading ? undefined : 100} max="100" />
        </div>
      )}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && data && (
        <div>
          <p>Data has been loaded successfully!</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;