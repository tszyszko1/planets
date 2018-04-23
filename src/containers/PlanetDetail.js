import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchPlanet } from "../actions";

class PlanetDetail extends React.Component {
  componentDidMount() {
    this.props.fetchPlanet(this.props.match.params.id);
  }
  renderDetails = () =>
    Object.entries(this.props.planet).map(entry => {
      if (
        ["url", "name", "created", "edited", "films", "residents"].includes(
          entry[0]
        )
      )
        return null;
      return <article>{`${entry[0]}: ${entry[1]}`}</article>;
    });
  render() {
    return (
      <div id="planet-detail-page">
        <button
          className="sw-button"
          onClick={() => this.props.history.goBack()}
        >
          {"<<"} back
        </button>
        <h1>{this.props.planet.name}</h1>
        <section>{this.renderDetails()}</section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { planet: state.planet };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlanet }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetDetail);
