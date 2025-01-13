import React, { useState } from 'react';

const App = () => {
  // State to hold the data fetched from the API
  const [data, setData] = useState(null);
  // State to hold loading state or error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the button click and fetch data
  const fetchData = async () => {
    setLoading(true); // Set loading state to true when starting to fetch
    setError(null); // Clear any previous error

    try {
      const response = await fetch('http://localhost:4000/user'); // Make the API request
      if (!response.ok) {
        throw new Error('Failed to fetch data'); // If the response is not ok, throw an error
      }
      const result = await response.json(); // Parse the JSON response
      setData(result); // Store the data in state
    } catch (err) {
      setError(err.message); // Store any error that occurs
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  return (
    <div>
      <h1 className='text-red-700'>Hello world</h1>
      <button onClick={fetchData} className="bg-blue-500 text-white px-4 py-2 rounded">Fetch Data</button>

      {/* Show loading state */}
      {loading && <p>Loading...</p>}

      {/* Show error if it exists */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Show fetched data */}
      {data && (
        <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
