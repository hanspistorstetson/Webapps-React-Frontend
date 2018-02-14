import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import NewGameForm from "../forms/NewGameForm";
import { createGame } from "../../actions/games";

class NewGamePage extends React.Component {
  state = {
    game: null
  };

  addGame = game =>
    this.props
      .createGame(game)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <Segment>
        <h1>Start a new Game!</h1>
        <NewGameForm submit={this.addGame} game={this.state.game} />
      </Segment>
    );
  }
}

NewGamePage.propTypes = {
  createGame: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { createGame })(NewGamePage);
