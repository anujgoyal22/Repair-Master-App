import React, { useState, useEffect } from 'react';

import TestTable from './TestTable';
//import MyList from './MyList'; // Naya component import kiya
//import FruitList from './FruitList';
//import Table from './Table';

function App() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ item: '', issue: '', cost: '' });
  const [shop, setShop] = useState("");
   // 1. Naya state variable (App.js ke andar)
  const [editIndex, setEditIndex] = useState(null);

  // Page load hote hi Shop Name aur Data lao
  useEffect(() => {
    fetch('http://localhost:5000/config').then(r => r.json()).then(d => setShop(d.shopName));
    fetchData();
  }, []);
  //==================================
 const fetchData = async () => {
    const res = await fetch('http://localhost:5000/read');
    const data = await res.json();
    if (data.message) {
      const rows = data.message.split('\n').filter(r => r.includes('|'));
      setRecords(rows);
    }
  };


// 2. Edit Button dabane par kya hoga (Function)
const handleEdit = (index, rowData) => {
  // rowData kuch aisa hoga: "Item:LED TV|Issue:No Sound|Cost:800"
  const parts = rowData.split('|');
  const item = parts[0].split(':')[1];
  const issue = parts[1].split(':')[1];
  const cost = parts[2].split(':')[1];

  // Form mein purana data bhar do
  setForm({ item, issue, cost });
  setEditIndex(index); // Yaad rakho kaun si row edit ho rahi hai
};

// EK HI handleSave rakhein (Naya wala)
  const handleSave = async () => {
    // Agar editIndex null nahi hai, toh UPDATE wala rasta, warna SAVE wala
    const url = editIndex !== null 
      ? 'http://localhost:5000/update-repair' 
      : 'http://localhost:5000/save';

    const method = editIndex !== null ? 'PUT' : 'POST';
    const bodyData = editIndex !== null ? { ...form, index: editIndex } : form;

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      alert(data.message);

      setForm({ item: '', issue: '', cost: '' }); 
      setEditIndex(null); 
      fetchData(); 
    } catch (err) {
      console.error("Save error:", err);
    }
  };
//=====================================
const handleDelete = async (index) => {
  // Confirm karein ki user delete karna chahta hai ya nahi
  if (!window.confirm("Are you sure you want to delete this?")) return;

  try {console.log("inside try");
    const res = await fetch('http://localhost:5000/delete-repair', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index: index })
    });

    const data = await res.json();
    alert(data.message); // "Record permanently deleted!" dikhayega
    
    fetchData(); // YE SABSE ZAROORI HAI: Table ko refresh karne ke liye
  } catch (error) {
    console.error("Delete error:", error);
  }
};
//=======================================
  

  

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>{shop.replace(/_/g, ' ')}</h1>
      
      <div style={{ background: '#f4f4f4', padding: '20px', marginBottom: '20px' }}>
        <input placeholder="Item" value={form.item} onChange={e => setForm({...form, item: e.target.value})} />
        <input placeholder="Issue" value={form.issue} onChange={e => setForm({...form, issue: e.target.value})} />
        <input placeholder="Cost" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} />
        {/* Button ka text badal jayega edit mode mein */}
        <button onClick={handleSave}> 
          {editIndex !== null ? "Update Record" : "Save Record"}
        </button>
        {/*Condition ==========*/}
        {editIndex !== null && (
          <button onClick={() => {setEditIndex(null); setForm({item:'', issue:'', cost:''})}}>Cancel</button>
        )}
      </div>

      <table border="1" style={{ width: '80%', margin: 'auto' }}>
        <thead>
          <tr><th>Item</th><th>Issue</th><th>Cost</th></tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              {r.split('|').map((col, j) => 
              <td key={j}>{col.split(':')[1]}</td>)}
            <td>
            <button onClick={() => handleEdit(i, r)} style={{ marginRight: '5px' }}>
      Edit
    </button>
    <button onClick={() => handleDelete(i)} style={{ color: 'red' }}>
      Delete 
    </button>
  </td>
            </tr>
          ))}
        
        </tbody>
      </table>
      <p>Raw Data: {JSON.stringify(records)}</p>
     {/*============================*/}
      <div>
      <TestTable />  {/* Bas ye line add karein */}
    </div>
    {/*============================*/}
    {/*<div className="App">
      <h1>Mera Main App</h1>
      <hr />  */}
      
      {/* Yahan aapka fruit list wala program chalega */}
      {/*<MyList />
      
      <hr />  */}
      {/* Aapka purana repair shop wala code yahan niche ho sakta hai */}
   {/* </div> */}
    {/*=========================================== */}
    
    </div>
    
   
  );
}

export default App;