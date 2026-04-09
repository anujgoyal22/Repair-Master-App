import React from 'react';
function FullTable({ records, handleEdit, handleDelete }) {
    return(
        <div style={{marginTop: '20px'}}>
            <h3> Full Table </h3>
      <table border="1" style={{ width: '80%', margin: 'auto' }}>
        <thead>
          <tr><th>Item</th><th>Issue</th><th>Cost</th></tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              {r.split('|').map((col, j) => 
              <td key={j}>
                {col.split(':')[1]} </td>)}
            
            <td>
            <button onClick={() => handleEdit(i, r)} style={{ marginRight: '5px' }}>Edit</button>
            <button onClick={() => handleDelete(i)} style={{ color: 'red' }}>Delete </button>
  </td>
            </tr>
          ))}
        
        </tbody>
      </table>
        </div>

    );
}
export default FullTable;