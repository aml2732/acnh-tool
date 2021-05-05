import './App.css';
import React from 'react';
import RecipeList from './recipeList.js';

/*Material UI*/
import { withStyles, makeStyles } from '@material-ui/core/styles';
/*Table*/
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/*Form*/
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

/*Other*/
import Button from '@material-ui/core/Button';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#282c34',
    color: theme.palette.common.white,
  }
}))(TableCell);


function App() {
  const [state, setState] = React.useState({
    sort: '',
    recipeList: RecipeList
  });

  const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };

  const applySettings = (event) => {
    if(state.sort){
      let copyOfRecipieList = [...state.recipeList];
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
      setState({
        ...state,
        recipeList: copyOfRecipieList
      });
    }

    console.log('got to applySettings...')
  }


  return (
    <div className="App">
      <header className="App-header">
        <div>ACNH Tool</div>
      </header>

      <section>

       <div>
       <FormControl >
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

             <Button  variant="contained" color="primary" onClick={applySettings}>Apply Settings</Button>
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
