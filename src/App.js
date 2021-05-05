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
  for(let i=0;i<inThis.length;i++){
    if(findThis && inThis[i] == findThis[0]){
      findThis = findThis.substring(1, findThis.length);
    }
  }
  if(findThis.length == 0){return true;}
  else{return false;}
}


function App() {
  const [state, setState] = React.useState({
    sort: '',
    recipeList: RecipeList,
    recipe: ''
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
      console.log('got to state.recipe...')
      copyOfRecipieList = copyOfRecipieList.filter((r)=>{return textualSearchAlgo(state.recipe.toLowerCase(), r.name);});
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

       <div>
       <FormControl>
         <Grid container spacing={10}>
         <Grid item>
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

            <TextField label="Recipe"
              value={state.recipe}
              onChange={handleChange}
              inputProps={{
              name: 'recipe',
              id: 'recipe-search'
            }}/>

            <Button  variant="contained" color="primary" onClick={applySettings}>Apply Settings</Button>
            </Grid>
          </Grid>
        </FormControl>

       </div>

       <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Classification</StyledTableCell>
              <StyledTableCell align="right">Materials</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.recipeList.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.classification}</TableCell>
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
