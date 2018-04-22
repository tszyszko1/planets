import { combineReducers } from "redux";
import PlanetsReducer from "./planetsReducer";
import PlanetReducer from "./planetReducer";
import AllFetchedReducer from "./allFetchedReducer";

const rootReducer = combineReducers({
  planets: PlanetsReducer,
  allFetched: AllFetchedReducer,
  planet: PlanetReducer
});

export default rootReducer;
