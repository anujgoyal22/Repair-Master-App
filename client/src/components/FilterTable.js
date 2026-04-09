import React from 'react';

function FilterTable({ records, searchTerm, editIndex, handleEdit, handleDelete }) {
  const filteredRecords = records.filter((r) => {
    if (searchTerm === "") return r;
    return r.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <table border="1" style={{ width: '80%', margin: 'auto' }}>
      <thead>
        <tr><th>Item</th><th>Issue</th><th>Cost</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {filteredRecords.map((r, i) => {
          // Asli index dhoondna zaroori hai kyunki filtered list mein index badal jata hai
          const originalIndex = records.indexOf(r); 
          
          return (
            <tr key={originalIndex} style={{ background: editIndex === originalIndex ? '#fff9c4' : 'transparent' }}>
              {r.split('|').map((col, j) => (
                <td key={j}>{col.split(':')[1]}</td>
              ))}
              <td>
                <button onClick={() => handleEdit(originalIndex, r)}>Edit</button>
                <button onClick={() => handleDelete(originalIndex)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default FilterTable;