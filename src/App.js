import { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';

/*
  - Always use tje setter for useState
  - Always put a dependency array on useEffect, useCallback, useMemo
  - to run useEffect only once, use an empty array
  - Dont depend on data you set
  - Always add all the state you read from to the dependecy array
*/

function Numbers() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
      fetch("/numbers.json")
        .then((resp) => resp.json())
        .then((data) => {
          setNumbers(data);
        });
  }, []);

  const addOne = useCallback(() => {
    setNumbers((currentNumbers) => [
      ...currentNumbers,
      currentNumbers.length + 1,
    ])
    // setNumbers([...numbers, numbers.length + 1]);
  });
  // everytime numbers gets a change in value 
  // we will get a new version of add one

  // why are we using useMemo?
  // go through this again
  const sum = useMemo(() => numbers.reduce((a, v) => a + v, 0), [numbers]);

  const out = (
    <div>
      <div>Numbers: {JSON.stringify(numbers)}</div>
      <div>Sum: {sum}</div>
      <button onClick={addOne}>Add One</button>
    </div>
  )
  return out;
}


function App() {
  return (
    <div className="App">
      <Numbers />
    </div>
  );
}

export default App;