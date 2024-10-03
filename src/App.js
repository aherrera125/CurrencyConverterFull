import './App.css';
import { useRef, useState, useEffect } from "react";

function App() {  
  const dataRef = useRef(null);

  const currencyRef = useRef();
  const resultRef = useRef();
  const currencyTypeRef = useRef();

  const [valueChange, setValueChange] = useState(null);
  const [currencyType, setCurrencyType] = useState(null);
  const [typeOfChanges, setTypeOfChanges] = useState(null)

  useEffect(
    () => {
      const callApiChange = async () => {
        try {
          const response = await fetch("https://v6.exchangerate-api.com/v6/b91aeff2a690c886be6a2960/latest/EUR");
          const jsonData = await response.json();
          setTypeOfChanges(jsonData);
        } catch (error) {
          console.log("Error toaccess to API", error);
        }
      };
      callApiChange();
    }, []
  );

  const calculate = () => {
      if (typeOfChanges.conversion_rates) {
          setValueChange(typeOfChanges.conversion_rates[currencyType]);
      }

    const currencyValue = parseFloat(currencyRef.current.value);
    const currencyChanged = currencyValue * valueChange;

    resultRef.current.innerHTML = currencyChanged.toFixed(2);
  }

  const selectCurrencyType = ()=>{
    setCurrencyType(currencyTypeRef.current.value);
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <input className='centerElement' type='text' ref={currencyRef}></input><br></br>
      <select className='centerElement'  onChange={selectCurrencyType} ref={currencyTypeRef}>
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