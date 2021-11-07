import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getPendingSelector,
  getListSelector,
  getErrorSelector,
} from "../store/pokemonList/selectors";
import { fetchListRequest } from "../store/pokemonList/actions";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { fetchSelectedRequest } from "../store/selectedPokemon/actions";
import { BulkPokemon, searchType } from "../types";
import { Search, History } from "@mui/icons-material";

const useStyles = makeStyles({
  list: {
    maxHeight: 400,
    overflowY: "auto",
  },
  search: {
    width: "80%",
  },
  typeChip: {
    margin: "0px 4px",
  },
});

const PokemonList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // get memoized versions of all redux state info
  const listPending = useSelector(getPendingSelector);
  const pokemonList = useSelector(getListSelector);
  const listError = useSelector(getErrorSelector);

  // Component level state
  const [search, setSearch] = useState<searchType>({
    query: "",
    searchedArr: [],
    searchedList: pokemonList,
  });

  // state for handling history menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const historyOpen = Boolean(anchorEl);

  // Get the initial list of all 151 kanto pokemon
  useEffect(() => {
    dispatch(fetchListRequest());
  }, [dispatch]);

  // Controlled text input, update on text change, reset list when empty
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "") {
      setSearch({
        ...search,
        query: event.currentTarget.value,
        searchedList: pokemonList,
      });
    } else {
      setSearch({ ...search, query: event.currentTarget.value });
    }
  };

  // Handles updating the searched list in all scenarios
  const onSearchClick = (query?: string) => {
    console.log(!!query);
    console.log(`query: ${query}`);
    const useQuery = !!query ? query : search.query;
    const newSearchedList = pokemonList.filter((poke) =>
      poke.name.toLowerCase().includes(useQuery.toLowerCase())
    );

    if (useQuery !== "") {
      // update query and searchedArr if a query is passed and isn't a duplicate
      if (query && !search.searchedArr.includes(useQuery)) {
        console.log("query is defined");
        console.log(useQuery);
        setSearch({
          query: useQuery,
          searchedArr: [...search.searchedArr, useQuery],
          searchedList: newSearchedList,
        });
        // update query and list if chosen from history menu but is a duplicate
      } else if (query) {
        setSearch({
          ...search,
          query: useQuery,
          searchedList: newSearchedList,
        });
        // update searchArr if the current search isn't a duplicate
      } else if (!search.searchedArr.includes(useQuery)) {
        setSearch({
          ...search,
          searchedArr: [...search.searchedArr, useQuery],
          searchedList: newSearchedList,
        });
        // just update the list of pokemon if no query passed and duplicate search
      } else {
        setSearch({ ...search, searchedList: newSearchedList });
      }
    }
  };

  // Methods to handle history button menu opening/closing
  const onHistoryClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getHistoryItems = () => {
    return search.searchedArr.map((query) => (
      <MenuItem key={query} onClick={() => onSearchClick(query)}>
        {query}
      </MenuItem>
    ));
  };

  const selectNewPokemon = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    poke: BulkPokemon
  ) => {
    // Make the api call to update the selected pokemon
    dispatch(fetchSelectedRequest(poke.name));
  };

  // update and show correct list of pokemon based on search input
  const showPokemonList = () => {
    const list =
      search.searchedList.length === 0 ? pokemonList : search.searchedList;
    return list.map((poke) => (
      <ListItem key={poke.name}>
        <ListItemButton onClick={(event) => selectNewPokemon(event, poke)}>
          <ListItemText>{capitalizeFirst(poke.name)}</ListItemText>
        </ListItemButton>
      </ListItem>
    ));
  };

  const capitalizeFirst = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <TextField
          className={classes.search}
          placeholder="Search for Pokemon!"
          variant="standard"
          value={search.query}
          onChange={handleSearchChange}
        />
        <IconButton onClick={() => onSearchClick()}>
          <Search />
        </IconButton>
        <IconButton onClick={(event) => onHistoryClick(event)}>
          <History />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={historyOpen}
          onClose={() => handleClose()}
          onClick={() => handleClose()}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            style: {
              maxHeight: 300,
              width: 150,
            },
          }}
        >
          {getHistoryItems()}
        </Menu>
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
    </div>
  );
};

export default PokemonList;
