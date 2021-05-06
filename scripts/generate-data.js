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

/*Other paths*/
const csvAccessories = './data/Accessories.csv';
const csvBags = './data/Bags.csv';
const csvBottoms = './data/Bottoms.csv';
const csvDress = './data/Dress-Up.csv';
const csvFencing = './data/Fencing.csv';
const csvFloors = './data/Floors.csv';
const csvHeadwear = './data/Headwear.csv';
const csvHousewares = './data/Housewares.csv';
const csvMiscellaneous = './data/Miscellaneous.csv';
const csvRugs = './data/Rugs.csv';
const csvShoes = './data/Shoes.csv';
const csvTools = './data/Tools.csv';
const csvTops = './data/Tops.csv';
const csvUmbrellas = './data/Umbrellas.csv';
const csvWallMounted = './data/Wall-mounted.csv';
const csvWallpaper = './data/Wallpaper.csv';


async function runner(){
  //Create item lookup JSON:
  const jsonAccessories = await csv().fromFile(csvAccessories);
  const jsonBags = await csv().fromFile(csvBags);
  const jsonBottoms = await csv().fromFile(csvBottoms);
  const jsonDress = await csv().fromFile(csvDress);
  const jsonFencing = await csv().fromFile(csvFencing);
  const jsonFloors = await csv().fromFile(csvFloors);
  const jsonHeadwear = await csv().fromFile(csvHeadwear);
  const jsonHousewares = await csv().fromFile(csvHousewares);
  const jsonMiscellaneous = await csv().fromFile(csvMiscellaneous);
  const jsonRugs = await csv().fromFile(csvRugs);
  const jsonShoes = await csv().fromFile(csvShoes);
  const jsonTools = await csv().fromFile(csvTools);
  const jsonTops = await csv().fromFile(csvTops);
  const jsonUmbrellas = await csv().fromFile(csvUmbrellas);
  const jsonWallMounted = await csv().fromFile(csvWallMounted);
  const jsonWallpaper = await csv().fromFile(csvWallpaper);

  let itemLookup = jsonFencing.concat(jsonAccessories, jsonBags, jsonBottoms, jsonDress, jsonFloors, jsonHeadwear, jsonHousewares, jsonMiscellaneous, jsonRugs, jsonShoes, jsonTools, jsonTops, jsonUmbrellas, jsonWallMounted, jsonWallpaper);


  //Fetch the Recipe file as JSON:
  const jsonArray=await csv().fromFile(csvFilePath);

  //Massage data until it is in a format we can work with
  let list = [];
  jsonArray.forEach((item, i) => {
    let newItem = {};
    newItem.name = (item.Name || "").toLowerCase();
    //need to look up price from another csv(s)
    let findItem = itemLookup.find((i)=>{return i.Name == item.Name});
    if(findItem){
      newItem.price = parseInt(findItem.Sell || 0);
    }else{
      newItem.price = 0;
    }

    newItem.classification = (item.Category || "unknown");
    newItem.obtainedBy = (item.Source || "unknown");
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

  let recipeListPath = path.join(__dirname, '..', 'src', 'recipeList.js');
  let fileContent = `const list = ${JSON.stringify(list)}; \n\r export default list;`;
  fs.writeFileSync(recipeListPath, fileContent);

}

runner();
