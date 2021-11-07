import PokemonList from "./PokemonList";
import Pokemon from "./Pokemon";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  gridWrapper: {
    paddingTop: "100px",
  },
  grid: {
    border: "1px solid black",
    borderRadius: "10px",
    padding: "16px",
    minHeight: 514,
  },
  gridList: {
    padding: "16px",
  },
  gridPokemon: {
    padding: "16px",
    maxHeight: 480,
    overflowY: "auto",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.gridWrapper}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid
          className={classes.grid}
          item
          container
          xs={8}
          justifyContent="center"
          spacing={2}
        >
          <Grid className={classes.gridList} item xs={6}>
            <PokemonList />
          </Grid>
          <Grid
            className={classes.gridPokemon}
            justifyContent="center"
            alignItems="center"
            item
            container
            xs={6}
          >
            <Pokemon />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
