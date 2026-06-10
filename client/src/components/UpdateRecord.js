import React from 'react';
function UpdateRecord({ form, setForm, handleSave, editIndex, setEditIndex, setMongoEditId }) {
  // 👇 YAHAN PAR LIKHNA HAI (Return se theek pehle)
  console.log("inside UpdateRecord.js-----------");  
  console.log("React ki asli state:", form);
    console.log("editIndex ="+editIndex);
    console.log("===============================");
return(
       <div style={{ background: '#f4f4f4', padding: '20px', marginBottom: '20px' }}>
        {/*================Item================*/}
        <input placeholder="Item" 
              value={form.item} 
              onChange={e => setForm({ ...form,item: e.target.value})} />
             
        <input placeholder="Issue" value={form.issue} onChange={e => setForm({ ...form,issue: e.target.value})} />
        <input placeholder="Cost" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} />
        {/* Button ka text badal jayega edit mode mein */}
        <button onClick={handleSave}> 
          {editIndex !== null ? "Update Record" : "Save Record"}{/*Condition ? Value if True : Value if False*/}
          {/*5 !== '5'  // Result: true beacuse both have different datatypes one is number other is string*/}
          {/*5 != '5' // Result : false because it checks only values not datatype*/}
          {/*10 !== 20  // Result: true  (Kyunki 10 aur 20 barabar nahi hain)
             10 !== 10  // Result: false (Kyunki 10 aur 10 toh barabar hain!)*/}
        </button>
        {/*Condition ==========*/}
        {editIndex !== null && (
          <button onClick={() => {
             setEditIndex(null);// Legacy ID saaf
             setMongoEditId(null);     // Mongo ID saaf
             setForm({item:'', issue:'', cost:''});//form khali
              }}>Cancel</button>
        )}
      </div>

);
}
export default UpdateRecord;