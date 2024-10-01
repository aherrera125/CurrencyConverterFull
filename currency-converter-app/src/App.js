import './App.css';
import { useRef, useState, useEffect } from "react";

function App() {
  var data;

  const currecyRef = useRef();
  const resultRef = useRef();
  const currecyTypeRef = useRef();

  const [valueChange, setValueChange] = useState(null);
  const [currencyType, setCurrencyType] = useState(null);

  useEffect(
    () => {
      const callApiChange = async () => {
        try {
          const response = await fetch("https://v6.exchangerate-api.com/v6/b91aeff2a690c886be6a2960/latest/EUR");
          data = await response.json();          
        } catch (error) {
          console.log("Error toaccess to API", error);
        }
      };
      callApiChange();
    }, []
  );

  const calculate = () => {
    setValueChange(data.conversion_rates[currencyType]);

    const currencyValue = parseFloat(currecyRef.current.value);
    const currencyChanged = currencyValue * valueChange;

    resultRef.current.innerHTML = currencyChanged.toFixed(2);
  }

  const selectCurrencyType = ()=>{
    setCurrencyType(currecyTypeRef.current.value);
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <input className='centerElement' type='text' ref={currecyRef}></input><br></br>
      <select className='centerElement'  onChange={selectCurrencyType} ref={currecyTypeRef}>
        <option value="">Select</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="ARG">ARG</option>
      </select><br></br>
      <button className='centerElement' onClick={calculate}>Convert</button><br></br>
      <div className='centerElement result' ref={resultRef}></div>
    </div>
  );
}

export default App;