import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { fetchPlanets } from "../actions";

const pageLimits = [5, 10, 25, 100];

class PlanetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: Number(props.location.pathname[1]) || 1,
      pageLimit: 10,
      search: ""
    };
    this.onLimitChange = e => {
      console.log(
        "adad",
        e.target.value,
        Math.floor(this.state.page * this.state.pageLimit) / e.target.value
      );
      this.setState({
        pageLimit: Number(e.target.value),
        page:
          Math.floor(this.state.page * this.state.pageLimit) / e.target.value
      });
    };
    this.onSearch = e => {
      this.setState({ search: e.target.value, page: 1 });
      this.props.fetchPlanets(
        this.state.page,
        this.state.pageLimit,
        e.target.value,
        true
      );
    };
    this.goToPage = page => () => {
      if (page > 0) {
        this.setState({ page });
        this.props.history.push(`/${page}`);
        this.props.fetchPlanets(page, this.state.pageLimit, this.state.search);
      }
    };
  }
  componentDidMount() {
    this.props.fetchPlanets(this.state.page, this.state.pageLimit, "", true);
  }
  renderPlanets = () => {
    const firstIndex = (this.state.page - 1) * this.state.pageLimit,
      planetsToRender = this.props.planets.slice(
        firstIndex,
        firstIndex + this.state.pageLimit
      );
    if (planetsToRender.length === 0) {
      if (this.props.allFetched) {
        return <div>No more data</div>;
      } else {
        return <div>Fetching data</div>;
      }
    }
    return planetsToRender.map((planet, i) => (
      <li key={i} class="planet-list-item">
        <Link
          to={`/planet/${(this.state.page - 1) * this.state.pageLimit + i}`}
        >
          {planet.name}
        </Link>
      </li>
    ));
  };
  render() {
    return (
      <div id="planet-list-page">
        <h1>Planets of Star Wars universe</h1>
        <div>
          search:{" "}
          <input
            type="text"
            value={this.state.search}
            onChange={this.onSearch}
          />
        </div>
        <ul id="planet-list">{this.renderPlanets()}</ul>
        {this.state.page !== 1 && (
          <button
            className="sw-button"
            onClick={this.goToPage(this.state.page - 1)}
          >
            {"<<"} prev
          </button>
        )}
        {!this.props.allFetched && (
          <button
            className="sw-button"
            onClick={this.goToPage(this.state.page + 1)}
          >
            next {">>"}
          </button>
        )}
        <div>
          <select value={this.state.pageLimit} onChange={this.onLimitChange}>
            {pageLimits.map(pl => (
              <option value={pl} key={pl}>
                {pl}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { planets: state.planets, allFetched: state.allFetched };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlanets }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetList);
