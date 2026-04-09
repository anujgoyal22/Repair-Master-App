import { useState, useEffect } from "react";

function Calculation() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);
/*useEffect(() => {
    setTimeout(() => {setCount((count) => count + 1);}, 1000);
  });*/
  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <<-- Jab count badlega, tabhi chalega

  return (
    <div style={{border: '1px solid black', padding: '10px', margin: '10px'}}>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </div>
  );
}

export default Calculation;