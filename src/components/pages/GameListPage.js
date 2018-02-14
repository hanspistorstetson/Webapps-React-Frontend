import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { allGamesSelector } from "../../reducers/games";
import GameItem from "../items/GameItem";
import { fetchGames } from "../../actions/games";

class GameListPage extends React.Component {
  state = {};

  componentDidMount = () => this.onInit(this.props);

  onInit = props => {
    props.fetchGames();
  };

  render() {
    const rows = [];
    for (let i = 0; i < this.props.games.length; i += 1) {
      // note: we add a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      rows.push(<GameItem key={i} game={this.props.games[i]} />);
    }
    console.log(rows);
    return <Card.Group>{rows}</Card.Group>;
  }
}

GameListPage.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      gamename: PropTypes.string.isRequired,
      topRow: PropTypes.arrayOf(PropTypes.number.isRequired),
      middleRow: PropTypes.arrayOf(PropTypes.number.isRequired),
      bottomRow: PropTypes.arrayOf(PropTypes.number.isRequired)
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    games: allGamesSelector(state)
  };
}

export default connect(mapStateToProps, { fetchGames })(GameListPage);
