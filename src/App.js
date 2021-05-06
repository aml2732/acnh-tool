import './App.css';
import React from 'react';
import RecipeList from './recipeList.js';

/*Material UI*/
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {InputLabel, FormHelperText, FormControl, Select, NativeSelect, TextField, Button} from '@material-ui/core';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#282c34',
    color: theme.palette.common.white,
  }
}))(TableCell);

function textualSearchAlgo(findThis, inThis){
  if(inThis.includes(findThis)){return true;}
  findThis = findThis.replace(/\s/ig, '');
  for(let i=0;i<inThis.length;i++){
    if(findThis && inThis[i] === findThis[0]){
      findThis = findThis.substring(1, findThis.length);
    }
  }
  if(findThis.length === 0){return true;}
  else{return false;}
}


function App() {
  const [state, setState] = React.useState({
    sort: '',
    recipeList: RecipeList,
    recipe: '',
    material: '',
    pricestart: '',
    priceend: '',
    obtainedby: ''
  });

  const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };

   const applySettings = (event) => {
    let copyOfRecipieList = [...RecipeList]; //copy the original recipe list
    //Sort logic
    if(state.sort){
      copyOfRecipieList.sort(function(a,b){
        if((typeof a[state.sort]) == 'string'){
          return a[state.sort].localeCompare(b[state.sort]);
        }else if(state.sort == 'complexityasc'){
          return a.materials.length - b.materials.length;
        }else if (state.sort == 'complexitydsc'){
          return b.materials.length - a.materials.length;
        }
        else{
          return a[state.sort]-b[state.sort];
        }
      });
    }

    //Name-search logic
    if(state.recipe){
      copyOfRecipieList = copyOfRecipieList.filter((r)=>{return textualSearchAlgo(state.recipe.toLowerCase(), r.name);});
    }

    //Material-search logic
    if(state.material){
      copyOfRecipieList = copyOfRecipieList.filter((r) => {
        return r.materials.reduce((t,m)=>{
          return t || textualSearchAlgo(state.material.toLowerCase(), m.name);
        },false);
      });
    }

    //Price logic
    if(state.pricestart){
      copyOfRecipieList = copyOfRecipieList.filter((r) => r.price >= parseInt(state.pricestart));
    }

    if(state.priceend){
      copyOfRecipieList = copyOfRecipieList.filter((r) => r.price <= parseInt(state.priceend));
    }

    //Obtained By logic
    if(state.obtainedby){
      copyOfRecipieList = copyOfRecipieList.filter((r) => r.obtainedBy.includes(state.obtainedby));
    }



    setState({
      ...state,
      recipeList: copyOfRecipieList
    });
    console.log('got to applySettings...')
  }


  return (
    <div className="App">
      <header className="App-header">
        <div>ACNH Tool</div>
      </header>

      <section>
      <p>Use the following filters to sort and search by recipe name and material. The filters are additive, so for example if you search by the 'recipe name' : star, and also search by the material name 'large star'; the resulting set will be recipes that contain 'star' in their name and are also made up of at least 1 'large star' ingrediant. Searches are also a little fuzzy, looking for exact matches, as well as any grouping of words that contains your specified search characters. </p>
      <p>Don't forget to hit 'Apply Settings'!</p>

       <div>

        <Grid container spacing={10}>
         <Grid item>
           <FormControl>
             <InputLabel htmlFor="sort-table">Sort</InputLabel>
             <Select
               native
               value={state.sort}
               onChange={handleChange}
               inputProps={{
                 name: 'sort',
                 id: 'sort-table',
               }}
              >
               <option aria-label="None" value="" />
               <option value="name">Name</option>
               <option value="price">Price</option>
               <option value="classification">Classification</option>
               <option value="complexityasc">Complexity Ascending</option>
               <option value="complexitydsc">Complexity Decending</option>
              </Select>
            </FormControl>

            <TextField label="Recipe"
              value={state.recipe}
              onChange={handleChange}
              inputProps={{
              name: 'recipe',
              id: 'recipe-search'
            }}/>

            <TextField label="Material"
              value={state.material}
              onChange={handleChange}
              inputProps={{
              name: 'material',
              id: 'material-search'
            }}/>

            <TextField label="Start Price"
              value={state.pricestart}
              onChange={handleChange}
              type="number"
              inputProps={{
              name: 'pricestart',
              id: 'start-price'
            }}/>

            <TextField label="End Price"
              value={state.priceend}
              onChange={handleChange}
              type="number"
              inputProps={{
              name: 'priceend',
              id: 'end-price'
            }}/>

            <FormControl>
              <InputLabel htmlFor="obtainedby">Obtained By</InputLabel>
              <Select
                native
                value={state.obtainedby}
                onChange={handleChange}
                inputProps={{
                  name: 'obtainedby',
                  id: 'obtainedby',
                }}
               >
                <option aria-label="None" value="" />
                <option value="All villagers">All villagers</option>
                <option value="Balloons">Balloons</option>
                <option value="Big Sister villagers">Big Sister villagers</option>
                <option value="Celeste">Celeste</option>
                <option value="Cranky villagers">Cranky villagers</option>
                <option value="Egg bottle">Egg bottle</option>
                <option value="Jock villagers">Jocker villagers</option>
                <option value="Lazy villagers">Lazy villagers</option>
                <option value="Normal villagers">Normal villagers</option>
                <option value="Nook Miles Redemption">Nook Miles Redemption</option>
                <option value="Peppy villagers">Peppy villagers</option>
                <option value="Smug villagers">Smug villagers</option>
                <option value="Snooty villagers">Snooty villagers</option>

               </Select>
             </FormControl>

            <Button  variant="contained" color="primary" onClick={applySettings}>Apply Settings</Button>
            </Grid>
          </Grid>

       </div>

       <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Classification</StyledTableCell>
              <StyledTableCell align="right">Obtained By</StyledTableCell>
              <StyledTableCell align="right">Materials</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.recipeList.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.classification}</TableCell>
                <TableCell align="right">{row.obtainedBy}</TableCell>
                <TableCell align="right">
                  {
                    row.materials.map((material)=> (
                      <div>
                        <span>x{material.amount}</span>&#160;
                        <span>{material.name}</span>
                      </div>
                    ))
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      </section>
    </div>
  );
}

export default App;
