import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { fetchPlanet } from "../actions";

class PlanetDetail extends React.Component {
  componentDidMount() {
    this.props.fetchPlanet(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.history.goBack()}>back</button>planet
        detail{this.props.planet.name}
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
