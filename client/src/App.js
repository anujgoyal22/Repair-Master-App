import React, { useState, useEffect } from 'react';
import UpadteRecord from './components/UpadteRecord';
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
    console.log("inside handleSave"); 
    let url, method, bodyData;
    console.log("mongoEditId :"+mongoEditId);
    console.log("editIndex :"+editIndex);
    if (mongoEditId) {
      url = `http://localhost:5000/api/v2/mongo-update/${mongoEditId}`;
      method = 'PUT'; 
      bodyData = form;
    }/*========Update Record========*/
     else if (editIndex !== null) { 
      url = 'http://localhost:5000/update-repair';
      method = 'PUT'; 
      bodyData = { ...form, index: editIndex };
      }/*================Save============*/
       else {
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
    setEditIndex(null); setMongoEditId(null);
    setRefresh(prev => prev + 1); // Dono systems ko reload karne ka ishara
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{shop.replace(/_/g, ' ')}</h1>
      <input 
        placeholder="Search..." value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '50%' }}
      />
       {/*=========================*/}
      <h3>UpadteRecord</h3>
      <UpadteRecord form={form} 
      setForm={setForm} 
      handleSave={handleSave} 
      editIndex={mongoEditId || editIndex} />
      
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