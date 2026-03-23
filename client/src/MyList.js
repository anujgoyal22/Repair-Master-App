import React from 'react';

const fruitlist = ['apple', 'banana', 'cherry'];

function MyList() {
  return (
    <div style={{ textAlign: 'left', padding: '10px' }}>
      <h3>My Fruit List:</h3>
      <ul>
         {/*=============================*/}
        <ul>
      {fruitlist.map(fruit => 
        <li key={fruit}>
          {fruit}
        </li>
      )}
    </ul>
     {/*=============================*/}
      </ul>
    </div>
    
  );
  
}

// Ise export karna zaroori hai taaki App.js ise pehchan sake
export default MyList;