import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allGamesSelector } from "../../reducers/games";
import AddGameCtA from "../ctas/AddGameCtA";
import GameListPage from "../pages/GameListPage";
import { fetchGames } from "../../actions/games";

class DashboardPage extends React.Component {
  state = {
    loading: true
  };

  componentDidMount = () => this.onInit(this.props);

  onInit = props => {
    props.fetchGames();
    this.setState({ loading: false });
  };

  render() {
    const { isConfirmed, games } = this.props;
    const { loading } = this.state;
    return (
      <div>
        {loading ? (
          <p>Your games are loading</p>
        ) : (
          <Segment loading={loading}>
            <div>
              {!loading && !isConfirmed && <ConfirmEmailMessage />}
              {!loading && games.length === 0 ? (
                <AddGameCtA />
              ) : (
                <GameListPage />
              )}
            </div>
          </Segment>
        )}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
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
    isConfirmed: !!state.user.isConfirmed,
    games: allGamesSelector(state)
  };
}

export default connect(mapStateToProps, { fetchGames })(DashboardPage);
