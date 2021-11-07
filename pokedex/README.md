# Pokemon Kanto Pokedex

**NOTE:** From what I saw, the Evolution Chain API (https://pokeapi.co/api/v2/evolution-chain/{id}/) endpoint does not work correctly. The `ChainLink` type, as defined their Pokenode-ts type library contains a property called `envolves_to` (notice the "n" that shouldn't be there). However, the actual object returned from the API contains the `evolve_to` property, which would be correct. However, since the type is defined incorrectly, Typescript throws an error when you try to reference it. As a result, I could not get the evolutions to show correctly. I left all my code that I created to show the evolutions, just commented out. We can talk about this more if needed!

## Start the App

```
cd pokedex/pokedex // Navigate into the git repo
npm install // install all necessary dependencies
npm start // start development server
```

## Things I would Improve/Change

If I had more time continue this project, there are several things I would improve!

- I would take more time to fully design the UI
  - Add color to everything
  - Add icon adornment to each pokemon in the left-hand list to show their types (fire type would get a fire icon)
  - Style scrollbars to look more sleek/minimal
  - Create a header for when Pokemon is chosen (With name, types, pokedex number). Have this header be sticky so it will always show when you scroll throw its other properties
- Add component level state to Redux as well
  - I just used redux for the asynchronous requests for Pokemon data, but if I took more time, I would all the component state (like the search parameters) and add those to redux as well
- Paginate the full Pokemon list
  - Right now I pull down all 151 pokemon and filter that list on the frontend, but in a production environment I would paginate this list and use query parameters on the API calls to improve performance on the frontend
