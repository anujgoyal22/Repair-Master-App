const Table = () => {
  const fakeRecords = [
    "Item:LED TV|Issue:No Sound|Cost:800",
    "Item:Inverter|Issue:Battery Low|Cost:250",
    "Item:Mobile|Issue:Screen Crack|Cost:1500"
  ];
return(
  <div style={{ padding: '20px' }}>
    <h2>Simple Table Test with Console Logs</h2>
    <table border="1" cellPadding="10">
      <tbody>
         {fakeRecords.map((r, i) => {
          console.log("Row index =", i);
         
          return(
            <tr key={i}>
              {r.split(`|`).map((col,j)=>{
                console.log(`Column index j ki value hai: ${j} for row ${i}`);
              
                  return (
                    <td key={j}>
                      {col.split(':')[1]}
                    </td>
                  );//end child return
                
              })}

            </tr>
          );//end parent return
         }/*map*/)/*map*/
}            
           

      </tbody>
      </table>
  </div>

);//end main return


};
export default Table;