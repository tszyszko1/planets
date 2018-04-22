import axios from "axios";

export const FETCH_PLANETS = "fetech_planets",
  FETCH_PLANET = "fetech_planet",
  ALL_FETCHED = "all_fetched";

function updatePlanets(store) {
  return {
    type: FETCH_PLANETS,
    payload: store
  };
}
function updatePlanet(store) {
  return {
    type: FETCH_PLANET,
    payload: store
  };
}
function updateAllFetched(bool) {
  return {
    type: ALL_FETCHED,
    payload: bool
  };
}
function fetchFromUlr(url, limit, planets, dispatch) {
  if (planets.length < limit)
    axios.get(url).then(response => {
      console.log(response);
      if (response.data.count === planets.length)
        dispatch(updateAllFetched(true));
      if (
        limit <= planets.length + 10 ||
        response.data.count <= planets.length + 10
      ) {
        if (response.data.count <= planets.length + 10)
          dispatch(updateAllFetched(true));
        dispatch(updatePlanets([...planets, ...response.data.results]));
      } else {
        fetchFromUlr(
          response.data.next,
          limit,
          [...planets, ...response.data.results],
          dispatch
        );
      }
    });
}

export function fetchPlanets(page, pageLimit, search = "", newSearch = false) {
  return (dispatch, getStore) => {
    const planets = newSearch ? [] : getStore().planets,
      startPage = Math.floor(planets.length / 10) + 1,
      url = `https://swapi.co/api/planets/?${
        search ? `search=${search}&` : ""
      }page=${startPage}`;
    console.log("url", url, search);
    fetchFromUlr(url, page * pageLimit, planets, dispatch);
    if (newSearch) dispatch(updateAllFetched(false));
  };
}

export function fetchPlanet(id) {
  return (dispatch, getStore) => {
    const planets = getStore().planets,
      url = `https://swapi.co/api/planets/${id}`;
    if (planets[id]) {
      dispatch(updatePlanet(planets[id]));
    } else {
      axios.get(url).then(response => {
        if (response.data) {
          dispatch(updatePlanet(response.data));
        }
      });
    }
  };
}
