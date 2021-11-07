import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  getSelectedPendingSelector,
  getSelectedPokemonSelector,
  getSelectedErrorSelector,
  getSelectedLocationSelector,
  getSelectedSpeciesSelector,
  // getSelectedEvolutionSelector,
} from "../store/selectedPokemon/selectors";
import {
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { fetchSelectedRequest } from "../store/selectedPokemon/actions";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  LocationAreaEncounter,
  PokemonAbility,
  PokemonMove,
  PokemonSpeciesVariety,
  PokemonType,
} from "pokenode-ts";
import { getTypeColor } from "../pokemonTypeColors";

const useStyles = makeStyles({
  list: {
    maxHeight: 400,
    overflowY: "auto",
  },
  welcome: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  speciesInfo: {
    display: "flex",
    flexDirection: "column",
  },
  detailList: {
    width: "100%",
  },
  chips: {
    display: "flex",
  },
  typeChip: {
    margin: "0px 4px",
  },
});

const Pokemon = () => {
  // const dispatch = useDispatch();
  const classes = useStyles();

  // get memoized versions of all redux state info
  const selectedPending = useSelector(getSelectedPendingSelector);
  const selectedPokemon = useSelector(getSelectedPokemonSelector);
  const selectedLocation = useSelector(getSelectedLocationSelector);
  const selectedSpecies = useSelector(getSelectedSpeciesSelector);
  // const selectedEvolution = useSelector(getSelectedEvolutionSelector);
  const selectedError = useSelector(getSelectedErrorSelector);

  // Component level state
  const [abilityOpen, setAbilityOpen] = useState(false);
  const handleAbilityOpen = () => {
    setAbilityOpen(!abilityOpen);
  };
  const [moveOpen, setMoveOpen] = useState(false);
  const handleMoveOpen = () => {
    setMoveOpen(!moveOpen);
  };
  const [varietyOpen, setVarietyOpen] = useState(false);
  const handleVarietyOpen = () => {
    setVarietyOpen(!varietyOpen);
  };
  const [locationOpen, setLocationOpen] = useState(false);
  const handleLocationOpen = () => {
    setLocationOpen(!locationOpen);
  };

  // Would have been used if Evolution API returned correct object

  // const selectNewPokemon = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   poke: string
  // ) => {
  //   // Make the api call to update the selected pokemon
  //   dispatch(fetchSelectedRequest(poke));
  // };

  const capitalizeFirst = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Create chip for pokemon type
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

  // Display correct gender info based on gender_rate number
  const showGenderInfo = (rate: number) => {
    if (rate > 0) {
      return (
        <span>
          {rate}/8 female, {8 - rate}/8 male
        </span>
      );
    } else {
      return <span>Genderless</span>;
    }
  };

  // Methods to create Pokemon information lists
  const getAbilityList = (list: PokemonAbility[]) => {
    return list.map((ab) => {
      const name = capitalizeFirst(ab.ability.name);
      return (
        <div key={name}>
          <ListItem>
            <ListItemText sx={{ pl: 2 }}>{name}</ListItemText>
          </ListItem>
          <Divider />
        </div>
      );
    });
  };

  const getMoveList = (list: PokemonMove[]) => {
    return list.map((mv) => {
      const name = capitalizeFirst(mv.move.name);
      return (
        <div key={name}>
          <ListItem>
            <ListItemText sx={{ pl: 2 }}>{name}</ListItemText>
          </ListItem>
          <Divider />
        </div>
      );
    });
  };

  const getVarietiesList = (list: PokemonSpeciesVariety[]) => {
    return list.map((variety) => {
      const name = capitalizeFirst(variety.pokemon.name);
      return (
        <div key={name}>
          <ListItem>
            <ListItemText sx={{ pl: 2 }}>{name}</ListItemText>
          </ListItem>
          <Divider />
        </div>
      );
    });
  };

  const getLocationsList = (list: LocationAreaEncounter[]) => {
    return list.map((location) => {
      const name = capitalizeFirst(location.location_area.name);
      return (
        <div key={name}>
          <ListItem>
            <ListItemText sx={{ pl: 2 }}>{name}</ListItemText>
          </ListItem>
          <Divider />
        </div>
      );
    });
  };

  /**  The poke API for getting the Evolution is broken.
   * Their interface for ChainLink shows a property called "envolves_to" (note the random "n")
   * but the API returns its with the property "evolves_to" (which is correct)
   * because of this I keep getting an undefined error when trying to iterate through
   * and create some clickable chips to show the evolutions.
   *
   * I have left the code I would have used to create the chips for reference
   * on what I would have to done show a list of evolutions that are clickable.
   */

  // const getEvolutions = () => {
  //   if (!!selectedEvolution) {
  //     console.log(selectedEvolution.chain);
  //     const currEvo: ChainLink[] = selectedEvolution.chain.envolves_to;
  //     let evoArr: ReactNode[] = [];
  //     console.log(currEvo.envolves_to);
  //     currEvo.envolves_to.forEach((evo) => {
  //       evoArr.push(getEvolutionChip(evo.species.name));
  //     });
  //     return evoArr;
  //   } else {
  //     return <div>No evoution info</div>;
  //   }
  // };

  // const getEvolutionChip = (name: string) => {
  //   return (
  //     <Chip
  //       className={classes.typeChip}
  //       label={name}
  //       key={name}
  //       onClick={(event) => selectNewPokemon(event, name)}
  //     />
  //   );
  // };

  return (
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
            {capitalizeFirst(selectedPokemon.name)} - #{selectedPokemon.order}
          </Typography>
          <div className={classes.chips}>
            <Typography variant="subtitle1">Types: </Typography>
            {selectedPokemon.types.map((type) => {
              return getTypeChip(type);
            })}
          </div>
          {!!selectedSpecies ? (
            <div className={classes.speciesInfo}>
              <Typography variant="subtitle1">
                Color: {capitalizeFirst(selectedSpecies.color.name)}
              </Typography>
              <Typography variant="subtitle1">
                Genders: {showGenderInfo(selectedSpecies.gender_rate)}
              </Typography>
            </div>
          ) : (
            <div>
              <div>No colors found</div>
              <div>No gender information found</div>
            </div>
          )}
          {/* Evolutions API broken, commented out template code that would've been used */}
          {/* {!!selectedEvolution ? (
            <div className={classes.chips}>
              <Typography variant="subtitle1">Evolutions: </Typography>
              {getEvolutions()}
            </div>
          ) : (
            <div>No evolutions found</div>
          )} */}
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
            {!!selectedSpecies ? (
              <div>
                <ListItemButton onClick={handleVarietyOpen}>
                  <ListItemText primary="Varieties" />
                  {varietyOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={varietyOpen} unmountOnExit>
                  <List component="div" disablePadding>
                    {getVarietiesList(selectedSpecies?.varieties)}
                  </List>
                </Collapse>
              </div>
            ) : (
              <div>No variety info found</div>
            )}
            {!!selectedLocation ? (
              <div>
                <ListItemButton onClick={handleLocationOpen}>
                  <ListItemText primary="Locations" />
                  {locationOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={locationOpen} unmountOnExit>
                  <List component="div" disablePadding>
                    {getLocationsList(selectedLocation)}
                  </List>
                </Collapse>
              </div>
            ) : (
              <div>No location info found</div>
            )}
          </List>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
