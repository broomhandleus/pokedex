export interface BulkPokemon {
  name: string;
  url: string;
}

export interface searchType {
  query: string;
  searchedArr: string[];
  searchedList: BulkPokemon[];
}
