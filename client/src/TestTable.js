import React, { useState } from 'react';

const TestTable = () => {
  const [records, setRecords] = useState([
    "Item:LED TV|Issue:No Sound|Cost:800" ,
   "Item:Inverter|Issue:Battery Low|Cost:250",
    "Item:Mobile|Issue:Screen Crack|Cost:1500"
  ]);
  // 2. Delete Function
  const handleDelete = (index) => {
    console.log("Deleting index:", index);
    
    // Bina server ke screen se delete karne ka logic (Filter)
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords); 
    
    alert("Record removed from screen!");
  };
  // Testing ke liye function
  /* Temporary=================>>>>
  const handleDelete = (index) => {
    console.log("Delete button clicked for row index:", index);
    alert("Aapne row number " + (index + 1) + " delete karne ki koshish ki!");
  };*/
  /*---------------------------------
  const handleDelete = async (index) => {
  const res = await fetch('http://localhost:5000/delete-repair', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index: index }) // Hum bata rahe hain kaun si line udani hai
  });
  const data = await res.json();
  alert(data.message);
  fetchData(); // Table refresh karo
};*/

  return (
    <div style={{ padding: '20px' }}>
      <h2>Simple Table Test with Console Logs</h2>
      <table border="1" cellPadding="10">
        <tbody>
          {/* Yahan se shuru ho raha hai aapka logic */}
          {/*fakeRecords.map: Ye loops chalata hai har Line ke liye (Row).*/}
          {records.map((row, i) => {// Outer map
            console.log(`i =${i}`);
        
            // 1. Ye Row index print karega (0, 1, 2)
            //console.log("Row index i ki value hai:", i); 

            return (// parent return
              <tr key={i}>
              
                {row.split('|').map((col, j) => {// Inner map 
                // row.split('|').map: Ye loops chalata hai har Tukde ke liye (Column).
                   const parts = row.split('|');
                   console.log(`i =${i} row.split('|') parts :${parts}`);// output:Item:LED TV,Issue:No Sound,Cost:800
                  console.log(`\n`);
                   const parts0 = col.split(':')[1] ;
                  console.log(`j =${j} col.split(':')[1] parts0 :${parts0}`);//output:Item:LED TV
                   // 2. Ye Column index print karega (0, 1, 2) har row ke liye
                  //console.log(`Column index j ki value hai: ${j} for row ${i}`);
                  
                  return (// child return
                    <td key={j}>
                      {/*Ye sirf Value nikal kar screen par dikha deta hai.*/}
                      {col.split(':')[1]    }
                     
                    </td>
                  );//end child return
                  
                })}
                {/* 2. YAHAN LAGAYE: Ye har row ke aakhir mein ek naya cell banayega */}
      <td>
        <button onClick={() => handleDelete(i)} style={{ color: 'red', cursor: 'pointer' }}>
          Delete
        </button>
      </td>
              </tr>
            );//end return parent
          })}
        </tbody>
      </table>
      <p>Check your browser console (F12) to see the values!</p>
    </div>
  );//end main return
};

export default TestTable;