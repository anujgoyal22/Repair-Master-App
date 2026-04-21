import React, { useState, useEffect } from 'react';
import MongoTable from './MongoTable';

function MongoSystem({ searchTerm, setForm, setMongoEditId, fetchDataTrigger }) {
  const [mongoRecords, setMongoRecords] = useState([]);

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/api/v2/mongo-read');
    const data = await res.json();
    setMongoRecords(data);
  };

  useEffect(() => { fetchData(); }, [fetchDataTrigger]);

  const handleMongoEdit = (record) => {
    setForm({ item: record.item, issue: record.issue, cost: record.cost });
    setMongoEditId(record._id);
  };

  const handleMongoDelete = async (id) => {
    if (!window.confirm("Delete from MongoDB?")) return;
    await fetch(`http://localhost:5000/api/v2/mongo-delete/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div style={{ background: '#e3f2fd', padding: '10px', marginTop: '20px' }}>
      <h2>Naya System (MongoDB)</h2>
      <MongoTable records={mongoRecords} handleEdit={handleMongoEdit} handleDelete={handleMongoDelete} />
    </div>
  );
}

export default MongoSystem;