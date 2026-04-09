import React from 'react';
function RepairForm({ form, setForm, handleSave, editIndex, setEditIndex }) {
return(
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

);
}
export default RepairForm;