import { createSelector } from "reselect";
import { GAMES_FETCHED, GAME_CREATED } from "../types";

export default function games(state = {}, action = {}) {
  switch (action.type) {
    case GAMES_FETCHED:
    case GAME_CREATED:
      return { ...state, ...action.data.entities.games };
    default:
      return state;
  }
}

// SELECTORS

export const gamesSelector = state => state.games;

export const allGamesSelector = createSelector(gamesSelector, gamesHash =>
  Object.values(gamesHash)
);
