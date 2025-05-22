import axios from "axios";
import React, { useEffect, useState } from "react";

function ExchangeRate() {
  const [amount, setAmount] = useState(1);
  const [toCurrency, setToCurrency] = useState("INR");
  const [rates, setRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);

  const [countries, setCountries] = useState([]);
  const fromCurrency = "USD";

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const { data } = await axios.get(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json"
        );
        setCountries(Object.entries(data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrencies();
    async function fetchRates() {
      try {
        const { data } = await axios.get(
          "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_fgmDc2gHzfsgIER17o18b1Ogfrc8htRdTASjq9U9"
        );
        setRates(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates[toCurrency]) {
      setConvertedAmount(amount * rates[toCurrency]);
    }
  }, [amount, toCurrency, rates]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-xl  w-full max-w-3xl p-6">
        <div className="flex gap-6 flex-col md:flex-row items-center justify-between">
          <div className="w-full">
            <span className="text-sm text-gray-600">Amount</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-xl font-semibold"
            />
          </div>

          <div className="w-full">
            <span className="text-sm text-gray-600">From</span>
            <input
              value={`${fromCurrency}  US Dollar`}
              readOnly
              className="w-full border cursor-not-allowed rounded-lg px-4 py-3 font-medium"
            />
          </div>

          <div className="w-full">
            <span className="text-sm text-gray-600">To</span>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 font-medium"
            >
              {Object.keys(rates).map((code, idx) => (
                <option key={idx} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            onClick={() =>
              setConvertedAmount((amount * rates[toCurrency]).toFixed(2))
            }
          >
            Convert
          </button>
        </div>

        <div className="mt-4 text-center text-xl font-semibold text-gray-800">
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </div>
      </div>
    </div>
  );
}

export default ExchangeRate;
