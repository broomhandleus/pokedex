import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import {
  getPendingSelector,
  getListSelector,
  getErrorSelector,
} from "../store/pokemonList/selectors";
import {
  getSelectedPendingSelector,
  getSelectedPokemonSelector,
  getSelectedErrorSelector,
} from "../store/selectedPokemon/selectors";
import { fetchListRequest } from "../store/pokemonList/actions";
import {
  Box,
  CircularProgress,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { fetchSelectedRequest } from "../store/selectedPokemon/actions";
import { BulkPokemon } from "../types";
import { Search } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const useStyles = makeStyles({
  gridWrapper: {
    paddingTop: "100px",
  },
  grid: {
    border: "1px solid black",
    borderRadius: "10px",
    padding: "16px",
  },
  gridList: {
    padding: "16px",
  },
  list: {
    maxHeight: 400,
    overflowY: "scroll",
  },
  gridPokemon: {
    padding: "16px",
  },
  search: {
    width: "80%",
  },
  welcome: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    backgroundColor: "red",
  },
});

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // get memoized versions of all state info
  const listPending = useSelector(getPendingSelector);
  const pokemonList = useSelector(getListSelector);
  const listError = useSelector(getErrorSelector);
  const selectedPending = useSelector(getSelectedPendingSelector);
  const selectedPokemon = useSelector(getSelectedPokemonSelector);
  const selectedError = useSelector(getSelectedErrorSelector);

  useEffect(() => {
    dispatch(fetchListRequest());
  }, [dispatch]);

  const selectNewPokemon = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    poke: BulkPokemon
  ) => {
    // Make the api call to update the selected pokemon
    dispatch(fetchSelectedRequest(poke.url));
  };

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
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                className={classes.search}
                placeholder="Search for Pokemon!"
                variant="standard"
              />
            </Box>
            <div>
              {listPending ? (
                <div>Loading...</div>
              ) : listError ? (
                <div>Error</div>
              ) : (
                <List className={classes.list} dense>
                  {pokemonList.map((poke, index) => (
                    <ListItem key={poke.name}>
                      <ListItemButton
                        className={classes.listItem}
                        onClick={(event) => selectNewPokemon(event, poke)}
                      >
                        <ListItemText>
                          {++index}. {poke.name}
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          </Grid>
          <Grid
            className={classes.gridPokemon}
            justifyContent="center"
            alignItems="center"
            item
            container
            xs={6}
          >
            <div>
              {!selectedPokemon && !selectedPending ? (
                <div className={classes.welcome}>
                  <Typography variant="h4">Welcome to the Pokedex!</Typography>
                  <Typography variant="body1">
                    Select a Pokemon to see more details!
                  </Typography>
                </div>
              ) : selectedPending || !selectedPokemon ? (
                <CircularProgress size={100} />
              ) : selectedError ? (
                <div>Error getting the selected Pokemon</div>
              ) : (
                <div>{selectedPokemon.name}</div>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
