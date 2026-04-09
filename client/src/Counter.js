import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {setCount((count) => count + 1);}, 1000);
  }); // <<-- Bina array ke (har render par chalega)

  return <h1 style={{color: 'blue'}}>I've rendered {count} times!</h1>;
}

export default Counter;