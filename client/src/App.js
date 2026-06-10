import React, { useState, useEffect } from 'react';
import UpdateRecord from './components/UpdateRecord';
import LegacySystem from './components/LegacySystem';
import MongoSystem from './components/MongoSystem';

function App() {
  const [form, setForm] = useState({ item: '', issue: '', cost: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [mongoEditId, setMongoEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [shop, setShop] = useState("");
  const [refresh, setRefresh] = useState(0); // Tables ko refresh karne ke liye

  useEffect(() => {
    fetch('http://localhost:5000/config')
    .then(r => r.json())
    .then(d => setShop(d.shopName));
  }, []);
/*================handleSave==================================*/
  const handleSave = async () => {
   let url, method, bodyData;
    console.log("inside App.js/handleSave--------------"); 
    console.log("mongoEditId = "+mongoEditId);
    console.log("editIndex = "+editIndex);
    if (mongoEditId) {
      console.log("inside_____Update MongoDbRecord_____________");
      url = `http://localhost:5000/api/v2/mongo-update/${mongoEditId}`;
      method = 'PUT'; 
      bodyData = form;
    }/*========Update Legacy System Record========*/
     else if (editIndex !== null) {
      console.log("inside Update Legacy System record=====+====>"); 
      url = 'http://localhost:5000/update-repair';
      method = 'PUT'; 
      bodyData = { ...form, index: editIndex };
      
      }/*================Save============*/
       else {console.log("inside---MongoDb Save------ bodyData = ",bodyData);
      url = 'http://localhost:5000/api/v2/mongo-save'; // Default Mongo save
      method = 'POST'; bodyData = form;
    }

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });
    
    const data = await res.json();
    alert(data.message);
    setForm({ item: '', issue: '', cost: '' });
    setEditIndex(null); 
    setMongoEditId(null);
    setRefresh(prev => prev + 1); // Dono systems ko reload karne ka ishara
  };//end const handleSave

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{shop.replace(/_/g, ' ')}</h1>
      <input 
        placeholder="Search..." value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '50%' }}
      />
       {/*=========================*/}
      <h3>UpdateRecord</h3>
      <UpdateRecord 
      form={form} 
      setForm={setForm} 
      handleSave={handleSave} 
      editIndex={mongoEditId || editIndex}
      setEditIndex={setEditIndex}       // 👈 Yeh line jodiye (Legacy reset ke liye)
      setMongoEditId={setMongoEditId}   // 👈 Yeh line bhi jodiye (Mongo reset ke liye)
       />
      {/*=========================*/}
     <h3>MongoSystem</h3>
      <MongoSystem searchTerm={searchTerm} 
      setForm={setForm} 
      setMongoEditId={setMongoEditId} 
      fetchDataTrigger={refresh} />
      {/*=========================*/}
      <LegacySystem 
      searchTerm={searchTerm} 
      setForm={setForm} 
      setEditIndex={setEditIndex} 
      fetchDataTrigger={refresh} />
    </div>
  );
}

export default App;