import React from 'react';

const fruits = [
  { id: 1, name: "Apple", quantity: 4 },
  { id: 2, name: "Banana", quantity: 3 },
  { id: 3, name: "Orange", quantity: 2 }
];
// 1. Create an object with key-value pairs
const pizzaOrder = {
  crust: "thin",
  topping: "pepperoni",
  size: "large",
  quantity: 2
};
// 2. Access values using their keys
console.log("Ordered topping:", pizzaOrder.topping); // pepperoni
pizzaOrder.delivery = true;

// 4. Loop through and print every key and value
console.log("\n--- Order Summary ---");
for (const [key, value] of Object.entries(pizzaOrder)) {
  console.log(`${key}: ${value}`);
}

// 5. Update a value
pizzaOrder.quantity = 3;
console.log("\nUpdated quantity:", pizzaOrder.quantity);

function FruitList() {
  return (<div style={{ textAlign: 'left', padding: '10px' }}>
  <ul> 
     <ul>
      {fruits.map((fruit, index) => (
        // The first parameter is the 'fruit' object, the second is the 'index'
        // Using 'fruit.id' as the key is preferred over 'index' if available
        
        <li key={fruit.id} >
          {index + 1}. {fruit.name} - Quantity: {fruit.quantity}
          <li key={fruit.id} style={{ marginBottom: '10px' }}>
            {/* Saari values yahan print ho rahi hain */}
            <strong>index:</strong> {index } |
            <strong>index + 1= </strong> {index + 1} | 
            <strong> ID:</strong> {fruit.id} | 
            <strong> Name:</strong> {fruit.name} | 
            <strong> Qty:</strong> {fruit.quantity}
          </li>
        </li>
        
       
      ))}
      {/* <ul>{fruitlist.map(fruit => 
        <li key={fruit}>
          {fruit}
        </li>
      )}</ul>  */}
    </ul>
    </ul>
   </div>
  );
}

export default FruitList;
