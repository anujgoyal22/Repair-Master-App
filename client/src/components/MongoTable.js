import React from 'react';
function MongoTable({ records, handleEdit, handleDelete }) {
    return(
        <div style={{marginTop: '20px'}}>
            <h3> Full Table </h3>
      <table border="1" style={{ width: '80%', margin: 'auto' }}>
        <thead>
          <tr><th>Item</th><th>Issue</th><th>Cost</th></tr>
        </thead>
        <tbody>
          {records.map((r) => (
    <tr key={r._id}> {/* MongoDB har record ko ek unique _id deta hai */}
      <td>{r.item}</td>
      <td>{r.issue}</td>
      <td>{r.cost}</td>
      <td>
        {/* Edit aur Delete ke liye ab hum r._id bhejenge */}
        <button onClick={() => handleEdit(r)}>Edit</button>
        <button onClick={() => handleDelete(r._id)} style={{ color: 'red' }}>
          Delete
        </button>
      </td>
    </tr>
  ))}
        
        </tbody>
      </table>
        </div>

    );
}
export default MongoTable;