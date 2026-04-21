import React, { useState, useEffect } from 'react';
import FilterTable from './FilterTable';
import FullTable from './FullTable';

function LegacySystem({ searchTerm, shop, setForm, setEditIndex, fetchDataTrigger }) {
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/read');
    const data = await res.json();
    if (data.message) {
      const rows = data.message.split('\n').filter(r => r.includes('|'));
      setRecords(rows);
    }
  };

  useEffect(() => { fetchData(); }, [fetchDataTrigger]); // Jab save ho, refresh karein

  const handleEdit = (index, rowData) => {
    const parts = rowData.split('|');
    setForm({
      item: parts[0].split(':')[1],
      issue: parts[1].split(':')[1],
      cost: parts[2].split(':')[1]
    });
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Delete from File?")) return;
    await fetch('http://localhost:5000/delete-repair', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index })
    });
    fetchData();
  };

  return (
    <div style={{ background: '#f9f9f9', padding: '10px', marginTop: '20px' }}>
      <h2>Purana System (File Database)</h2>
      <FilterTable records={records} searchTerm={searchTerm} handleEdit={handleEdit} handleDelete={handleDelete} />
      <FullTable records={records} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
}

export default LegacySystem;