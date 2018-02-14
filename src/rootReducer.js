import { combineReducers } from "redux";

import user from "./reducers/user";
import games from "./reducers/games";

export default combineReducers({
  user,
  games
});
