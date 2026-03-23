// STEP 1: Hamare paas ek "Raw String" hai jo file se aayi hai
const rawLine = "Item:LED_TV|Issue:No_Power|Cost:500";

console.log("--- STEP 1: Original String ---");
console.log(rawLine);
console.log("\n");


// STEP 2: split('|') ka use karke iske 3 tukde (Array) banate hain
// Hum computer ko keh rahe hain: "|" jahan dikhe wahan se tod do
const columns = rawLine.split('|');

console.log("--- STEP 2: split('|') ke baad (Array ban gaya) ---");
console.log(columns); // Original : "Item:LED_TV|Issue:No_Power|Cost:500"
// Output: ["Item:LED_TV", "Issue:No_Power", "Cost:500"]
console.log("\n");

// STEP 3: map() ka use karke har tukde ke andar se ":" ke baad wali value nikalte hain
console.log("--- STEP 3: map() aur split(':') ka jaadu ---");

columns.map((col, index) => {
    
    // Ab 'col' ki value pehli baar mein "Item:LED_TV" hogi
    // Hum ise phir se ":" se todenge
    const parts = col.split(':'); 
    console.log(`parts :${parts}`);//parts :Item,LED_TV
    console.log(parts);// [ 'Item', 'LED_TV' ]
    console.log("parts :"+parts);//parts :Item,LED_TV
    
    // parts[0] hoga "Item" aur parts[1] hoga "LED_TV"
    const finalValue = parts[1];
     const finalValue0 = parts[0];
   //"Item:LED_TV|Issue:No_Power|Cost:500"
   //Iteration 1 : parts[0]=Item
   //                parts[1]=LED_TV
   //Iteration 2: parts[0]=Issue
    //              parts[1]=No_Power                
    console.log(`Column ${index} ki asli value hai: ${finalValue}`);
    console.log(`parts[0]Column ${index} ki asli value hai: ${finalValue0}`);
});