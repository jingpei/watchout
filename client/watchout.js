// start slingin' some d3 here.
// draw enemies in svg
// make it so the e move random
// make a player
// detect when enemies touches
// keep track of the users score
// animate the enemies

//svg canvas
//var Player class
  //collision detections
//var Enemies class 
//scoreboard update
//setIntervals for game loop
  //updating positions of players and enemies

var gameOptions = {
  height: 450,
  width: 700,
  radius: 30,
  nEnemies: 30,
  padding: 20
}


var Player = function(){
  this.x = function(){ return d3.select('.player').attr('cx'); };
  this.y = function(){ return d3.select('.player').attr('cy'); }
  this.class = 'player'
  this.fill = "#000";
  this.r = 10;
}

Player.prototype.checkCollisions = function(){
  // enemies with positions in an array

  //loop and check at that time if the x and y's have overlap

  // if collision update scoreboard

}
//declairing functions to enable dragging of player
function dragmove(d) {
  d3.select(this)
      .attr("cx", d.x = Math.max(gameOptions.radius, Math.min(gameOptions.width - gameOptions.radius, d3.event.x)))
      .attr("cy", d.y = Math.max(gameOptions.radius, Math.min(gameOptions.height - gameOptions.radius, d3.event.y)));
}

var drag = d3.behavior.drag()
    .on("drag", dragmove);


var Enemy = function() {
  this.x = Math.random() * gameOptions.width;
  this.y = Math.random() * gameOptions.height;
  this.class = 'enemy'
  this.fill = 'pink'
  this.r = 10;
}

Enemy.prototype.updatePosition = function() {
  this.x = this.x //+ //random direction
  this.y = this.y //+ //random direction
}


var Scoreboard = {
  currentScore: 0,
  highScore:0
}


//helper function
var makeEntities = function(entity, n) {
  entities = []
  for(var i=0; i<n; i++){
    var e = new entity();
    entities.push(e);
  }
  return entities;
}



//create the gameboard
var gameBoard = d3.selectAll('body')
                .append('svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height)
                .append("g")
                .selectAll('g');



//Make the enemies
var enemies = makeEntities(Enemy, 20);

//Append the enemies
gameBoard
  .data(enemies)
  .enter()
  .append('circle')
  .attr('class', 'enemies')
  .attr('cx', function(d){return d.x})
  .attr('cy', function(d){return d.y})
  .attr('fill', 'pink')
  .attr('r', function(d){return d.r});


//Make the Player
var player = [new Player()]

//Append the Player
gameBoard
    .data(player)
    .enter()
    .append('svg:circle')
    .attr('class', 'player')
    .attr('cx', 200)
    .attr('cy', 200)
    .attr('fill', function(d) { return d.fill })
    .attr('r', function(d) { return d.r })
    .call(drag);


//Breathing life into our enemies
setInterval(function(){
  d3.selectAll('.enemies')
  .data(
    d3.range(enemies.length).map(function() {
      return { x: Math.random()*gameOptions.width,
               y: Math.random()*gameOptions.height
             }
      }))
    .attr('cx', function(d) {return d.x})
    .attr('cy', function(d) {return d.y}) 
}, 500)




















