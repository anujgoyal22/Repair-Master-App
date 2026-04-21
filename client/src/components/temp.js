import React, { useState, useEffect } from 'react';
import RepairForm from './components/RepairForm';
import FilterTable from './components/FilterTable';
import FullTable from './components/FullTable';
import MongoTable from './components/MongoTable';
import TestTable from './TestTable';
//import MyList from './MyList'; // Naya component import kiya
//import FruitList from './FruitList';
//import Table from './Table';
import Counter from './Counter';      // Naya import
import Calculation from './Calculation'; // Naya import
function App() {
  // --- States ---
  const [records, setRecords] = useState([]);// Purana File Data
  const [mongoRecords, setMongoRecords] = useState([]); // Naya MongoDB Data
  const [form, setForm] = useState({ item: '', issue: '', cost: '' });
  const [shop, setShop] = useState("");
   // 1. Naya state variable (App.js ke andar)
  const [editIndex, setEditIndex] = useState(null);
  const [mongoEditId, setMongoEditId] = useState(null); // MongoDB ID ke liye (_id) 
  //search Box=====================
  const [searchTerm, setSearchTerm] = useState(""); // Shuruat mein khali (empty)
  /*=========================================*/
  // --- Data Fetching ---
  const fetchData = async () => {
    try {
      // 1. Purana Data (File System)
      const resFile = await fetch('http://localhost:5000/read');
      const dataFile = await resFile.json();
      if (dataFile.message) {
        const rows = dataFile.message.split('\n').filter(r => r.includes('|'));
        setRecords(rows);
      }//end if 

      // 2. Naya Data (MongoDB)
      const resMongo = await fetch('http://localhost:5000/api/v2/mongo-read');
      const dataMongo = await resMongo.json();
      setMongoRecords(dataMongo);
    } // end try
    catch (err) {
      console.error("Fetch error:", err);
    }
  };
    /*=================================================*/
 
  // Page load hote hi Shop Name aur Data lao
  useEffect(() => {
    fetch('http://localhost:5000/config')
    .then(r => r.json())
    .then(d => setShop(d.shopName));
    fetchData();
  }, []);
  
  

// --- PURANA SYSTEM FUNCTIONS (File Based) ---
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

// 3.EK HI handleSave rakhein (Naya wala)
// --- UNIVERSAL SAVE (Dono ke liye) ---
  const handleSave = async () => {
    let url, method, bodyData;

    if (mongoEditId) {
      // MongoDB Update
      url = `http://localhost:5000/api/v2/mongo-update/${mongoEditId}`;
      method = 'PUT';
      bodyData = form;
    } else if (editIndex !== null) {
      // File Update
      url = 'http://localhost:5000/update-repair';
      method = 'PUT';
      bodyData = { ...form, index: editIndex };
    } else {
      // Default Save (Dono mein save kar sakte hain, abhi Mongo default rakhte hain)
      url = 'http://localhost:5000/api/v2/mongo-save';
      method = 'POST';
      bodyData = form;
    }

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
      setMongoEditId(null);
      fetchData();
    } catch (err) { console.error("Save error:", err); }
  };
 /* const handleSave = async () => {
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
  };*/
//=================handleDelete====================
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
//====================================
// --- NAYA SYSTEM FUNCTIONS (MongoDB Based) ---
  const handleMongoEdit = (record) => {
    setForm({ item: record.item, issue: record.issue, cost: record.cost });
    setMongoEditId(record._id);
    setEditIndex(null); // Purane edit ko reset karein
  };

  const handleMongoDelete = async (id) => {
    if (!window.confirm("Delete from MongoDB?")) return;
    try {
      await fetch(`http://localhost:5000/api/v2/mongo-delete/${id}`, { method: 'DELETE' });
      fetchData();
    }//end try 
    catch (err) { console.error(err); }
  };
//=======================================
  

  

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>{shop.replace(/_/g, ' ')}</h1>
      {/*==================Search box======================*/}
      <div style={{ margin: '20px' }}>
  <input 
    type="text" 
    placeholder="Search by Item or Issue..." 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)} // Type karte hi state update hogi
    style={{ padding: '10px', width: '50%', borderRadius: '5px', border: '1px solid #ccc' }}
  />
  <RepairForm 
        form={form} setForm={setForm} 
        handleSave={handleSave} 
        editIndex={editIndex} setEditIndex={setEditIndex} 
      />
<h3>Filtered table 0 </h3>
      <FilterTable 
        records={records} searchTerm={searchTerm} 
        editIndex={editIndex} 
        handleEdit={handleEdit} handleDelete={handleDelete} 
      />
</div>
      {/*===============================================================*/}
      <FullTable 
  records={records} 
  handleEdit={handleEdit} 
  handleDelete={handleDelete} 
/>
{/*===============================================================*/}

      {/*==============Filtered table========================*/}
      <table border="1" style={{ width: '80%', margin: 'auto' }}>
      <h1> filtered table </h1>
      <tbody>
  {records
    .filter((r) => {
      // Agar search box khali hai, toh saare records dikhao
      if (searchTerm === "") return r;
      
      // Agar kuch type kiya hai, toh check karo ki wo record mein hai ya nahi
      // Hum sabko .toLowerCase() kar dete hain taaki 'TV' aur 'tv' dono match ho jayein
      return r.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .map((r, i) => (
      <tr key={i} style={{ background: editIndex === i ? '#fff9c4' : 'transparent' }}>
        {r.split('|').map((col, j) => (
          <td key={j}>{col.split(':')[1]}</td>
        ))}
        <td>
          <button onClick={() => handleEdit(i, r)}>Edit</button>
          <button onClick={() => handleDelete(i)} style={{ color: 'red' }}>Delete</button>
        </td>
      </tr>
    ))}
</tbody>
      </table>
      <p>Raw Data: {JSON.stringify(records)}</p>
     {/*============================*/}
      <div>
        <h3>W3Schools useEffect Examples:</h3>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Counter />
        <Calculation />
      </div>
      <TestTable />  {/* Bas ye line add karein */}
    </div>
    {/*=============Database===============*/}
   <h3>MongoTable </h3>
   <MongoTable 
  records={records} 
  handleEdit={handleEdit} 
  handleDelete={handleDelete} 
/>
    {/*==============Database==============*/}

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