import React, { useState, useEffect } from 'react';

const Predict = () => {
  
  const [Glucose, setGlucose] = useState("");
  const [Insulin, setInsulin] = useState("");
  const [BMI, setBMI] = useState("");
  const [Age, setAge] = useState("");
  const [result, setResult] = useState([]);

  // Function to fetch initial data (optional, depending on your API)
  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/');
    let data = await response.json();
    setResult(data);
  };

  // Function to handle form submission and send data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      Glucose,
      Insulin,
      BMI,
      Age,
    };

    try {
      let response = await fetch('http://127.0.0.1:8000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));
      let data = await response.json();
      setResult(data); // Update the result with the API response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Glucose:</label>
          <input
            type="text"
            value={Glucose}
            onChange={(e) => setGlucose(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Field 2:</label>
          <input
            type="text"
            value={Insulin}
            onChange={(e) => setInsulin(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Field 3:</label>
          <input
            type="text"
            value={BMI}
            onChange={(e) => setBMI(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Field 4:</label>
          <input
            type="text"
            value={Age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <div className='data'>
        <h3>{result.message}</h3>
      </div>
      sample
    </div>
  );
};

export default Predict;

