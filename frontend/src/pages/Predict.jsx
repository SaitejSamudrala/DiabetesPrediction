import React, { useState, useEffect } from "react";

const Predict = () => {
  const [Glucose, setGlucose] = useState("");
  const [Insulin, setInsulin] = useState("");
  const [BMI, setBMI] = useState("");
  const [Age, setAge] = useState("");
  const [Model, setModel] = useState("Naive-Bayes Model");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false); 
  const [loading, setLoading] = useState(false);

  // Fetch initial data (optional, depending on your API)
  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/");
    let data = await response.json();
    setResult(data);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      Glucose,
      Insulin,
      BMI,
      Age,
      Model,
    };

    try {
      let response = await fetch("http://127.0.0.1:8000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));
      let data = await response.json();
      setResult(data); // Update the result with the API response
      setSubmitted(true); // Mark the form as submitted
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Enter Health Parameters
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-600">Glucose</label>
            <input
              type="text"
              value={Glucose}
              onChange={(e) => {
                const glucose = e.target.value;
                if (/^\d*$/.test(glucose)) {
                  // Only allows digits
                  setGlucose(glucose);
                }
              }}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {Glucose < 0 && (
              <p className="text-red-500 text-sm mt-1">
                Invalid input: Glucose cannot be less than 0.
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-600">Insulin</label>
            <input
              type="text"
              value={Insulin}
              onChange={(e) => {
                const insulin = e.target.value;
                if (/^\d*$/.test(insulin)) {
                  setInsulin(insulin);
                }
              }}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {Insulin < 0 && (
              <p className="text-red-500 text-sm mt-1">
                Invalid input: Insulin cannot be less than 0.
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-600">BMI</label>
            <input
              type="text"
              value={BMI}
              onChange={(e) => {
                const bmi = e.target.value;
                if (/^\d*(\.\d*)?$/.test(bmi)) {
                  // Allows only numbers and a single decimal point
                  setBMI(bmi);
                }
              }}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {BMI < 0 && (
              <p className="text-red-500 text-sm mt-1">
                Invalid input: BMI cannot be less than 0.
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-600">Age</label>
            <input
              type="text"
              value={Age}
              onChange={(e) => {
                const age = e.target.value;
                if (/^\d*$/.test(age)) {
                  // Only allows digits
                  setAge(age);
                }
              }}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {Age < 0 && (
              <p className="text-red-500 text-sm mt-1">
                Invalid input: Age cannot be less than 0.
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-600">Model</label>
            <select
              value={Model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="Naive-Bayes Model">Naive-Bayes Model</option>
              <option value="Perceptron Model">Perceptron Model</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 mt-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>

        {loading ? (
          <div className="mt-6 text-center">
            <div className="loader border-t-4 border blue-500 rounded-full w-8 h-8 mx-auto animate-spin"></div>
            <p className="mt-2 text-gray-600">Processing...</p>
          </div>
        ) : (
          submitted &&
          result && (
            <div className="mt-6 text-center bg-inherit p-4 rounded-md">
              <h2
                className={`text-2xl font-bold ${
                  result.Result === "Positive"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {result.Result}
              </h2>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Predict;
