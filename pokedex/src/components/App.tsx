import React, { useEffect, useState } from "react";
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
  getSelectedLocationSelector,
  getSelectedSpeciesSelector,
  getSelectedEvolutionSelector,
} from "../store/selectedPokemon/selectors";
import { fetchListRequest } from "../store/pokemonList/actions";
import {
  Box,
  Chip,
  CircularProgress,
  Collapse,
  Grid,
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
import { ExpandLess, ExpandMore, Search } from "@mui/icons-material";
import { PokemonAbility, PokemonMove, PokemonType } from "pokenode-ts";
import { getTypeColor } from "../pokemonTypeColors";

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
  list: {
    maxHeight: 400,
    overflowY: "auto",
  },
  gridPokemon: {
    padding: "16px",
    maxHeight: 480,
    overflowY: "auto",
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
  detailList: {
    width: "100%",
  },
  propertyTitle: {
    paddingRight: "8px",
  },
  typeChips: {
    display: "flex",
  },
  typeChip: {
    margin: "0px 4px",
  },
  abilityList: {
    display: "flex",
    alignItems: "center",
  },
  moveList: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // get memoized versions of all redux state info
  const listPending = useSelector(getPendingSelector);
  const pokemonList = useSelector(getListSelector);
  const listError = useSelector(getErrorSelector);
  const selectedPending = useSelector(getSelectedPendingSelector);
  const selectedPokemon = useSelector(getSelectedPokemonSelector);
  const selectedLocation = useSelector(getSelectedLocationSelector);
  const selectedSpecies = useSelector(getSelectedSpeciesSelector);
  const selectedEvolution = useSelector(getSelectedEvolutionSelector);
  const selectedError = useSelector(getSelectedErrorSelector);

  console.log(selectedPokemon);
  console.log(selectedLocation);
  console.log(selectedSpecies);
  console.log(selectedEvolution);

  // Component level state
  const [search, setSearch] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const [searchedList, setSearchedList] = useState(pokemonList);
  const [abilityOpen, setAbilityOpen] = useState(false);
  const handleAbilityOpen = () => {
    setAbilityOpen(!abilityOpen);
  };
  const [moveOpen, setMoveOpen] = useState(false);
  const handleMoveOpen = () => {
    setMoveOpen(!moveOpen);
  };

  // Get the initial list of all 151 kanto pokemon
  useEffect(() => {
    dispatch(fetchListRequest());
  }, [dispatch]);

  // update the list when the search bar is changed
  useEffect(() => {
    setSearchedList(pokemonList.filter((poke) => poke.name.includes(search)));
  }, [search]);

  const selectNewPokemon = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    poke: BulkPokemon
  ) => {
    // Make the api call to update the selected pokemon
    dispatch(fetchSelectedRequest(poke.name));
  };

  const showPokemonList = () => {
    const list = search ? searchedList : pokemonList;
    return list.map((poke) => (
      <ListItem key={poke.name}>
        <ListItemButton onClick={(event) => selectNewPokemon(event, poke)}>
          <ListItemText>{poke.name}</ListItemText>
        </ListItemButton>
      </ListItem>
    ));
  };

  const capitalizeFirst = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getTypeChip = (type: PokemonType) => {
    const name = type.type.name;
    return (
      <Chip
        className={classes.typeChip}
        label={name}
        key={name}
        style={{ backgroundColor: getTypeColor(name) }}
      />
    );
  };

  const getAbilityList = (list: PokemonAbility[]) => {
    return list.map((ab) => {
      const name = capitalizeFirst(ab.ability.name);
      return (
        <ListItem key={name}>
          <ListItemText sx={{ pl: 4 }}>{name}</ListItemText>
        </ListItem>
      );
    });
  };

  const getMoveList = (list: PokemonMove[]) => {
    return list.map((mv) => {
      const name = capitalizeFirst(mv.move.name);
      return (
        <ListItem key={name}>
          <ListItemText sx={{ pl: 2 }}>{name}</ListItemText>
        </ListItem>
      );
    });
  };

  // need to show: color, evolutions (links to them), genders, locations, varieties

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
                value={search}
                onChange={handleSearchChange}
              />
            </Box>
            <div>
              {listPending ? (
                <div>Loading...</div>
              ) : listError ? (
                <div>Error</div>
              ) : (
                <List className={classes.list} dense disablePadding>
                  {showPokemonList()}
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
                <div>
                  <Typography variant="h3">
                    {capitalizeFirst(selectedPokemon.name)} - #
                    {selectedPokemon.order}
                  </Typography>
                  <div className={classes.typeChips}>
                    <Typography
                      className={classes.propertyTitle}
                      variant="subtitle1"
                    >
                      Types:{" "}
                    </Typography>
                    {selectedPokemon.types.map((type) => {
                      return getTypeChip(type);
                    })}
                  </div>
                  <List className={classes.detailList}>
                    <ListItemButton onClick={handleAbilityOpen}>
                      <ListItemText primary="Abilities" />
                      {abilityOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={abilityOpen} unmountOnExit>
                      <List component="div" disablePadding>
                        {getAbilityList(selectedPokemon.abilities)}
                      </List>
                    </Collapse>
                    <ListItemButton onClick={handleMoveOpen}>
                      <ListItemText primary="Moves" />
                      {moveOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={moveOpen} unmountOnExit>
                      <List component="div" disablePadding>
                        {getMoveList(selectedPokemon.moves)}
                      </List>
                    </Collapse>
                  </List>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
