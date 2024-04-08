#PokeGuess Backend

## Description

This is a backend API server written with [Nest.js](https://nestjs.com/). This Api is suggested to be used with the frontend web application [here](https://github.com/SamOr1014/pokeGuess-frontend)

## Usage

Before starting the app, remember to add a `.env` file and you can reference the `.env.example` in the repo

### To Start Locally

`yarn && yarn start`

### To build and run

`yarn build && yarn start:prod`

### To Test

`yarn test`

add `--coverage` flag if you wanna check coverage

### Run on Docker

...In Progress

## API Design

The basic design is demonstrated below.

```
Request -> Controller -> Service -> Repository
```

1. Request will first hit controller. Then any information will be passed to the Service directly

2. In Service, that's where I put the logics of how the information should be process. Data will be gathered from Repository and transformers will be injected here and transform to desire response.

3. Repository is solely designed to isolate API callings from the `pokeapi`. In normal use cases, this repository is used to query the DB and return raw data. No/Minimal logic should be left here.

### Detail Api - `/pokeguess` route

#### `GET /question`

This route is as simple as it is named. This route will return a trivia question with random pokemons.

Response

```JSON
{
  "pokemonId": 1,
  "pokemonName": "bulbasaur",
  "pokemonCry": "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg",
  "pokemonImg": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  "pokemonNameList": [
    "venusaur","bulbasaur","caterpie","pidgeotto"
  ]
}
```

#### `POST validate`

This api require a request body of answer information which includes `pokemon name of player's answer` and `pokemon id of the correct answer`. Then it will validate the answer and response with the correct answer information and whether the player is correct

Body

```JSON
{
  "pokemonId": 1,
  "answer": "bulbasaur"
}
```

Response

```JSON
{
  "correct": true,
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  "pokemonName": "bulbasaur"
}
```

### Swagger

A Swagger doc is generated when you start this application and it will be available at `{Base_URL}/api`
