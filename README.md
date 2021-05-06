# Animal Crossing New Horizons Tool
![screenshot of current acnh demo](./acnhdemoimage.JPG)

# Demo
 [Live Demo Here](https://aml2732.github.io/acnh-tool/)

# Development:
- `cd acnh-tool`
- `npm start`

# Data Generation:
If you need to regenerate the data follow the instructions below:
- To generate data you must go to the Fan maintained source: https://tinyurl.com/acnh-sheet
- In google doc, click the 'Recipes' tab (You might have to arrow over for a bit to find it)
- Then in google doc go to file>download>.csv
- Save/move that file into acnh-tool/data with the file name `Recipes.csv`
- Do the above steps again for the other tabs and name them:
  - Accessories: `/data/Accessories.csv`
  - Bags tab: `/data/Bags.csv`
  - Bottoms tab: `/data/Bottoms.csv`
  - Dress tab: `/data/Dress-Up.csv`
  - Fencing tab: `/data/Fencing.csv`
  - Floors tab: `/data/Floors.csv`
  - Headware tab: `/data/Headwear.csv`
  - Housewares tab: `/data/Housewares.csv`
  - Miscellaneous tab: `/data/Miscellaneous.csv`
  - Rugs tab: `/data/Rugs.csv`
  - Shoes tab: `/data/Shoes.csv`
  - Tools tab: `/data/Tools.csv`
  - Tops tab: `/data/Tops.csv`
  - Umbrellas tab: `/data/Umbrellas.csv`
  - Wall-mounted tab: `/data/Wall-mounted.csv`
  - Wallpaper tab: `/data/Wallpaper.csv`
- Then run this script: `node scripts/generate-data.js`
- ~~The data will output to acnh-tool/data.json~~ DONE
- ~~Copy this javascript array into recipeList.js~~ DONE

Note this isn't automatically included in the project cus copying all that data and putting on my github in its raw form just doesn't seem right.

# Create dist
Run the following script to generate a `docs` folder containing a static build of this app for deployment via github pages
- `./scripts/generate-github-page.sh`


# Creation notes:
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
And uses : Nodejs, [Material UI](https://material-ui.com/) and the resources found [here](https://tinyurl.com/acnh-sheet).
