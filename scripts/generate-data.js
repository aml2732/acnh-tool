/*
 To generate data you must go to the Fan maintained source: https://tinyurl.com/acnh-sheet
 In google doc, click the 'Recipes' tab (You might have to arrow over for a bit to find it)
 Then in google doc go to file>download>.csv
 Save/move that file into acnh-tool/data with the file name `Recipes.csv`
 Then run this script: `node scripts/generate-data.js`
 The data will output to acnh-tool/data.json
 Copy this javascript array into recipeList.js
*/


const csvFilePath='./data/Recipes.csv';
const csv=require('csvtojson');
const fs = require('fs');
const path = require('path');

async function runner(){
  const jsonArray=await csv().fromFile(csvFilePath);

  let list = [];
  jsonArray.forEach((item, i) => {
    let newItem = {};
    newItem.name = (item.Name || "").toLowerCase();
    //need to look up price from another csv(s)
    //newItem.price = parseInt(item.Sell || 0);
    newItem.price = "0";
    newItem.classification = (item.Category || "unknown");
    newItem.materials = [];
    for(let i=1; i<7; i++){
      if(!item[`Material ${i}`] || item[`Material ${i}`].length<1){
        //noop. This material slot is empty
      }else{
        let material = {};
        material.name = (item[`Material ${i}`]).toLowerCase();
        material.amount = parseInt(item[`#${i}`]);
        newItem.materials.push(material);
      }

    }
    list.push(newItem);
  });

  let outputPath = path.join(__dirname, '..', 'data', 'data.json');
  fs.writeFileSync(outputPath, JSON.stringify(list));

}

runner();
