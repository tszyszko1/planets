import { ALL_FETCHED } from "../actions";

export default function(state = false, action) {
  switch (action.type) {
    case ALL_FETCHED:
      return action.payload;
    default:
      return state;
  }
}
