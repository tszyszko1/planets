import { FETCH_PLANET } from "../actions";

export default function(state = false, action) {
  switch (action.type) {
    case FETCH_PLANET:
      return action.payload;
    default:
      return state;
  }
}
