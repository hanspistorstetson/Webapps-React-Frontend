import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gravatarUrl from "gravatar-url";
import { connect } from "react-redux";
import { allGamesSelector } from "../../reducers/games";
import * as actions from "../../actions/auth";

const TopNavigation = ({ user, logout, hasGames }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
    {hasGames && (
      <Menu.Item as={Link} to="/games/new">
        Add New Game
      </Menu.Item>
    )}
    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired,
  hasGames: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    hasGames: allGamesSelector(state).length > 0
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
