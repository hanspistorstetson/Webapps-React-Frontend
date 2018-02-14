import React from "react";
import { Card, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class GameItem extends React.Component {
  state = {};

  render() {
    return (
      <Card>
        <Card.Content textAlign="center">
          <Card.Header>{this.props.game.gamename}</Card.Header>
          <Link
            to={`/game/${this.props.game._id}`}
            params={this.props.game.gamename}
          >
            <Icon name="write" size="massive" />
          </Link>
        </Card.Content>
      </Card>
    );
  }
}

GameItem.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    gamename: PropTypes.string.isRequired,
    topRow: PropTypes.arrayOf(PropTypes.number.isRequired),
    middleRow: PropTypes.arrayOf(PropTypes.number.isRequired),
    bottomRow: PropTypes.arrayOf(PropTypes.number.isRequired)
  }).isRequired
};

export default GameItem;
