// Adapted from https://picoledelimao.github.io/js/sliding-puzzle/sliding-puzzle-frontend.js
import $ from "jquery";
import { Puzzle } from "./Puzzle";

export default (
  $container,
  dimension,
  size,
  margin,
  speed,
  num_shuffles,
  solveFunc,
  shuffleId,
  solveId,
  wonId
) => {
  this.$container = $container;
  this.dimension = dimension;
  this.size = size;
  this.margin = margin;
  this.speed = speed;
  this.num_shuffles = num_shuffles;
  this.solveFunc = solveFunc;
  this.puzzle = new Puzzle(dimension, solveFunc);
  this.shuffleId = shuffleId;
  this.solveId = solveId;
  this.wonId = wonId;

  this.drawBlocks();
  const self = this;
  const shuffleFunc = function() {
    $container
      .parent()
      .find(this.shuffleId)
      .attr("disabled", "disabled");
    $container
      .parent()
      .find(this.solveId)
      .attr("disabled", "disabled");
    self.shuffle(self.puzzle, self.num_shuffles, function() {
      $container
        .parent()
        .find(this.shuffleId)
        .removeAttr("disabled");
      $container
        .parent()
        .find(this.solveId)
        .removeAttr("disabled");
    });
  };
  $container
    .parent()
    .find(this.shuffleId)
    .on("click", shuffleFunc);
  shuffleFunc();
  $container
    .parent()
    .find(this.solveId)
    .on("click", function() {
      const path = self.puzzle.solve();
      $container
        .parent()
        .find(this.shuffleId)
        .attr("disabled", "disabled");
      $container
        .parent()
        .find(this.solveId)
        .attr("disabled", "disabled");
      self.solve(self.puzzle, path, function() {
        $container
          .parent()
          .find(this.shuffleId)
          .removeAttr("disabled");
        $container
          .parent()
          .find(this.solveId)
          .removeAttr("disabled");
      });
    });
  $container.find("div").on("click", function() {
    const id = $(this).attr("id");
    const num = parseInt(id.slice(1));
    const direction = self.puzzle.move(num);
    if (direction != null) {
      self.move(id, direction);
    }
  });
};

this.prototype.drawBlocks = function() {
  for (let i = 0; i < this.dimension; i++) {
    for (let j = 0; j < this.dimension; j++) {
      if (!(i == this.dimension - 1 && j == this.dimension - 1)) {
        const id = i * this.dimension + j + 1;
        this.$container.append(`<div id='c${id}'>${id}</div>`);
        const $e = this.$container.find(`#c${id}`);
        $e.css("left", j * (this.size + this.margin));
        $e.css("top", i * (this.size + this.margin));
        $e.css("width", `${this.size}px`);
        $e.css("height", `${this.size}px`);
        $e.css("font-size", this.size * 0.7);
        $e.css("background-color", "#0d4477");
      }
    }
    this.$container.append("<br/>");
  }
  this.$container.css("width", (this.size + this.margin) * this.dimension);
  this.$container.css("height", (this.size + this.margin) * this.dimension);
};

this.prototype.move = function(id, direction) {
  const block = this.$container.find(`#${id}`);
  const distance = this.size + this.margin;
  switch (direction) {
    case Puzzle.Direction.LEFT:
      block.animate(
        {
          left: `-=${distance}px`
        },
        this.speed
      );
      break;
    case Puzzle.Direction.RIGHT:
      block.animate(
        {
          left: `+=${distance}px`
        },
        this.speed
      );
      break;
    case Puzzle.Direction.UP:
      block.animate(
        {
          top: `-=${distance}px`
        },
        this.speed
      );
      break;
    case Puzzle.Direction.DOWN:
      block.animate(
        {
          top: `+=${distance}px`
        },
        this.speed
      );
      break;
  }

  if (this.puzzle.isGoalState()) {
    $(this.wonId).css("color", "green");
    $(this.wonId).text("You've won!");
  } else {
    $(this.wonId).css("color", "red");
    $(this.wonId).text("You've not won yet!");
  }
};

this.prototype.randomMove = function(puzzle, lastMove) {
  const allowedMoves = puzzle.getAllowedMoves();
  let rand;
  do {
    rand = Math.floor(Math.random() * allowedMoves.length);
  } while (lastMove == allowedMoves[rand]);
  const movingBlock = allowedMoves[rand];
  const direction = puzzle.move(movingBlock);
  this.move(`c${movingBlock}`, direction);
  return movingBlock;
};

this.prototype.shuffle = function(puzzle, times, callbackFunction, lastMove) {
  if (times <= 0) {
    callbackFunction();
    return;
  }
  const movedBlock = this.randomMove(puzzle, lastMove);
  const self = this;
  setTimeout(() => {
    self.shuffle(puzzle, times - 1, callbackFunction, movedBlock);
  }, this.speed);
};

this.prototype.solve = function(puzzle, path, callbackFunction) {
  if (path.length == 0) {
    callbackFunction();
    return;
  }
  const movingBlock = path.shift();
  const direction = puzzle.move(movingBlock);
  this.move(`c${movingBlock}`, direction);
  const self = this;
  setTimeout(() => {
    self.solve(puzzle, path, callbackFunction);
  }, this.speed);
};
