import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";

const AddGameCtA = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>Add New Game!</Card.Header>
      <Link to="/games/new">
        <Icon name="plus circle" size="massive" />
      </Link>
    </Card.Content>
  </Card>
);

export default AddGameCtA;
