import { normalize } from "normalizr";
import { GAMES_FETCHED, GAME_CREATED, GAME_FETCHED } from "../types";
import api from "../api";
import { gameSchema } from "../schemas";

const gamesFetched = data => ({
  type: GAMES_FETCHED,
  data
});

const gameCreated = data => ({
  type: GAME_CREATED,
  data
});

const gameFetched = data => ({
  type: GAME_FETCHED,
  data
});

export const fetchGames = () => dispatch =>
  api.games
    .fetchAll()
    .then(games => dispatch(gamesFetched(normalize(games, [gameSchema]))));

export const createGame = data => dispatch =>
  api.games
    .create(data)
    .then(game => dispatch(gameCreated(normalize(game, gameSchema))));

export const fetchGame = gameId => dispatch =>
  api.games
    .fetchOne(gameId)
    .then(game => dispatch(gameFetched(normalize(game, gameSchema))));
